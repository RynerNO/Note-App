<template lang="pug">
  div
    header.noteHeader
      div.noteBurgerButton
        img(src="../assets/BurgerButton.svg" alt="Меню")
      div.addTaskButton
      div.undoRedoSaveContainer
        div.undoButton
          img(src="../assets/UndoButton.svg" alt="Отменить")
        div.redoButton
          img(src="../assets/RedoButton.svg" alt="Вернуть")
        div.saveButton 
          img(src="../assets/SaveButton.svg")
      div.cancelDeleteContainer
        div.deleteButton
          img(src="../assets/DeleteButton.svg")
        div.cancelButton
          img(src="../assets/CancelButton.svg")
      
    aside.noteSidebar
      div.noteSidebarNav.noteSidebarNavActive 
        img(src="../assets/NoteSidebarActive.svg")
        |Активно 
      div.noteSidebarNav 
        img(src="../assets/NoteSidebarPlanned.svg")
        |Запланировано
      div.noteSidebarNav 
        img(src="../assets/NoteSidebarComplited.svg")
        |Выполнено

    div.noteContent
      div.titleContainer
        h1.title Какая-то заметка
        hr.titleUnderline
      p.currentFilter Активно
      div.tasksContainer
        task

</template>

<script>
import Task from '@components/Task.vue'
export default {
components: {
  Task
}
}
</script>

<style lang="scss" scoped>
  .noteHeader {
    position: fixed;
    top: 0;
    left: 0;
    height: 45px;
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .noteBurgerButton {
    margin-left: 10px;
    margin-right: 20px;
    cursor: pointer;
  }
  .addTaskButton {
    @include plusButton;
    margin-left: 5px
  }
  .undoRedoSaveContainer {
    display: flex;
    margin-left: 20px;
    .undoButton {
    margin-right: 10px;
  }
  .saveButton {
      margin-left: 20px;
    }
  }
  
  .cancelDeleteContainer {
    display: flex;
    margin-left: auto;
    
    .deleteButton {
      margin-right: 15px;
    }
    .cancelButton {
      margin-right: 10px;
    }
  }
  .noteSidebar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    background: #F6F5F5;
    position: fixed;
    top: 45px;
    left: -100%;
    height: 100%;
    transition: all 0.5s linear;
    .noteSidebarNav {
      @include button;
      background: #EFEDE4;
      display: flex;
      font-size: 19px;
      font-family: 'Montserrat Alternates', 'sans-serif';
      font-weight: 500;
      color: #000000;
      width: 215px;
      margin-top: 25px;
      align-items: center;
      &:hover {
        background: #DADADA;
      }
    }
    .noteSidebarNavActive {
      background: #FA3E54;
      color: #fff;
      &:hover {
        cursor: default;
        background: #FA3E54;
      }
    }
  }
 
  .noteContent {
    margin-top: 70px;
  }
  .titleContainer {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    word-wrap: break-word;
  }
  .titleUnderline {
    width: 100%;
  }
  .title {
    font-size: 1.5rem;
  }
  .currentFilter {
    font-size: 24px;
    font-family: 'Montserrat Alternates', 'sans-serif';
    color: #000000;
    font-weight:500;
    margin-left:10px;
  }
  .tasksContainer {
    margin-top:40px;
  }
</style>