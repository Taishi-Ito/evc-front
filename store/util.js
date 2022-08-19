export const state = () => ({
  alertMessage: "",
  isAlert: false,
  alertColor: ""
})

export const getters = ({
  alertMessage: state => state.alertMessage,
  isAlert: state => state.isAlert,
  alertColor: state => state.alertColor
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
}

export const actions = {
  showAlert(context, payload) {
    context.commit('addAlertMessage', payload["message"])
    context.commit('addAlertColor', payload["color"])
    context.commit('changeAlertStatus')
  },
}
