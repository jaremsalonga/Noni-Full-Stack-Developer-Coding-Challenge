import axios from "axios";
import * as types from "../mutation-types";

// state
export const state = {
  notesPayload: null,
  selected: {}
}

// getters
export const getters = {
  NOTES_GETTER: state => state.notesPayload,
  NOTE_GETTER: state => state.selected
}

// mutations
export const mutations = {
  [types.FETCH_NOTES] (state, payload) {
    state.notesPayload = payload
  },
  [types.PUT_NOTE] (state, payload) {
    const idx = state.notesPayload.findIndex(el => el.id === payload.id)
    state.notesPayload[idx] = payload.data
  },
  [types.FETCH_NOTES_BY_ID] (state, payload) {
    Object.assign(state.selected, payload)
  },
  [types.DESTROY_NOTE] (state, id) {
    let clone = state.notesPayload.filter(obj => obj.id !== id)
    state.notesPayload = clone
  }
}

// actions
export const actions = {
  async fetchNotes ({ commit }) {
    const { data } = await axios.get('/api/notes')
    commit(types.FETCH_NOTES, data)
  },
  postNotes ({ commit }, payload) {
    return axios.post('/api/notes', payload).then(response => {
      const { data } = response
      commit(types.FETCH_NOTES, data)
      return data
    })
  },
  fetchNote ({ commit }, id) {
    return axios.get(`/api/notes/${id}`).then(response => {
      const { data } = response
      commit(types.FETCH_NOTES_BY_ID, data)
      return data
    })
  },
  async destroyNote ({ commit }, id) {
    await axios.delete(`/api/notes/${id}`)
    commit(types.DESTROY_NOTE, id)
  },
  async putNote ({ commit }, updatedNote) {
    const { id, payload } = updatedNote
    const { data } = await axios.put(`/api/notes/${id}`, payload)
    commit(types.FETCH_NOTES_BY_ID, data)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/api/user')

      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  async logout ({ commit }) {
    try {
      await axios.post('/api/logout')
    } catch (e) {}

    commit(types.LOGOUT)
  },

  async fetchOauthUrl (ctx, { provider }) {
    const { data } = await axios.post(`/api/oauth/${provider}`)

    return data.url
  }
}
