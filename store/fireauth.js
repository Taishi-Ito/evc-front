import axios from 'axios'

export const state = () => ({
  message: 'Hello Vuex!'
})

export const getters = ({
  message(state) {
    return state.message;
  }
})

export const mutations = {
  updateMessage: function(state, payload) {
    state.message = payload
  }
}

export const actions = {
  updateMessageAction(context, payload) {
    const url = '/api/v1/hello'
    let query = payload
    axios.get(url, {params:{message: query}})
      .then((res) =>{
        context.commit('updateMessage', res.data)
      })
  }
}
