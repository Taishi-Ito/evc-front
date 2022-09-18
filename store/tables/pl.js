import axios from 'axios'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Vue from 'vue'

export const state = () => ({
  plUnit: "",
  plFixed: 0,
  plRecords: [],
  plId: null,
})

export const getters = ({
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
    payload["rows"].forEach(function(row){
      state.plRecords.some(function(value, index){
        if (value["record_id"] == payload["record_id"]) {
          Vue.set(state.plRecords[index], `${row['row']}`, row["content"])
        }
      });
    })
  }
}

export const actions = {
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
      axios.put(url, {token: idToken, pl_record: {"rows": payload["rows"]}})
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