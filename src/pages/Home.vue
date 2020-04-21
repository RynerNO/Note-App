<template lang="pug">
  div.container
    flash-message
    div.titleContainer
      h1.title Заметки
        div.createNote(@click="createNote")
          div.createNoteButton
            i
            span Добавить заметку
      hr.titleUnderline
    div.notesContainer
      note(@deleteNote="selectedNote = note.id; modalVisible = true" v-for="note of notes" :key="note.id" :name="note.name" :id="note.id"  :tasks="note.tasks")
    modal-delete-note(v-if="modalVisible" @modalClose="modalVisible = false; selectedNote = ''" @modalConfirm="deleteNote" :message="'Удалить заметку?'" :confirmButtonText="'Удалить'")
</template>

<script>
import Note from '@components/Note.vue'
import FlashMessage from '@components/FlashMessage.vue'
import ModalDeleteNote from '@components/ModalConfirm.vue'
import { mapState } from 'vuex';
import uniqid from 'uniqid';
import { DELETE_NOTE } from '@store/notes/mutations'
export default {
    components: {
        Note,
        ModalDeleteNote,
        FlashMessage
    },
    data() {
        return {
            modalVisible: false,
            selectedNote: ''
        }
    },
    computed: {
        ...mapState({
            notes: state => state.notes,
        }),
    },
    methods: {
        deleteNote() {
            this.modalVisible = false;
            this.$store.commit(DELETE_NOTE, this.selectedNote)
            this.flash('Заметка удалена', 'error')
            this.selectedNote = ''
        },
        createNote() {
            const id = uniqid();
            this.$router.push(`/note/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.createNote {
    text-decoration: none;
    padding-top: 7px;
    padding-left: 10px;
    .createNoteButton {
        @include plusButton;
        cursor: pointer;
        span {
            color: $green_main;
            font-family: 'Montserrat Alternates';
            position: absolute;
            display: block;
            white-space: nowrap;
            top: 10px;
            left: 35px;
            font-size: 12px;
            font-weight: 500;
        }
        @media(min-width: 768px) {
            &:hover {
                width: 190px;
                overflow: hidden;
                background: transparent;
                border: 1px solid $green_main;
                transition: all 0.3s ease-in-out;
                &::before,
                &::after {
                    background: $green_main;
                    animation: spin1 1s ease-in-out;
                }
                &::after {
                    animation: spin2 1s ease-in-out;
                }
                span {
                    display: block;
                }
            }
        }
    }
}

.notesContainer {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
    @media(min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr))
    }
    @media(min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr))
    }
    @media(min-width: 1280px) {
        grid-template-columns: repeat(4, minmax(0, 1fr))
    }
}
</style>