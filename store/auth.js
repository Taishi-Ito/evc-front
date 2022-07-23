import axios from 'axios'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'

export const state = () => ({
  message: 'Hello Vuex!',
  isLoggedIn: false,
  userId: '',
  email: ''
})

export const getters = ({
  message: state => state.message,
  isLoggedIn: state => !!state.isLoggedIn,
  userId: state => state.userId,
  email: state => state.email,
})

export const mutations = {
  updateMessage: function(state, payload) {
    state.message = payload
  },
  setLoginStatus(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setEmail(state, email) {
    state.email = email
  },
}

export const actions = {
  updateMessageAction(context, payload) {
    const url = '/api/v1/hello'
    let query = payload
    axios.get(url, {params:{message: query}})
      .then((res) =>{
        context.commit('updateMessage', res.data)
      })
  },
  signUp(context, params) {
    const auth = getAuth(this.$firebase)
    createUserWithEmailAndPassword(auth, params["email"], params["password"])
    .then( userCredential => {
      console.log('【userCredential.user】', userCredential.user)
      console.log('ユーザー登録OK')
      this.$router.push('/dashbord')
    })
    .catch( e => {
      alert(e.message)
      console.log('【error】', e)
    })
  },
  async login(context, params) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, params["email"], params["password"])
    .then( userCredential => {
      context.commit('setLoginStatus', true)
      context.commit('setUserId', userCredential.user.uid)
      context.commit('setEmail', userCredential.user.email)
      console.log('ログインOK')
      this.$router.push('/dashbord')
			// ここでログイン後にルートに飛ばしている
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
      context.commit('setLoginStatus', false)
      context.commit('setUserId', '')
      context.commit('setEmail', '')
      this.$router.push('/')
    })
    .catch( e => {
      alert(e.message)
      console.log('【error】', e)
    })
  },
  addUserInfo(context, payload) {
    context.commit('setLoginStatus', true)
    context.commit('setUserId', payload.uid)
    context.commit('setEmail', payload.email)
    this.$router.push('/dashbord')
  }
}
