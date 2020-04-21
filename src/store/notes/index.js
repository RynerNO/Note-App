import mutations from './mutations';
let initialState = null;

try {
  initialState = JSON.parse(localStorage.getItem('note-app')).notes;
  if (initialState.length === 0) {
    throw new Error()
  }
} catch (e) {
  initialState = []
}
export default {
  state: initialState,
  mutations
};
