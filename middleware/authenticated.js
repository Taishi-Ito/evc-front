import { getAuth, onAuthStateChanged} from 'firebase/auth'
import axios from 'axios'

export default function({
  $firebase,
  store,
  route,
  redirect
}) {
  const auth = getAuth($firebase)
  if (!store.getters['auth/isLoggedIn']){
    onAuthStateChanged(auth, user=>{
      if (user){
        const uid = user.uid;
        const email = user.email;
        const url = '/users/' + uid;
        axios.get(url, {params: {"uid": uid}})
        .then((res) =>{
          if (res.data["is_user"]) {
            if (res.data["is_name"]) {
              const payload = {"uid": uid, "email": email, "name": res.data["name"], "locale": res.data["locale"]}
              store.dispatch('auth/addUserInfo', payload)
            } else if (!route.path.match(/\/auth\//)) {
              alert("名前を登録してください")
              redirect('/auth/registerBackUserInfo')
            }
          } else if (!route.path.match(/\/auth\//)) {
            redirect('/auth/registerBackUserInfo')
          }
        })
        .catch( e => {
          alert("ユーザー情報取得中にエラーが発生しました")
          console.log('checkBackUserInfo error】', e)
        })
      } else if (!route.path.match(/\/auth\//) || route.path.match(/\/registerBackUserInfo/)) {
        redirect('/auth/signin')
      }
    })
  }
}
