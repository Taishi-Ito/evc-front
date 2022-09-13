import axios from 'axios'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Vue from 'vue'

export const state = () => ({
  workGroupProjectLists: [],
  capitalInvestmentUnit: "",
  capitalInvestmentFixed: 0,
  capitalInvestmentRecords: [],
  capitalInvestmentId: null,
  plUnit: "",
  plFixed: 0,
  plRecords: [],
  plId: null,
})

export const getters = ({
  workGroupProjectLists: state => state.workGroupProjectLists,
  capitalInvestmentUnit: state => state.capitalInvestmentUnit,
  capitalInvestmentUnitNumber(state) {
    if (state.capitalInvestmentUnit == "yen") {
      return 1
    } else if (state.capitalInvestmentUnit == "thousand") {
      return 1000
    } else if (state.capitalInvestmentUnit == "million") {
      return 1000000
    } else if (state.capitalInvestmentUnit == "hundred_million") {
      return 100000000
    }
  },
  capitalInvestmentUnitTitle(state) {
    if (state.capitalInvestmentUnit == "yen") {
      return "円"
    } else if (state.capitalInvestmentUnit == "thousand") {
      return "千円"
    } else if (state.capitalInvestmentUnit == "million") {
      return "百万円"
    } else if (state.capitalInvestmentUnit == "hundred_million") {
      return "億円"
    }
  },
  capitalInvestmentFixed: state => state.capitalInvestmentFixed,
  capitalInvestmentRecords: state => state.capitalInvestmentRecords,
  capitalInvestmentId: state => state.capitalInvestmentId,
  plUnit: state => state.plUnit,
  plUnitNumber(state) {
    if (state.plUnit == "yen") {
      return 1
    } else if (state.plUnit == "thousand") {
      return 1000
    } else if (state.plUnit == "million") {
      return 1000000
    } else if (state.plUnit == "hundred_million") {
      return 100000000
    }
  },
  plUnitTitle(state) {
    if (state.plUnit == "yen") {
      return "円"
    } else if (state.plUnit == "thousand") {
      return "千円"
    } else if (state.plUnit == "million") {
      return "百万円"
    } else if (state.plUnit == "hundred_million") {
      return "億円"
    }
  },
  plFixed: state => state.plFixed,
  plRecords: state => state.plRecords,
  plId: state => state.plId,
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
  },
  deleteProject(state, payload) {
    state.workGroupProjectLists.some(function(value, wgIndex){
      if (value["workGroupTitle"]["id"] == payload["work_group_id"]) {
        value["projectTitles"].some(function(value, pjIndex) {
          if(value["id"] == payload["project_id"]) {
            state.workGroupProjectLists[wgIndex]["projectTitles"].splice(pjIndex, 1)
          }})
      }
    });
  },
  updateCapitalInvestment(state, payload) {
    state.capitalInvestmentUnit = payload["unit"]
    state.capitalInvestmentFixed = payload["fixed"]
  },
  updateCapitalInvestmentRecords(state, payload) {
    payload["unit"] ? state.capitalInvestmentUnit = payload["unit"] : null
    payload["fixed"] ? state.capitalInvestmentFixed = payload["fixed"] : null
    payload["capital_investment_id"] ? state.capitalInvestmentId = payload["capital_investment_id"] : null
    state.capitalInvestmentRecords = payload["capital_investments"]
  },
  updateCapitalInvestmentRecordRow(state, payload) {
    state.capitalInvestmentRecords.some(function(value, index){
      if (value["record_id"] == payload["record_id"]) {
        Vue.set(state.capitalInvestmentRecords[index], `${payload['row']}`, payload["content"])
      }
    });
  },
  updatePl(state, payload) {
    state.plUnit = payload["unit"]
    state.plFixed = payload["fixed"]
  },
  updatePlRecords(state, payload) {
    payload["unit"] ? state.plUnit = payload["unit"] : null
    payload["fixed"] ? state.plFixed = payload["fixed"] : null
    payload["pl_id"] ? state.plId = payload["pl_id"] : null
    state.plRecords = payload["pls"]
  },
  updatePlRecordRow(state, payload) {
    state.plRecords.some(function(value, index){
      if (value["record_id"] == payload["record_id"]) {
        Vue.set(state.plRecords[index], `${payload['row']}`, payload["content"])
      }
    });
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
  async deleteProject(context, payload) {
    const url = `${process.env.url}/projects/${payload}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.delete(url, {params: {token: idToken, "uid": uid, "id": payload}})
      .then((res) =>{
        context.commit('deleteProject', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "プロジェクトを削除できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "deleteProject",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "プロジェクトを削除できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async getCapitalInvestment(context, payload) {
    const url = `${process.env.url}/capital_investments`;
    const auth = getAuth();
    onAuthStateChanged(auth, user=>{{
      if (user && user.emailVerified){
        axios.get(url, {params: {token: user.accessToken, "uid": user.uid, "project_id": payload}})
        .then((res) =>{
          context.commit('updateCapitalInvestmentRecords', res.data)
        })
        .catch( e => {
          const payload = {
            "message": "設備投資モデルを取得できませんでした",
            "detail": "エラーが発生しました。お問い合わせください。",
            "method": "getCapitalInvestment",
            "errorMessage": e.message,
            "color": "red lighten-2"
          }
          context.dispatch('util/showAlert', payload, {root: true})
        })
      }
    }}
    )
  },
  async updateCapitalInvestment(context, payload) {
    const url = `${process.env.url}/capital_investments/${payload["id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.put(url, {token: idToken, capital_investment: {"unit": payload["unit"], "fixed": payload["fixed"]}})
      .then((res) =>{
        context.commit('updateCapitalInvestment', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "モデルを更新できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "updateCapitalInvestment",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "モデルを更新できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async updateCapitalInvestmentRecord(context, payload) {
    const url = `${process.env.url}/capital_investment_records/${payload["record_id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.put(url, {token: idToken, capital_investment_record: {"row": payload["row"], "content": payload["content"]}})
      .then((res) =>{
        context.commit('updateCapitalInvestmentRecordRow', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "モデルを更新できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "updateCapitalInvestmentRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "モデルを更新できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async addNewCapitalInvestmentRecord(context, payload) {
    const url = `${process.env.url}/capital_investment_records`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.post(url, {token: idToken, capital_investment_record: {"uid": uid, "type": payload["type"], "year": payload["year"], "record_id": payload["record_id"], "capital_investment_id": payload["capital_investment_id"]}})
      .then((res) =>{
        context.commit('updateCapitalInvestmentRecords', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "レコードを作成できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "addNewCapitalInvestmentRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "レコードを作成できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async deleteCapitalInvestmentRecord (context, payload){
    const url = `${process.env.url}/capital_investment_records/${payload["record_id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.delete(url, {params: {token: idToken, "id": payload["record_id"], "capital_investment_id": payload["capital_investment_id"]}})
      .then((res) =>{
        context.commit('updateCapitalInvestmentRecords', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "レコードを削除できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "deleteCapitalInvestmentRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "レコードを削除できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async getPl(context, payload) {
    const url = `${process.env.url}/pls`;
    const auth = getAuth();
    onAuthStateChanged(auth, user=>{{
      if (user && user.emailVerified){
        axios.get(url, {params: {token: user.accessToken, "uid": user.uid, "project_id": payload}})
        .then((res) =>{
          context.commit('updatePlRecords', res.data)
        })
        .catch( e => {
          const payload = {
            "message": "P/Lモデルを取得できませんでした",
            "detail": "エラーが発生しました。お問い合わせください。",
            "method": "getPl",
            "errorMessage": e.message,
            "color": "red lighten-2"
          }
          context.dispatch('util/showAlert', payload, {root: true})
        })
      }
    }}
    )
  },
  async updatePl(context, payload) {
    const url = `${process.env.url}/pls/${payload["id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.put(url, {token: idToken, pl: {"unit": payload["unit"], "fixed": payload["fixed"]}})
      .then((res) =>{
        context.commit('updatePl', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "P/Lを更新できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "updatePl",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "P/Lを更新できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async updatePlRecord(context, payload) {
    const url = `${process.env.url}/pl_records/${payload["record_id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.put(url, {token: idToken, pl_record: {"row": payload["row"], "content": payload["content"]}})
      .then((res) =>{
        context.commit('updatePlRecordRow', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "P/Lを更新できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "updatePlRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "P/Lを更新できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async addNewPlRecord(context, payload) {
    const url = `${process.env.url}/pl_records`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.post(url, {token: idToken, pl_record: {"type": payload["type"], "year": payload["year"], "record_id": payload["record_id"], "pl_id": payload["pl_id"]}})
      .then((res) =>{
        context.commit('updatePlRecords', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "P/Lを作成できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "addNewPlRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "P/Lを作成できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async deletePlRecord (context, payload){
    const url = `${process.env.url}/pl_records/${payload["record_id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.delete(url, {params: {token: idToken, "id": payload["record_id"], "pl_id": payload["pl_id"]}})
      .then((res) =>{
        context.commit('updatePlRecords', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "P/Lを削除できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "deletePlRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "P/Lを削除できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  }
}
