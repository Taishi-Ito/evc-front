import axios from 'axios'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, onAuthStateChanged} from 'firebase/auth'

export const state = () => ({
  message: 'Hello Vuex!',
  isLoggedIn: false,
  userId: '',
  email: '',
  name: '',
  locale: ''
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
  }
}

export const actions = {
  updateMessageAction(context, payload) {
    const url = '/api/v1/hello'
    let query = payload
    axios.get(url, {params:{message: query}})
    .then((res) =>{
      context.commit('updateMessage', res.data)
    })
    .catch( e => {
      alert(e.message)
      console.log('【error】', e)
    })
  },
  signUp(context, payload) {
    const auth = getAuth(this.$firebase)
    createUserWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      context.dispatch('addUserInfo', userCredential.user)
    })
    .catch( e => {
      console.log('【signUp error】', e)
    })
  },
  registerBackUserInfo(context, payload) {
    const url = '/api/v1/users'
    const auth = getAuth();
    onAuthStateChanged(auth, user=>{
      axios.post(url, {user: {"uid": user["uid"], "name": payload["name"]}})
      .then((res) =>{
        context.commit('setName', res.data["name"])
        context.commit('setLocale', res.data["locale"])
        context.commit('setSigninStatus', true)
        context.commit('setUserId', user["uid"])
        context.commit('setEmail', user["email"])
        this.$router.push('/dashbord')
      })
      .catch((e) => {
        alert(e.message)
        console.log('registerBackUserInfo error】', e)
      });
    })
  },
  async signin(context, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      const params = {"uid": userCredential.user.uid, "email": userCredential.user.email}
      context.dispatch('addUserInfo', params)
    })
    .catch( e => {
      alert(e.message)
      console.log('【error】', e)
    })
  },
  async signOut(context) {
    const auth = getAuth(this.$firebase)
    await signOut(auth)
    .then(()=>{
      context.commit('setSigninStatus', false)
      context.commit('setUserId', '')
      context.commit('setEmail', '')
      context.commit('setName', '')
      context.commit('setLocale', '')
      this.$router.push('/')
    })
    .catch( e => {
      alert(e.message)
      console.log('【error】', e)
    })
  },
  addUserInfo(context, payload) {
    const url = '/api/v1/users/get_user'
    axios.get(url, {params: {"uid": payload.uid}})
    .then((res) =>{
      if (!res.data["is_name"]) {
        this.$router.push('/auth/registerBackUserInfo')
      } else {
        context.commit('setName', res.data["name"])
        context.commit('setLocale', res.data["locale"])
        context.commit('setSigninStatus', true)
        context.commit('setUserId', payload["uid"])
        context.commit('setEmail', payload["email"])
        this.$router.push('/dashbord')
      }
    })
  },
  async deleteUser(context) {
    if (context.dispatch('deleteFirebaseUserInfo')) {
      if (context.dispatch('deleteBackUserInfo')) {
        this.$router.push('/auth/register')
      } else {
        alert("ユーザー削除失敗")
      }
    } else {
      alert("ユーザー削除失敗")
    }
  },
  async deleteFirebaseUserInfo(context) {
    const auth = getAuth();
    const user = auth.currentUser;
    await deleteUser(user)
    .then(() => {
      context.commit('setSigninStatus', false)
      context.commit('setUserId', '')
      context.commit('setEmail', '')
      context.commit('setName', '')
      context.commit('setLocale', '')
      return true
    })
    .catch((e) => {
      alert(e.message)
      console.log('【deleteUser error】', e)
      return false
    });
  },
  deleteBackUserInfo(context) {
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    const url = '/api/v1/users/destroy'
    axios.delete(url, {params: {"uid": uid}})
    .then((res) =>{
      if (res.data["is_destroy"]) {
        return true
      } else {
        return false
      }
    })
  }
}
