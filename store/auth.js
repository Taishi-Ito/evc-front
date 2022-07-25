import axios from 'axios'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser} from 'firebase/auth'

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
      const params = {"name": payload["name"], "uid": userCredential.user.uid, "locale": "ja"}
      context.dispatch('registerUserInfo', params)
    })
    .catch( e => {
      console.log('【signUp error】', e)
    })
  },
  registerUserInfo(context, payload) {
    const url = '/api/v1/users'
    const params = {"user": {"name": payload["name"], "uid": payload["uid"], "locale": payload["locale"]}}
    axios.post(url, params)
    .then((res) =>{
      this.$router.push('/dashbord')
    })
    .catch( e => {
      console.log('【registerUserInfo error】', e)
    })
  },
  async signin(context, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      const params = {"uid": userCredential.user.uid, "email": userCredential.user.email}
      try {
        context.dispatch('addUserInfo', params)
      } catch(e) {
        redirect('/auth/signin')
      }
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
    console.log('【payload】', payload)
    context.commit('setSigninStatus', true)
    context.commit('setUserId', payload["uid"])
    context.commit('setEmail', payload["email"])

    const url = '/api/v1/users/get_user'
    axios.get(url, {params: {"uid": payload["uid"]}})
    .then((res) =>{
      context.commit('setName', res.data["name"])
      context.commit('setLocale', res.data["locale"])
    })

    // ここでログイン後にルートに飛ばしている
    this.$router.push('/dashbord')
  },
  async deleteUser(context) {
    const auth = getAuth();
    const user = auth.currentUser;
    await deleteUser(user)
    .then(() => {
      context.commit('setSigninStatus', false)
      context.commit('setUserId', '')
      context.commit('setEmail', '')
      context.commit('setName', '')
      context.commit('setLocale', '')
      this.$router.push('/auth/register')
    })
    .catch((e) => {
      alert(e.message)
      console.log('【deleteUser error】', e)
    });
  }
}
