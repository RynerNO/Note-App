
export const SAVE_NOTE = 'SAVE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE'
export default {
  [SAVE_NOTE]: (state, note) => {
    let oldNote = state.find(oldNote => oldNote.id === note.id);
    if (oldNote) {
      oldNote = note
    } else {
      state.push(note)
    }
    
  },

  [DELETE_NOTE]: (state, id) => {
    
    state.forEach((note, i) => {
      if (note.id === id) {
          state.splice(i, 1)
      }
  })
  }
}