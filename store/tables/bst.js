import axios from 'axios'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Vue from 'vue'

export const state = () => ({
  bstUnit: "",
  bstFixed: 0,
  bstRecords: [],
  bstId: null,
})

export const getters = ({
  bstUnit: state => state.bstUnit,
  bstUnitNumber(state) {
    if (state.bstUnit == "yen") {
      return 1
    } else if (state.bstUnit == "thousand") {
      return 1000
    } else if (state.bstUnit == "million") {
      return 1000000
    } else if (state.bstUnit == "hundred_million") {
      return 100000000
    }
  },
  bstUnitTitle(state) {
    if (state.bstUnit == "yen") {
      return "円"
    } else if (state.bstUnit == "thousand") {
      return "千円"
    } else if (state.bstUnit == "million") {
      return "百万円"
    } else if (state.bstUnit == "hundred_million") {
      return "億円"
    }
  },
  bstFixed: state => state.bstFixed,
  bstRecords: state => state.bstRecords,
  bstId: state => state.bstId,
})

export const mutations = {
  updateBst(state, payload) {
    state.bstUnit = payload["unit"]
    state.bstFixed = payload["fixed"]
  },
  updateBstRecords(state, payload) {
    payload["unit"] ? state.bstUnit = payload["unit"] : null
    payload["fixed"] ? state.bstFixed = payload["fixed"] : null
    payload["bst_id"] ? state.bstId = payload["bst_id"] : null
    state.bstRecords = payload["bsts"]
  },
  updateBstRecordRow(state, payload) {
    let oBstRecords = state.bstRecords
    state.bstRecords = {}
    payload["rows"].forEach(function(row) {
      oBstRecords.some(function(value, index) {
        if (value["record_id"] == payload["record_id"]) {
          Vue.set(oBstRecords[index], `${row['row']}`, row["content"])
        }
      });
    })
    state.bstRecords = oBstRecords
  }
}

export const actions = {
  async getBst(context, payload) {
    const url = `${process.env.url}/bsts`;
    const auth = getAuth();
    onAuthStateChanged(auth, user=>{{
      // if (user && user.emailVerified) {
      if (user) {
        axios.get(url, {params: {token: user.accessToken, "uid": user.uid, "project_id": payload}})
        .then((res) =>{
          context.commit('updateBstRecords', res.data)
        })
        .catch( e => {
          const payload = {
            "message": "B/Sモデルを取得できませんでした",
            "detail": "エラーが発生しました。お問い合わせください。",
            "method": "getBst",
            "errorMessage": e.message,
            "color": "red lighten-2"
          }
          context.dispatch('util/showAlert', payload, {root: true})
        })
      }
    }}
    )
  },
  async updateBst(context, payload) {
    const url = `${process.env.url}/bsts/${payload["id"]}`;
    const auth = getAuth();
    const idToken = await auth.currentUser.getIdToken(true)
    await axios.put(url, {token: idToken, bst: {"unit": payload["unit"], "fixed": payload["fixed"]}})
    .then((res) =>{
      context.commit('updateBst', res.data)
    })
    .catch( e => {
      const payload = {
        "message": "B/Sを更新できませんでした。",
        "detail": e?.response?.data?.message,
        "method": "updateBst",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    })
  },
  async updateBstRecord(context, payload) {
    const url = `${process.env.url}/bst_records/${payload["record_id"]}`;
    const auth = getAuth();
    const idToken = await auth.currentUser.getIdToken(true)
    await axios.put(url, {token: idToken, bst_record: {"rows": payload["rows"]}})
    .then((res) =>{
      context.commit('updateBstRecordRow', res.data)
    })
    .catch( e => {
      const payload = {
        "message": "B/Sを更新できませんでした。",
        "detail": e?.response?.data?.message,
        "method": "updateBstRecord",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    })
  },
  async addNewBstRecord(context, payload) {
    const url = `${process.env.url}/bst_records`;
    const auth = getAuth();
    const idToken = await auth.currentUser.getIdToken(true)
    await axios.post(url, {token: idToken, bst_record: {"type": payload["type"], "year": payload["year"], "record_id": payload["record_id"], "bst_id": payload["bst_id"]}})
    .then((res) =>{
      context.commit('updateBstRecords', res.data)
    })
    .catch( e => {
      const payload = {
        "message": "B/Sを作成できませんでした。",
        "detail": e?.response?.data?.message,
        "method": "addNewBstRecord",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    })
  },
  async deleteBstRecord(context, payload) {
    const url = `${process.env.url}/bst_records/${payload["record_id"]}`;
    const auth = getAuth();
    const idToken = await auth.currentUser.getIdToken(true)
    await axios.delete(url, {params: {token: idToken, "id": payload["record_id"], "bst_id": payload["bst_id"]}})
    .then((res) =>{
      context.commit('updateBstRecords', res.data)
    })
    .catch( e => {
      const payload = {
        "message": "B/Sを削除できませんでした。",
        "detail": e?.response?.data?.message,
        "method": "deleteBstRecord",
        "errorMessage": e.message,
        "color": "red lighten-2"
      }
      context.dispatch('util/showAlert', payload, {root: true})
    })
  }
}
