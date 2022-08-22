export const state = () => ({
  alertMessage: "",
  isAlert: false,
  alertColor: "",
  detail: "",
  method: "",
  errorMessage: "",
  timeout: -1
})

export const getters = ({
  alertMessage: state => state.alertMessage,
  isAlert: state => state.isAlert,
  alertColor: state => state.alertColor,
  detail: state => state.detail,
  method: state => state.method,
  errorMessage: state => state.errorMessage,
  timeout: state => state.timeout,
})

export const mutations = {
  addAlertMessage: function(state, payload) {
    state.alertMessage = payload
  },
  changeAlertStatus: function(state) {
    state.isAlert = !state.isAlert
  },
  addAlertColor: function(state, payload) {
    state.alertColor = payload
  },
  addDetail: function(state, payload) {
    state.detail = payload
  },
  addMethod: function(state, payload) {
    state.method = payload
  },
  addErrorMessage: function(state, payload) {
    state.errorMessage = payload
  },
  addTimeout: function(state, payload) {
    state.timeout = payload
  },
}

export const actions = {
  showAlert(context, payload) {
    if (payload["message"]) context.commit('addAlertMessage', payload["message"])
    if (payload["detail"]) context.commit('addDetail', payload["detail"])
    if (payload["method"]) context.commit('addMethod', payload["method"])
    if (payload["errorMessage"]) context.commit('addErrorMessage', payload["errorMessage"])
    if (payload["timeout"]) context.commit('addTimeout', payload["timeout"])
    context.commit('addAlertColor', payload["color"])
    context.commit('changeAlertStatus')
  },
}
