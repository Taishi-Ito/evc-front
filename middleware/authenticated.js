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
              store.dispatch('dashboard/getWorkGroupProjectLists')
              if (route.path == "/" || route.path.match(/\/auth\//)) {
                redirect('/dashboard')
              }
            } else if (route.path.match(/registerBackUserInfo/))  {
              const payload = {
                "message": "名前を登録してください。",
                "color": "success",
                "timeout": 5000
              }
              store.dispatch('util/showAlert', payload, {root: true})
            } else {
              redirect('/auth/registerBackUserInfo')
            }
          } else {
            const payload = {
              "message": "メールアドレスを認証してください。",
              "color": "success"
            }
            store.dispatch('util/showAlert', payload, {root: true})
            redirect('/auth/signin')
          }
        } else {
          redirect('/auth/signin')
        }
      });
    }
  }
}
