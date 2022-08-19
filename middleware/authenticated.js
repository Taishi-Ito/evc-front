import { getAuth, onAuthStateChanged} from 'firebase/auth'

export default async function({
  $firebase,
  store,
  route,
  redirect
}) {
  const auth = getAuth($firebase)
  if (!store.getters['auth/isLoggedIn']){
    if (!route.path.match(/\/auth\//) || route.path.match(/registerBackUserInfo/)) {
      onAuthStateChanged(auth, async function (user) {
        if (user) {
          if (user.emailVerified) {
            store.commit('auth/setUserId', user.uid)
            store.commit('auth/setEmail', user.email)
            await store.dispatch('auth/getIdToken')
            await store.dispatch('auth/getUserInfo', user.uid)
            if (store.state.auth.name) {
              store.commit('auth/setSigninStatus', true)
              if (route.path == "/") {
                redirect('/dashboard')
              }
            } else {
              redirect('/auth/registerBackUserInfo')
            }
          } else {
            const payload = {"message": "メールを認証してください。", "color": "red lighten-2"}
            context.dispatch('util/showAlert', payload, {root: true})
            redirect('/auth/signin')
          }
        } else {
          redirect('/auth/signin')
        }
      });
    }
  }
}
