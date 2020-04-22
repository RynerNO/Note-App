import Router from 'vue-router'
import Home from '@pages/Home.vue'
import Editor from '@pages/Editor.vue'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/note/:id',
    component: Editor
  }
]

const router = new Router({
  mode: 'abstract',
  routes
})

export default router