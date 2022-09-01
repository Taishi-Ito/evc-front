import axios from 'axios'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export const state = () => ({
  workGroupProjectLists: []
})

export const getters = ({
  workGroupProjectLists: state => state.workGroupProjectLists
})

export const mutations = {
  updateWorkGroupProjectLists(state, payload) {
    state.workGroupProjectLists = null
    state.workGroupProjectLists = []
    state.workGroupProjectLists = payload
  },
  updateWorkGroupTitle(state, payload) {
    state.workGroupProjectLists.map(function(value) {
      if (value["workGroupTitle"]["id"] == payload["id"]) {
        value["workGroupTitle"]["title"] = payload["work_group_titles"]
      }
    })
  },
  addWorkGroup(state, payload) {
    let workGroupProjectList = {"workGroupTitle": {"id": payload["id"], "title": payload["title"]}, "projectTitles": []}
    state.workGroupProjectLists.push(workGroupProjectList)
  },
  deleteWorkGroup(state, payload) {
    state.workGroupProjectLists.some(function(value, index){
      if (value["workGroupTitle"]["id"] == payload) {
        state.workGroupProjectLists.splice(index, 1)
      }
    });
  },
  addProject(state, payload) {
    state.workGroupProjectLists.map(function(value) {
      if (value["workGroupTitle"]["id"] == payload["work_group_id"]) {
        value["projectTitles"].push({"title": payload["title"], "id": payload["id"]})
      }
    })
  },
  updateProjectTitle(state, payload) {
    state.workGroupProjectLists.map(function(value) {
      if (value["workGroupTitle"]["id"] == payload["work_group_id"]) {
        value["projectTitles"].map(function(value) {
          if(value["id"] == payload["project_id"]) {
            value["title"] = payload["project_titles"]
          }
        })
      }
    })
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
        context.commit('addWorkGroup', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "ワークグループを作成できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "createWorkGroup",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "ワークグループを作成できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "createWorkGroup",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  getWorkGroupProjectLists(context) {
    const url = `${process.env.url}/projects`;
    const auth = getAuth();
    onAuthStateChanged(auth, user=>{{
      if (user && user.emailVerified){
        axios.get(url, {params: {token: user.accessToken, "uid": user.uid}})
        .then((res) =>{
          context.commit('updateWorkGroupProjectLists', res.data["work_group_project_lists"])
        })
        .catch( e => {
          const payload = {
            "message": "ワークグループを取得できませんでした",
            "detail": "エラーが発生しました。お問い合わせください。",
            "method": "getWorkGroupProjectLists",
            "errorMessage": e.message,
            "color": "red lighten-2"
          }
          context.dispatch('util/showAlert', payload, {root: true})
        })
      }
    }}
    )
  },
  async changeWorkGroupTitle(context, payload) {
    const url = `${process.env.url}/work_groups/${payload["id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.put(url, {token: idToken, work_group: {"id": payload["id"], "title": payload["title"]}})
      .then((res) =>{
        context.commit('updateWorkGroupTitle', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "ワークグループ名を変更できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "changeWorkGroupTitle",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "ワークグループ名を変更できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async changeProjectTitle(context, payload) {
    const url = `${process.env.url}/projects/${payload["id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.put(url, {token: idToken, project: {"project_id": payload["id"], "title": payload["title"]}})
      .then((res) =>{
        context.commit('updateProjectTitle', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "プロジェクト名を変更できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "changeProjectTitle",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "プロジェクト名を変更できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async createProject(context, payload) {
    const url = `${process.env.url}/projects`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.post(url, {token: idToken, project: {"uid": uid, "title": payload["title"], "work_group_id": payload["work_group_id"]}})
      .then((res) =>{
        context.commit('addProject', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "プロジェクトを作成できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "createProject",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "プロジェクトを作成できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async deleteWorkGroup(context, payload) {
    const url = `${process.env.url}/work_groups/${payload}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.delete(url, {params: {token: idToken, "uid": uid, "id": payload}})
      .then((res) =>{
        context.commit('deleteWorkGroup', res.data.work_group_id)
      })
      .catch( e => {
        const payload = {
          "message": "ワークグループを削除できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "deleteWorkGroup",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "ワークグループを削除できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
}
