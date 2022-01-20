import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router'

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    credentials: { username: "viniciusrodrigues", pass: "vuetothemoon" },
    rebelsData: [],
    searchedRebels: [],
    rebelToSave: { name: '', description: '', planet: '', birthDate: '' },
    isEditing: false,
    isAuthError: false,
    isValidationError: false,
    isSuccessfulOperation: false
  },
  mutations: {
    AUTHENTICATE(state, payload) {
      const correctUsername = state.credentials.username
      const correctPass = state.credentials.pass
      const { username, pass } = payload
      if(username === correctUsername && pass === correctPass) {
        state.isAuthenticated = true
        state.isAuthError = false
        router.push('/rebels')
      } else {
        state.isAuthError = true
      }
    },
    DISABLE_IS_AUTH_ERROR(state) {
      state.isAuthError = false
    },
    LOGOUT(state) {
      state.isAuthError = false
      state.isAuthenticated = false
      router.push('/')
    },
    SET_REBELS_DATA(state, payload) {
      state.rebelsData = payload
      // console.log(state.rebelsData)
    },
    ADD_REBEL_TO_SAVE(state, payload) {
      state.rebelToSave.name = payload.name
      state.rebelToSave.description = payload.description
      state.rebelToSave.planet = payload.planet
      state.rebelToSave.birthDate = dayjs(payload.birthDate).format('DD/MM/YYYY')
    },
    ADD_REBEL_TO_SEARCH_LIST(state, payload) {
      state.searchedRebels.push(payload)
      console.log(state.searchedRebels)
    },
    CLEAN_REBEL_SEARCH_LIST(state) {
      state.searchedRebels = []
    },
    SET_IS_EDITING(state) {
      state.isEditing = true
    },
    SET_NOT_IS_EDITING(state) {
      state.isEditing = false
    },
    SET_IS_VALIDATION_ERROR(state) {
      state.isValidationError = true
    },
    DISABLE_IS_VALIDATION_ERROR(state) {
      state.isValidationError = false
    },
    SET_IS_SUCCESSFUL_OPERATION(state) {
      state.isSuccessfulOperation = true
    },
    DISABLE_IS_SUCCESSFUL_OPERATION(state) {
      state.isSuccessfulOperation = false
    }
  },
  actions: {
    async getRebelsData(context) {
      const response = await axios.get("https://test-mais-a-educacao-v1.herokuapp.com/?token=viniciusDeOliveiraRodrigues")
      context.commit('SET_REBELS_DATA', response.data)
    },
    async registerRebel() {
      await axios.post("https://test-mais-a-educacao-v1.herokuapp.com/?token=viniciusDeOliveiraRodrigues", this.state.rebelToSave)
      this.dispatch('getRebelsData')
      this.state.rebelToSave = {}
    },
    async updateRebel({ state }, payload) {
      const { id } = payload
      const rebel = state.rebelToSave
      // console.log(rebel)
      await axios.put(`https://test-mais-a-educacao-v1.herokuapp.com/${id}?token=viniciusDeOliveiraRodrigues`, rebel)
      this.dispatch('getRebelsData')
      this.state.rebelToSave = {}
      this.state.isEditing = false
      console.log(state.rebelToSave);
    },
    async removeRebel({ state }, payload) {
      const { id } = payload
      console.log(id)
      await axios.delete(`https://test-mais-a-educacao-v1.herokuapp.com/${id}?token=viniciusDeOliveiraRodrigues`)
      this.dispatch('getRebelsData')
    }
  },
  plugins: [createPersistedState()]
})
