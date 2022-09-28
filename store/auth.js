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
      const payload = {
        "message": "ユーザー情報取得中にエラーが発生しました。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async getUserInfo(context, uid) {
    const url = `${process.env.url}/users/${uid}`;
    await axios.get(url, { headers: {Authorization: `Bearer ${context.state.idToken}`}, params: {token: context.state.idToken, "uid": uid}})
    .then((res) =>{
      if (res.status == 200) {
        context.commit('setName', res.data["name"])
        context.commit('setLocale', res.data["locale"])
      } else {
        this.$router.push('/auth/registerBackUserInfo')
      }
    })
    .catch( e => {
      const payload = {
        "message": "ユーザー情報取得中にエラーが発生しました。",
        "detail": e?.response?.data?.message,
        "method": "getUserInfo",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
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
      const payload = {
        "message": "ユーザー登録できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "signUp",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    })
  },
  async sendVerificationMail(context) {
    const auth = getAuth()
    const user = auth.currentUser
    const actionCodeSettings = {
      url: process.env.urlAfterVertification
    };
    await sendEmailVerification(user, actionCodeSettings)
    .then(() => {
      const payload = {
        "message": "認証メールを送信しました。メールアドレスを認証してください。",
        "color": "success"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    })
    .catch((e) => {
      const payload = {
        "message": "認証メールを送信できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "sendEmailVerification",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async registerBackUserInfo(context, payload) {
    await context.dispatch('getIdToken')
    const url = `${process.env.url}/users`;
    axios.post(url, {token: context.state.idToken, user: {"name": payload["name"], "locale": "ja"}})
    .then((res) =>{
      context.commit('setName', res.data["name"])
      context.commit('setLocale', res.data["locale"])
      context.commit('setSigninStatus', true)
      this.$router.push('/dashboard')
    })
    .catch((e) => {
      const payload = {
        "message": "名前を登録できませんでした",
        "detail": e?.response?.data?.message,
        "method": "registerBackUserInfo",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async signin(context, payload) {
    const auth = getAuth(this.$firebase)
    let uid = ""
    let is_verified = false
    await signInWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      is_verified = true
      uid = userCredential.user.uid;
      context.commit('setUserId', uid)
      context.commit('setEmail', userCredential.user.email)

      // if (userCredential.user.emailVerified) {
      //   is_verified = true
      //   uid = userCredential.user.uid;
      //   context.commit('setUserId', uid)
      //   context.commit('setEmail', userCredential.user.email)
      // } else {
      //   throw new Error("メール認証なし");
      // }
    })
    .catch( e => {
      if (e.message == "メール認証なし") {
        const payload = {
          "message": "ログインできませんでした。メールの認証はお済みですか？",
          "method": "signInWithEmailAndPassword",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      } else {
        const payload = {
          "message": "ログインできません。",
          "detail": "エラーが発生しました。お問い合わせください。",
          "method": "signInWithEmailAndPassword",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      }
    })
    if (is_verified) {
      await context.dispatch('getIdToken')
      await context.dispatch('getUserInfo', uid)
      if (context.state.name) {
        context.commit('setSigninStatus', true)
        this.$router.push('/dashboard')
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
      const payload = {
        "message": "ログアウトできませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "signOut",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
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
      const payload = {
        "message": "入力した値を見直してください。",
        "method": "reauthenticateWithCredential",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
    if (is_credentialed) {
      await updateEmail(user, payload["email"]).then(() => {
        context.dispatch('sendVerificationMail')
        context.commit('clearUserStatus')
        this.$router.push('/auth/signin')
      }).catch((e) => {
        const payload = {
          "message": "メールアドレスを変更できませんでした。",
          "detail": "エラーが発生しました。お問い合わせください。",
          "method": "updateEmail",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
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
      const payload = {
        "message": "入力した値を見直してください。",
        "method": "reauthenticateWithCredential",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
    if (is_credentialed) {
      await updatePassword(user, payload["newPassword"])
      .then(() => {
        const payload = {"message": "パスワードを更新しました。", "color": "success"}
        context.dispatch('util/showAlert', payload, {root: true})
        context.commit('clearUserStatus')
        this.$router.push('/auth/signin')
      }).catch((error) => {
        const payload = {
          "message": "パスワードを変更できませんでした。",
          "detail": "エラーが発生しました。お問い合わせください。",
          "method": "updatePassword",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
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
      const payload = {
        "message": "入力した値を見直してください。",
        "method": "reauthenticateWithCredential",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
    if (is_credentialed) {
      await deleteUser(user)
      .then(() => {
        return
      })
      .catch((e) => {
        const payload = {
          "message": "ユーザー情報を削除できませんでした。",
          "detail": "エラーが発生しました。お問い合わせください。",
          "method": "deleteUser",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
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
      const payload = {
        "message": "エラーが発生しました。お問い合わせください。",
        "detail": e?.response?.data?.message,
        "method": "deleteBackUserInfo",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
      this.$router.push('/auth/signin')
    });
  }
}
