<template lang="pug">
  div.noteContainer
    div.noteTitle 
      h2 {{ name }}
    div.noteContent
      div.noteTask(v-for="(task, index) of tasks" :key="index")
        i.noteTaskCircle
        p {{ task.text }}
    div.noteDeleteButton(@click="$emit('deleteNote')")
    router-link.noteEditButton(:to="`/note/${id}`") 
      img(src="../assets/EditNoteButton.svg")
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.noteContainer {
    margin: 10px;
    grid-column: span 1/span 1;
    position: relative;
    border: 1px solid rgba(36, 31, 31, 0.67);
    border-radius: 14px;
    box-shadow: 9px 6px 2px rgba(0, 0, 0, 0.25);
    padding: 15px;
    display: flex;
    flex-direction: column;
    .noteTitle {
      align-self: flex-start;
      max-width: 90%;
      h2 {
        margin: 0;
        font-family: 'Roboto';
        font-size: 1rem;
      }
    }
    .noteContent {
      padding: 1rem;
      .noteTask {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-bottom: 0.5rem;
        .noteTaskCircle {
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.24);
          display: block;
          margin-right: 10px;
        }
      }
    }
    .noteDeleteButton {
      @include deleteButton;
      position: absolute;
      top: 5px;
      right: 5px;
    }
    .noteEditButton {
      position: absolute;
      right: 15px;
      bottom: 10px;
      width: 30px;
      height: 30px;
      img {
        width: 100%;
      }
    }
  }
    .priorityOne {
      background: rgba(245, 0, 29, 0.08);
      border-color: $red_main;
    }
    .priorityTwo {
      background: rgba(255, 169, 64, 0.25);
      border-color: #FFA940;
    }
    .priorityThree {
      background: rgba(3, 67, 106, 0.15);
      border-color: $blue_dark;
    }
</style>