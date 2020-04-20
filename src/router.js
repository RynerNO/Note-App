import Router from 'vue-router'
import Home from '@pages/Home.vue'
import NoteEdit from '@pages/NoteEdit.vue'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/note',
    component: NoteEdit
  }
]

const router = new Router({
  routes
})

export default router