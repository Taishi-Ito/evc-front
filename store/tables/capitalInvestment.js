import axios from 'axios'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Vue from 'vue'

export const state = () => ({
  capitalInvestmentUnit: "",
  capitalInvestmentFixed: 0,
  capitalInvestmentRecords: [],
  capitalInvestmentId: null
})

export const getters = ({
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
  capitalInvestmentId: state => state.capitalInvestmentId
})

export const mutations = {
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
    let oCapitalInvestmentRecords = state.capitalInvestmentRecords
    state.capitalInvestmentRecords = {}
    oCapitalInvestmentRecords.some(function(value, index){
      if (value["record_id"] == payload["record_id"]) {
        Vue.set(oCapitalInvestmentRecords[index], `${payload['row']}`, payload["content"])
      }
    });
    state.capitalInvestmentRecords = oCapitalInvestmentRecords
  }
}

export const actions = {
  async getCapitalInvestment(context, payload) {
    const url = `${process.env.url}/capital_investments`;
    const auth = getAuth();
    onAuthStateChanged(auth, user=>{{
      // if (user && user.emailVerified){
      if (user){
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
  }
}
