import Vue from 'vue'
import Vuex from 'vuex'
import notes from './notes'
import flash from './flash'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)
const vuexPersist = new VuexPersist({
  key: 'note-app',
  storage: window.localStorage
})
export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: {
    notes,
    flash
  }
});