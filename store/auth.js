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
  },
  clearUserStatus(state) {
    state.isLoggedIn = ""
    state.userId = ""
    state.email = ""
    state.name = ""
    state.locale = ""
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
      console.log('【updateMessageAction error】', e)
    })
  },
  signUp(context, payload) {
    const auth = getAuth(this.$firebase)
    createUserWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      this.$router.push('/auth/registerBackUserInfo')
    })
    .catch( e => {
      alert("ユーザー登録できませんでした")
      console.log('【signUp error】', e)
    })
  },
  registerBackUserInfo(context, payload) {
    const url = '/users'
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    const email = auth.currentUser.email;
    axios.post(url, {user: {"uid": uid, "name": payload["name"], "locale": "ja"}})
    .then((res) =>{
      if (res.data.name) {
        const payload = {"uid": uid, "email": email, "name": res.data["name"], "locale": res.data["locale"]}
        context.dispatch('addUserInfo', payload)
        this.$router.push('/dashboard')
      } else {
        alert("名前を登録できませんでした")
        console.log('registerBackUserInfo validation error】')
      }
    })
    .catch((e) => {
      alert("名前を登録できませんでした")
      console.log('registerBackUserInfo error】', e)
    });
  },
  async signin(context, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload["email"], payload["password"])
    .then( userCredential => {
      const uid = userCredential.user.uid;
      const email = userCredential.user.email;
      const url = '/users/' + uid;
      axios.get(url, {params: {"uid": uid}})
      .then((res) =>{
        if (res.data["is_user"]) {
          if (res.data["is_name"]) {
            const payload = {"uid": uid, "email": email, "name": res.data["name"], "locale": res.data["locale"]}
            context.dispatch('addUserInfo', payload)
            this.$router.push('/auth/dashboard')
          } else {
            alert("名前を登録してください")
            this.$router.push('/auth/registerBackUserInfo')
          }
        } else {
          alert("名前を登録してください")
          this.$router.push('/auth/registerBackUserInfo')
        }
      })
      .catch( e => {
        alert("ユーザー情報取得中にエラーが発生しました")
        console.log('signin getuser error】', e)
      })
    })
    .catch( e => {
      alert("ログイン情報を取得できません")
      console.log('【signin error】', e)
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
      this.$router.push('/auth/signin')
    })
    .catch( e => {
      alert(e.message)
      console.log('【signOut error】', e)
    })
  },
  addUserInfo(context, payload) {
    context.commit('setSigninStatus', true)
    context.commit('setUserId', payload["uid"])
    context.commit('setEmail', payload["email"])
    context.commit('setName', payload["name"])
    context.commit('setLocale', payload["locale"])
  },
  async deleteUser(context) {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = auth.currentUser.uid;
    try {
      context.dispatch('deleteFirebaseUserInfo', user)
    } catch(e) {
      console.log('addUserInfo deleteFirebaseUserInfo】', e)
      return
    }
    try {
      context.dispatch('deleteBackUserInfo', uid)
    } catch(e) {
      console.log('addUserInfo deleteBackUserInfo', e)
      return
    }
    this.$router.push('/auth/register')
  },
  async deleteFirebaseUserInfo(context, user) {
    await deleteUser(user)
    .then(() => {
      context.commit('setSigninStatus', false)
      context.commit('setUserId', '')
      context.commit('setEmail', '')
    })
    .catch((e) => {
      alert("ユーザー情報を削除できませんでした")
      console.log('deleteFirebaseUserInfo error】', e)
    });
  },
  deleteBackUserInfo(context, uid) {
    const url = '/users/destroy'
    axios.delete(url, {params: {"uid": uid}})
    .then((res) =>{
      context.commit('setName', '')
      context.commit('setLocale', '')
    })
    .catch((e) => {
      alert("ユーザー情報を削除できませんでした")
      console.log('deleteBackUserInfo error】', e)
    });
  }
}
