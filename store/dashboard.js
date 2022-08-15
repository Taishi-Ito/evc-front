import axios from 'axios'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export const state = () => ({
  workGroupLists: []
})

export const getters = ({
  workGroupLists: state => state.workGroupLists
})

export const mutations = {
  addToWorkGroupLists: function(state, payload) {
    state.workGroupLists.push(payload)
  },
  updateWorkGroupLists(state, payload) {
    state.workGroupLists = payload
  }
}

export const actions = {
  async createWorkGroup(context, payload) {
    const url = `${process.env.url}/work_groups`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.post(url, {token: idToken, work_group: {"uid": uid, "title": payload}})
      .then((res) =>{
        context.commit('addToWorkGroupLists', res.data.title)
      })
      .catch( e => {
        alert(e.message)
        console.log('createWorkGroup error】', e)
      })
    })
    .catch((e) => {
      console.log('createWorkGroup トークン取得エラー', e)
    });
  },
  getWorkGroups(context) {
    const url = `${process.env.url}/work_groups`;
    const auth = getAuth();
    onAuthStateChanged(auth, user=>{{
      if (user && user.emailVerified){
        axios.get(url, {params: {token: user.accessToken, "uid": user.uid}})
        .then((res) =>{
          context.commit('updateWorkGroupLists', res.data.work_group_titles)
        })
        .catch( e => {
          alert(e.message)
          console.log('getWorkGroups error', e)
        })
      }
    }}
    )
  }
}
