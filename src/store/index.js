import Vue from 'vue'
import Vuex from 'vuex'
import notes from './notes'
import flash from './flash'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)
const vuexPersist = new VuexPersist({
  key: 'note-app',
  modules: ['notes'],
  storage: window.localStorage
})
export default new Vuex.Store({
  modules: {
    notes,
    flash,
    
    
  },
  plugins: [vuexPersist.plugin]
});