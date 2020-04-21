import Vue from 'vue';
import Router from 'vue-router';
import router from './router'
import Main from '@pages/Main.vue'
import store from '@store'
import VueInputAutowidth from 'vue-input-autowidth'
import TextareaAutosize from 'vue-textarea-autosize'

import 'normalize.css'; // reset css

import '@styles/global.scss' // global styles

Vue.use(VueInputAutowidth)
Vue.use(TextareaAutosize)
Vue.use(Router)
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Main)
})