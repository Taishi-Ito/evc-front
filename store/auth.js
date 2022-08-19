import axios from 'axios'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification, updateEmail, updatePassword} from 'firebase/auth'

export const state = () => ({
  isLoggedIn: false,
  userId: '',
  email: '',
  name: '',
  locale: '',
  idToken: ''
})

export const getters = ({
  isLoggedIn: state => !!state.isLoggedIn,
  userId: state => state.userId,
  email: state => state.email,
  name: state => state.name,
  locale: state => state.locale
})

export const mutations = {
  setSigninStatus(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setEmail(state, email) {
    state.email = email
  },
  setName(state, name) {
    state.name = name
  },
  setLocale(state, locale) {
    state.locale = locale
  },
  clearUserStatus(state) {
    state.isLoggedIn = false
    state.userId = ""
    state.email = ""
    state.name = ""
    state.locale = ""
  },
  setIdToken(state, idToken) {
    state.idToken = idToken
  }
}

export const actions = {
  async getIdToken(context) {
    const auth = getAuth();
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      context.commit('setIdToken', idToken)
    })
    .catch((e) => {
      console.log('getIdToken error', e)
    });
  },
  async getUserInfo(context, uid) {
    const url = `${process.env.url}/users/${uid}`;
    await axios.get(url, { headers: {Authorization: `Bearer ${context.state.idToken}`}, params: {token: context.state.idToken, "uid": uid}})
    .then((res) =>{
      if (res.data["is_name"]) {
        context.commit('setName', res.data["name"])
        context.commit('setLocale', res.data["locale"])
      }
    })
    .catch( e => {
      const payload = {"message": "ユーザー情報取得中にエラーが発生しました", "color": "red lighten-2"}
      context.dispatch('util/showAlert', payload, {root: true})
      console.log('signin getuser error', e)
    })
  },
  signUp(context, payload) {
    const auth = getAuth(this.$firebase)
    createUserWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      context.commit('setUserId', userCredential.user.uid)
      context.commit('setEmail', userCredential.user.email)
      context.dispatch('sendVerificationMail')
      this.$router.push('/auth/signin')
    })
    .catch( e => {
      const payload = {"message": "ユーザー登録できませんでした", "color": "red lighten-2"}
      context.dispatch('util/showAlert', payload, {root: true})
      console.log('【signUp error】', e)
    })
  },
  async sendVerificationMail() {
    const auth = getAuth()
    const user = auth.currentUser
    const actionCodeSettings = {
      url: process.env.urlAfterVertification
    };
    await sendEmailVerification(user, actionCodeSettings)
    .then(() => {
      const payload = {"message": "メールを認証してください。", "color": "success"}
      context.dispatch('util/showAlert', payload, {root: true})
    })
    .catch((e) => {
      console.log('【can not send email】', e)
    });
  },
  async registerBackUserInfo(context, payload) {
    await context.dispatch('getIdToken')
    const url = `${process.env.url}/users`;
    axios.post(url, {token: context.state.idToken, user: {"name": payload["name"], "locale": "ja"}})
    .then((res) =>{
      if (res.data.name) {
        context.commit('setName', res.data["name"])
        context.commit('setLocale', res.data["locale"])
        context.commit('setSigninStatus', true)
        this.$router.push('/dashboard')
      } else {
        const payload = {"message": "名前を登録できませんでした", "color": "red lighten-2"}
        context.dispatch('util/showAlert', payload, {root: true})
        console.log('no res.data.name')
      }
    })
    .catch((e) => {
      const payload = {"message": "名前を登録できませんでした", "color": "red lighten-2"}
      context.dispatch('util/showAlert', payload, {root: true})
      console.log('registerBackUserInfo error', e)
    });
  },
  async signin(context, payload) {
    const auth = getAuth(this.$firebase)
    let uid = ""
    let is_verified = false
    await signInWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      if (userCredential.user.emailVerified) {
        is_verified = true
        uid = userCredential.user.uid;
        context.commit('setUserId', uid)
        context.commit('setEmail', userCredential.user.email)
      } else {
        throw new Error("メール認証なし");
      }
    })
    .catch( e => {
      if (e.message == "メール認証なし") {
        const payload = {"message": "メール認証なし", "color": "red lighten-2"}
        context.dispatch('util/showAlert', payload, {root: true})
        console.log('【signin error】', e)
      } else {
        const payload = {"message": "ログインできません。", "color": "red lighten-2"}
        context.dispatch('util/showAlert', payload, {root: true})
        console.log('【signin error】', e)
      }
    })
    if (is_verified) {
      await context.dispatch('getIdToken')
      await context.dispatch('getUserInfo', uid)
      if (context.state.name) {
        context.commit('setSigninStatus', true)
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/auth/registerBackUserInfo')
      }
    }
  },
  async signOut(context) {
    const auth = getAuth(this.$firebase)
    await signOut(auth)
    .then(()=>{
      context.commit('clearUserStatus')
      this.$router.push('/auth/signin')
    })
    .catch( e => {
      const payload = {"message": "ログアウト中にエラーが発生しました。", "color": "red lighten-2"}
      context.dispatch('util/showAlert', payload, {root: true})
      console.log('【signOut error】', e)
    })
  },
  async updateEmail(context, payload) {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, payload["password"])
    let is_credentialed = false
    await reauthenticateWithCredential(user, credential)
    .then(() => {
      is_credentialed = true
    })
    .catch((e) => {
      const payload = {"message": "入力した値を見直してください。", "color": "red lighten-2"}
      context.dispatch('util/showAlert', payload, {root: true})
      console.log('cant get credential', e)
    });
    if (is_credentialed) {
      await updateEmail(user, payload["email"]).then(() => {
        context.dispatch('sendVerificationMail')
        context.commit('clearUserStatus')
        this.$router.push('/auth/signin')
      }).catch((e) => {
        const payload = {"message": "メールアドレスを変更できませんでした。", "color": "red lighten-2"}
        context.dispatch('util/showAlert', payload, {root: true})
        console.log('【updateEmail error】', e)
      });
    } else {
      return
    }
  },
  async updatePassword(context, payload) {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, payload["currentPassword"])
    let is_credentialed = false
    await reauthenticateWithCredential(user, credential)
    .then(() => {
      is_credentialed = true
    })
    .catch((e) => {
      const payload = {"message": "入力した値を見直してください。", "color": "red lighten-2"}
      context.dispatch('util/showAlert', payload, {root: true})
      console.log('cant get credential', e)
    });
    if (is_credentialed) {
      await updatePassword(user, payload["newPassword"])
      .then(() => {
        const payload = {"message": "パスワードを更新しました。", "color": "success"}
        context.dispatch('util/showAlert', payload, {root: true})
        context.commit('clearUserStatus')
        this.$router.push('/auth/signin')
      }).catch((error) => {
        const payload = {"message": "パスワードを変更できませんでした。", "color": "red lighten-2"}
        context.dispatch('util/showAlert', payload, {root: true})
        console.log('updatePassword error】', e)
      });
    } else {
      return
    }
  },
  async deleteUser(context) {
    await context.dispatch('deleteFirebaseUserInfo', "password")
    .then(() => {
      context.dispatch('deleteBackUserInfo')
    })
    .then(() => {
      context.commit('clearUserStatus')
      this.$router.push('/auth/signin')
    })
  },
  async deleteFirebaseUserInfo(context, password) {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password)
    let is_credentialed = false
    await reauthenticateWithCredential(user, credential)
    .then(() => {
      is_credentialed = true
    })
    .catch((e) => {
      const payload = {"message": "入力した値を見直してください。", "color": "red lighten-2"}
      context.dispatch('util/showAlert', payload, {root: true})
      console.log('cant get credential', e)
    });
    if (is_credentialed) {
      await deleteUser(user)
      .then(() => {
        return
      })
      .catch((e) => {
        const payload = {"message": "ユーザー情報を削除できませんでした", "color": "red lighten-2"}
        context.dispatch('util/showAlert', payload, {root: true})
        console.log('deleteFirebaseUserInfo error', e)
      });
    } else {
      return
    }
  },
  deleteBackUserInfo(context) {
    const url = `${process.env.url}/users/destroy`;
    axios.delete(url, {params: {token: context.state.idToken, "uid": context.state.userId}})
    .then((res) =>{
      return
    })
    .catch((e) => {
      console.log('【backend destroy error】', e)
      this.$router.push('/auth/signin')
    });
  }
}
