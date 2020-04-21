import mutations from './mutations';

import getters from './getters';

import actions from './actions';
import uniqid from 'uniqid';
let initialState = null;

try {
  initialState = [{
    id: uniqid(),
    name: 'Какая-то заметка Vuex',
    tasks: [{
      id: uniqid(),
      text: 'Какое-то задание Vuex',
      priority: 3,
      completed: false,
      date: () => new Date(),
      subtasks: [{
        id: uniqid(),
        text: 'Какое-то подзадание Vuex',
        priority: 1,
        completed: false,
        date: () => new Date(),
      }]
    }]
  }];
   
  
} catch (e) {

}
export default {
  state: initialState,
  actions,
  getters,
  mutations
};
