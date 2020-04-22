import { SAVE_NOTE, DELETE_NOTE } from '@store/notes/mutations'
import cloneDeep from 'lodash.clonedeep'
export default {
  data() {
    return {
      sidebarToogle: true,
    }
  },
  methods: {
    toogleSidebar() {
      const sidebar = this.$refs.sidebar;
      const content = this.$refs.content;
      this.sidebarToogle = !this.sidebarToogle
    },
    leaveEditor(confirmed) {
      this.leaveNoteModalVisible = !this.leaveNoteModalVisible;
      if (confirmed) {
        this.$router.push('/')
      }
      
    },
    saveChanges() {
      if (this.note.tasks.length === 0) {
        this.flash('Добавьте хотя бы одну задачу!', 'error')
        return false
      } else if (this.changesStack.length === 1) {
        this.flash('Вы не внесли никаких изменений.', 'error')
        return false
      }
      this.$store.commit(SAVE_NOTE, this.note)
      this.changesStack = [cloneDeep(this.note)]
      this.flash('Сохранено!')

    },
    deleteNote(confirmed) {
      this.deleteNoteModalVisible = true;
      if (confirmed) {
        this.$store.commit(DELETE_NOTE, this.note.id)
        this.$router.push('/').then(() => {
          this.flash('Заметка удалена!', 'error')
        })
      }
    },
    undoChange() {
      if (this.changesStack.length > 1) {
        this.undoStack.push(cloneDeep(this.changesStack.pop()))

        this.note = cloneDeep(this.changesStack[this.changesStack.length - 1])
        this.$forceUpdate()
      }
    },
    redoChange() {
      if (this.undoStack.length > 0) {
        this.note = cloneDeep(this.undoStack[this.undoStack.length - 1])
        const redoNote = cloneDeep(this.undoStack.pop())
        this.changesStack.push(redoNote)
        this.$forceUpdate()
      }
    }
  }

}