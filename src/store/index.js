import Vue from 'vue'
import Vuex from 'vuex'
// Para decodificar JWT
import decode from 'jwt-decode'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    usuarioDB: '',
  },
  mutations: {
    obtenerUsuario(state, payload){
      state.token = payload;
      if (payload === '') {
        state.usuarioDB = '';
      } else {
        state.usuarioDB = decode(payload);
        router.push({ name: 'notas' });
      }
    }
  },
  actions: {
    guardarUsuario({ commit }, payload){
      localStorage.setItem('token', payload);
      commit('obtenerUsuario', payload);
    }
  },
  modules: {
  }
})
