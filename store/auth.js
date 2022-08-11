import axios from 'axios'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider} from 'firebase/auth'

export const state = () => ({
  message: 'Hello Vuex!',
  isLoggedIn: false,
  userId: '',
  email: '',
  name: '',
  locale: '',
  idToken: ''
})

export const getters = ({
  message: state => state.message,
  isLoggedIn: state => !!state.isLoggedIn,
  userId: state => state.userId,
  email: state => state.email,
  name: state => state.name,
  locale: state => state.locale
})

export const mutations = {
  updateMessage: function(state, payload) {
    state.message = payload
  },
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
  updateMessageAction(context, payload) {
    const url = `${process.env.url}/api/v1/hello`
    let query = payload
    axios.get(url, {params:{token: context.state.idToken, message: query}})
    .then((res) =>{
      context.commit('updateMessage', res.data)
    })
    .catch( e => {
      alert(e.message)
      console.log('【updateMessageAction error】', e)
    })
  },
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
    const url = `${process.env.url}/api/v1/users/${uid}`;
    await axios.get(url, { headers: {Authorization: `Bearer ${context.state.idToken}`}, params: {token: context.state.idToken, "uid": uid}})
    .then((res) =>{
      if (res.data["is_name"]) {
        context.commit('setName', res.data["name"])
        context.commit('setLocale', res.data["locale"])
      }
    })
    .catch( e => {
      alert("ユーザー情報取得中にエラーが発生しました")
      console.log('signin getuser error】', e)
    })
  },
  signUp(context, payload) {
    const auth = getAuth(this.$firebase)
    createUserWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      context.commit('setUserId', userCredential.user.uid)
      context.commit('setEmail', userCredential.user.email)
      this.$router.push('/auth/registerBackUserInfo')
    })
    .catch( e => {
      alert("ユーザー登録できませんでした")
      console.log('【signUp error】', e)
    })
  },
  async registerBackUserInfo(context, payload) {
    await context.dispatch('getIdToken')
    const url = `${process.env.url}/api/v1/users`;
    axios.post(url, {token: context.state.idToken, user: {"name": payload["name"], "locale": "ja"}})
    .then((res) =>{
      if (res.data.name) {
        context.commit('setName', res.data["name"])
        context.commit('setLocale', res.data["locale"])
        context.commit('setSigninStatus', true)
        this.$router.push('/dashboard')
      } else {
        alert("名前を登録できませんでした")
        console.log('no res.data.name')
      }
    })
    .catch((e) => {
      alert("名前を登録できませんでした")
      console.log('registerBackUserInfo error', e)
    });
  },
  async signin(context, payload) {
    const auth = getAuth(this.$firebase)
    let uid = ""
    await signInWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      uid = userCredential.user.uid;
      context.commit('setUserId', uid)
      context.commit('setEmail', userCredential.user.email)
    })
    .catch( e => {
      alert("ログインできません")
      console.log('【signin error】', e)
    })
    await context.dispatch('getIdToken')
    await context.dispatch('getUserInfo', uid)
    if (context.state.name) {
      context.commit('setSigninStatus', true)
      this.$router.push('/dashboard')
    } else {
      this.$router.push('/auth/registerBackUserInfo')
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
      alert(e.message)
      console.log('【signOut error】', e)
    })
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
      console.log('cant get credential', e)
    });
    if (is_credentialed) {
      await deleteUser(user)
      .then(() => {
        return
      })
      .catch((e) => {
        alert("ユーザー情報を削除できませんでした")
        console.log('deleteFirebaseUserInfo error', e)
      });
    } else {
      return
    }
  },
  deleteBackUserInfo(context) {
    const url = `${process.env.url}/api/v1/users/destroy`;
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
