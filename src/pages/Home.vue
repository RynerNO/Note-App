<template lang="pug">
  div.container
    div.titleContainer
      h1.title Заметки
        router-link.createNote(to="/")
          div.createNoteButton
            i
            span Добавить заметку
      hr.titleUnderline
    div.notesContainer
      note(@deleteNote="deleteNote")
      note 
      note
      note
      note
      note
      note
      note
    modal-confirm(:message="'Удалить заметку?'" :confirmButtonText="'Удалить'" v-if="modalVisible" @modalClose="modalVisible = false" @modalConfirm)
</template>

<script>
import Note from '@components/Note.vue'
import ModalConfirm from '@components/ModalConfirm.vue'
export default {
components: {
  Note,
  ModalConfirm
},
data() {
  return {
    modalVisible: false,
  }
},
methods: {
  showModal() {
    this.modalVisible = true
  },
  deleteNote() {
    console.log('sdsd')
    this.showModal()
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
        
            &::before,&::after {
              background: $green_main;
              animation: spin1 1s ease-in-out ;
            }
            &::after {
              animation: spin2 1s ease-in-out ;
            }
            span {
              display: block;
            }
          }
      }
    
    }
   
  }
  @keyframes spin1 {
    from {
      transform: rotate(90deg)
    }
   
    to {
      transform: rotate(calc( 90deg + 360deg))
    }
  }
@keyframes spin2 {
    from {
      transform: rotate(0deg)
    }
   
    to {
      transform: rotate(360deg)
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