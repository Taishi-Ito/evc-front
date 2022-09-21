import axios from 'axios'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Vue from 'vue'

export const state = () => ({
  cfUnit: "",
  cfFixed: 0,
  cfRecords: [],
  cfId: null,
  cfSum: 0
})

export const getters = ({
  cfUnit: state => state.cfUnit,
  cfUnitNumber(state) {
    if (state.cfUnit == "yen") {
      return 1
    } else if (state.cfUnit == "thousand") {
      return 1000
    } else if (state.cfUnit == "million") {
      return 1000000
    } else if (state.cfUnit == "hundred_million") {
      return 100000000
    }
  },
  cfUnitTitle(state) {
    if (state.cfUnit == "yen") {
      return "円"
    } else if (state.cfUnit == "thousand") {
      return "千円"
    } else if (state.cfUnit == "million") {
      return "百万円"
    } else if (state.cfUnit == "hundred_million") {
      return "億円"
    }
  },
  cfFixed: state => state.cfFixed,
  cfRecords: state => state.cfRecords,
  cfId: state => state.cfId,
  cfSum: state => state.cfSum,
})

export const mutations = {
  updateCf(state, payload) {
    state.cfUnit = payload["unit"]
    state.cfFixed = payload["fixed"]
  },
  updateCfRecords(state, payload) {
    payload["unit"] ? state.cfUnit = payload["unit"] : null
    payload["fixed"] ? state.cfFixed = payload["fixed"] : null
    payload["cf_id"] ? state.cfId = payload["cf_id"] : null
    state.cfRecords = payload["cfs"]
  },
  updateCfRecordRow(state, payload) {
    payload["rows"].forEach(function(row){
      state.cfRecords.some(function(value, index){
        if (value["record_id"] == payload["record_id"]) {
          Vue.set(state.cfRecords[index], `${row['row']}`, row["content"])
        }
      });
    })
  },
  updateCfSum(state, payload) {
    state.cfSum = payload
  }
}

export const actions = {
  async getCf(context, payload) {
    const url = `${process.env.url}/cfs`;
    const auth = getAuth();
    onAuthStateChanged(auth, user=>{{
      if (user && user.emailVerified){
        axios.get(url, {params: {token: user.accessToken, "uid": user.uid, "project_id": payload}})
        .then((res) =>{
          context.commit('updateCfRecords', res.data)
        })
        .catch( e => {
          const payload = {
            "message": "CFモデルを取得できませんでした",
            "detail": "エラーが発生しました。お問い合わせください。",
            "method": "getCf",
            "errorMessage": e.message,
            "color": "red lighten-2"
          }
          context.dispatch('util/showAlert', payload, {root: true})
        })
      }
    }}
    )
  },
  async updateCf(context, payload) {
    const url = `${process.env.url}/cfs/${payload["id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.put(url, {token: idToken, cf: {"unit": payload["unit"], "fixed": payload["fixed"]}})
      .then((res) =>{
        context.commit('updateCf', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "B/Sを更新できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "updateCf",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "B/Sを更新できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async updateCfRecord(context, payload) {
    const url = `${process.env.url}/cf_records/${payload["record_id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.put(url, {token: idToken, cf_record: {"rows": payload["rows"]}})
      .then((res) =>{
        context.commit('updateCfRecordRow', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "B/Sを更新できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "updateCfRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "B/Sを更新できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async addNewCfRecord(context, payload) {
    const url = `${process.env.url}/cf_records`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.post(url, {token: idToken, cf_record: {"type": payload["type"], "year": payload["year"], "record_id": payload["record_id"], "cf_id": payload["cf_id"]}})
      .then((res) =>{
        context.commit('updateCfRecords', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "B/Sを作成できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "addNewCfRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "B/Sを作成できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  },
  async deleteCfRecord (context, payload){
    const url = `${process.env.url}/cf_records/${payload["record_id"]}`;
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    await auth.currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      axios.delete(url, {params: {token: idToken, "id": payload["record_id"], "cf_id": payload["cf_id"]}})
      .then((res) =>{
        context.commit('updateCfRecords', res.data)
      })
      .catch( e => {
        const payload = {
          "message": "B/Sを削除できませんでした。",
          "detail": e?.response?.data?.message,
          "method": "deleteCfRecord",
          "errorMessage": e.message,
          "color": "red lighten-2"
        }
        context.dispatch('util/showAlert', payload, {root: true})
      })
    })
    .catch((e) => {
      const payload = {
        "message": "B/Sを削除できませんでした。",
        "detail": "エラーが発生しました。お問い合わせください。",
        "method": "getIdToken",
        "errorMessage": e.message,
        "color": "red lighten-2",
      }
      context.dispatch('util/showAlert', payload, {root: true})
    });
  }
}
