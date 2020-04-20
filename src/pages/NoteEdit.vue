<template lang="pug">
  div
    header.noteHeader
      div.noteBurgerButton(@click="toogleSidebar")
        img(src="../assets/BurgerButton.svg" alt="Меню")
      div.addTaskButton
        span Добавить задание
      div.undoRedoSaveContainer
        div.undoButton.menuButton
          img(src="../assets/UndoButton.svg" alt="Отменить")
          span Отменить
        div.redoButton.menuButton
          img(src="../assets/RedoButton.svg" alt="Вернуть")
          span Вернуть
        div.saveButton.menuButton 
          img(src="../assets/SaveButton.svg")
          span Сохранить
      div.cancelDeleteContainer
        div.deleteButton.menuButton
          img(src="../assets/DeleteButton.svg")
          span Удалить
        div.cancelButton.menuButton
          img(src="../assets/CancelButton.svg")
          span Выйти
      
    aside.noteSidebar(ref="sidebar")
      div.noteSidebarNav
      div.noteSidebarNavButton.noteSidebarNavButtonActive 
        img(src="../assets/NoteSidebarActive.svg")
        |Активно 
      div.noteSidebarNavButton 
        img(src="../assets/NoteSidebarPlanned.svg")
        |Запланировано
      div.noteSidebarNavButton 
        img(src="../assets/NoteSidebarComplited.svg")
        |Выполнено

    div.noteContent
      div.titleContainer
        h1.title Какая-то заметка
        hr.titleUnderline
      p.currentFilter Активно
      div.tasksContainer
        task
        task
        task

</template>

<script>
import Task from '@components/Task.vue'
export default {
components: {
  Task
},
methods: {
  toogleSidebar() {

  }
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
    border: 1px solid #D8D8D8;
  }
  .noteBurgerButton {

    cursor: pointer;
    padding: 10px;
    &:hover {
      background: rgba(0, 0, 0, 0.027);
      }
    @media(min-width: 768px) {
      margin-right: 15px;
    }
  }

  .addTaskButton {
    @include plusButton;
    margin-left: 5px;
    cursor: pointer;
    min-width: 25px;
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
    @media(min-width: 640px) {
        width: 190px;
        height: 35px;
        overflow: hidden;
        background: transparent;
        border: 1px solid $green_main;
        transition: all 0.3s ease-in-out;
        span {
          display: block;
        }
        &::before,&::after {
        background: $green_main;
        width: 20px;
        height: 2px;
        top: 17px;
        left: 8px;
      }
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
  .undoRedoSaveContainer {
    display: flex;
    .undoButton {
      span {
        display: none;
      }
      @media (min-width:1280px) {
      span {
        display: block;
      }
      }
    }
    .redoButton {
      span {
        display: none;
      }
      @media (min-width:1280px) {
      span {
        display: block;
      }
      }
    }

  }
  .saveButton {
      span {
        display: none;
      }
      @media (min-width:610px) {
      span {
        display: block;
      }
      }
  }
  .menuButton {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-left: 5px;
      padding: 10px;
      span {
        margin-left:12px;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.027);
      }
      @media(min-width: 610px) {
        margin-left: 15px;
      }
      @media(min-width: 1280px) {
        margin-left: 30px;
      }
  }  
  .cancelDeleteContainer {
    display: flex;
    margin-left: auto;
    
    .deleteButton {
      span {
        display: none;
      }
      
      @media (min-width:1024px) {
      span {
        display: block;
      }
      }
    }
    .cancelButton {
      span {
        display: none;
      }
      @media (min-width:1024px) {
      span {
        display: block;
      }
      }
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
    .noteSidebarNavButton  {
      @include button;
      background: #EFEDE4;
      display: flex;
      font-size: 17px;
      font-family: 'Montserrat Alternates', 'sans-serif';
      font-weight: 500;
      color: #000000;
      width: 208px;
      margin-top: 15px;
      align-items: center;
      &:hover {
        background: #DADADA;
      }
    }
    .noteSidebarNavButtonActive {
      background: #FA3E54;
      color: #fff;
      &:hover {
        cursor: default;
        background: #FA3E54;
      }
    }
  
  }
@media (min-width:1280px) {
    .noteContent {
      margin-left: 280px;
    }
    .noteSidebar {
      left:0;
      width: 280px;
      .noteSidebarNav {
        margin-top: 75px;
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
    @media(min-width: 768px) {
      margin-left: 30px;
    }
  }
  .tasksContainer {
    margin-top:40px;
     @media(min-width: 768px) {
      margin-left: 40px;
    }
  }
</style>