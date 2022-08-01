import axios from 'axios'
import {getAuth} from 'firebase/auth'

export const state = () => ({
  workGroupLists: []
})

export const getters = ({
  workGroupLists: state => state.workGroupLists
})

export const mutations = {
  addToWorkGroupLists: function(state, payload) {
    state.workGroupLists.psuh(payload)
  }
}

export const actions = {
  createWorkGroup(context, payload) {
    const url = '/work_groups'
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    axios.post(url, {work_group: {"uid": uid, "title": payload["title"]}})
    .then((res) =>{
      console.log('【res】')
      context.commit('addToWorkGroupLists', res.data)
    })
    .catch( e => {
      alert(e.message)
      console.log('createWorkGroup error】', e)
    })
  },
}
