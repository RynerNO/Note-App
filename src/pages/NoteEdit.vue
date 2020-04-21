<template lang="pug">
  div
    header.noteHeader
      div.noteBurgerButton(@click="toogleSidebar")
        img(src="../assets/BurgerButton.svg" alt="Меню")
      div.addTaskButton(@click="addTask")
        span Добавить задание
      div.undoRedoSaveContainer
        div.undoButton.menuButton(@click="undoChange")
          img(src="../assets/UndoButton.svg" alt="Отменить")
          span Отменить
        div.redoButton.menuButton(@click="redoChange")
          img(src="../assets/RedoButton.svg" alt="Вернуть")
          span Вернуть
        div.saveButton.menuButton(@click="saveChanges")
          img(src="../assets/SaveButton.svg")
          span Сохранить
      div.cancelDeleteContainer
        div.deleteButton.menuButton(@click="deleteNoteModalVisible = true")
          img(src="../assets/DeleteButton.svg")
          span Удалить
        div.cancelButton.menuButton(@click="leaveNoteModalVisible = true")
          img(src="../assets/CancelButton.svg")
          span Выйти
      
    aside.noteSidebar.noteSidebarToggle(ref="sidebar")
      div.noteSidebarNav
      div.noteSidebarNavButton(@click="currentFilter = activeTasksFilter" :class="{'noteSidebarNavButtonActive': currentFilter === activeTasksFilter}") 
        img(src="../assets/NoteSidebarActive.svg")
        |Активно 
      div.noteSidebarNavButton(@click="currentFilter = plannedTaskFilter" :class="{'noteSidebarNavButtonActive': currentFilter === plannedTaskFilter}")  
        img(src="../assets/NoteSidebarPlanned.svg")
        |Запланировано
      div.noteSidebarNavButton(@click="currentFilter = completedTaskFilter" :class="{'noteSidebarNavButtonActive': currentFilter === completedTaskFilter}") 
        img(src="../assets/NoteSidebarCompleted.svg")
        |Выполнено

    div.noteContent.noteContentToggle(ref="content")
      div.titleContainer
        p.title(v-show="!editTitleInput" @click="editTitle") {{ note.name }}
        input.title.editTitleInput(
          @blur="editTitleInput = false; pushChange()"
          v-show="editTitleInput" ref="editTitleInput" v-model="note.name" v-autowidth="{maxWidth: '320px', minWidth:'30px'}")
        hr.titleUnderline
      p.currentFilter Активно
      div.tasksContainer
        task-view(v-for="task of note.tasks" :key="task.id" :id="task.id" :text="task.text" :priority="task.priority" :date="task.date" :subTasks="task.subTasks" @taskChanged="changeTask($event)" @taskDelete="deleteTask(task.id)")
    modal-confirm(v-if="deleteNoteModalVisible" @modalClose="deleteNoteModalVisible = false;" @modalConfirm="deleteNote" :message="'Удалить заметку?'" :confirmButtonText="'Удалить'")
    modal-confirm(v-if="leaveNoteModalVisible" @modalClose="leaveNoteModalVisible = false;" @modalConfirm="leaveNoteEdit" :message="'Внесенные правки будут утеряны, вы уверены?'" :confirmButtonText="'Выйти'")
</template>

<script>
import TaskView from '@components/TaskView.vue'
import { mapState } from 'vuex'; 
import cloneDeep from 'lodash.clonedeep'
import uniqid from 'uniqid';
import ModalConfirm from '@components/ModalConfirm.vue'
import Calendar from '@components/Calendar.vue'
export default {
components: {
  TaskView,
  ModalConfirm,
  Calendar
},
data() {
  return {
    editTitleInput: false,
    undoStack: [],
    note: {
      name: 'Новая заметка',
      tasks: [],
    },
    changesStack:'',
    deleteNoteModalVisible: false,
    leaveNoteModalVisible: false,
    currentFilter: this.activeTasksFilter,

  }
},
computed: {
        ...mapState({
            notes: state => state.notes,
        }),    
        activeTasksFilter: function() {
          return this.tasks.filter(function(task) {
            return task.date.getTime() <= new Date().setHours(0,0,0,0).getTime()
          })},
        plannedTaskFilter: function() {
           return this.tasks.filter(function(task) {
            return task.date.getTime() > new Date().setHours(0,0,0,0).getTime()
          })
        },
        completedTaskFilter: function() {
           return this.tasks.filter(function(task) {
            return task.completed
          })
        }
         
},
mounted() {
    const note = this.notes.find(note => note.id === this.$route.params.id);
    if(note) {
    this.note = note;
    }
    this.changesStack = [cloneDeep(this.note)]
},
methods: {
  toogleSidebar() {
      const sidebar = this.$refs.sidebar;
      const content = this.$refs.content;
      sidebar.classList.toggle('noteSidebarToggle')
      content.classList.toggle('noteContentToggle')
  },
  editTitle() {
    this.editTitleInput = true
    this.$nextTick(() => {
      this.$refs.editTitleInput.focus()
    })
    
  },
  leaveNoteEdit() {
    this.$router.push('/')
  },
  deleteTask(id) {
    this.note.tasks.forEach((task, i) => {
      if(task.id === id) {
        this.note.tasks.splice(i, 1)
        this.pushChange()
      }
    })
  },
  saveChanges() {
    console.log('saved')
  },
  changeTask(event) {
    const task = this.note.tasks.find(task => task.id === event.id);
    if(event.type === 'subTask') {
      const subTask = task.subTasks.find(subTask => subTask.id === event.changes.id);
      Object.assign(subTask, event.changes)
      this.pushChange()
      return true
    }
    Object.assign(task, event.changes)
    this.pushChange()
  },
  addTask() {
    this.note.tasks.push({
      id: uniqid(),
      text: 'Новое задание',
      priority: 4,
      subTasks: []
    })
    this.pushChange()
  },
   deleteNote() {
    this.deleteNoteModalVisible = false;
    console.log(' deleted')
  },
  pushChange() {
    const note = cloneDeep(this.note)
    this.changesStack.push(note)
    this.undoStack = []
    if(this.changesStack.length > 99) {
        this.changesStack.shift()
      }
  },
  undoChange() {
    if(this.changesStack.length > 1) {
      this.undoStack.push(cloneDeep(this.changesStack.pop()))

      this.note = cloneDeep(this.changesStack[this.changesStack.length-1])
    }
  },
  redoChange() {
    if(this.undoStack.length > 0) {
      this.note = cloneDeep(this.undoStack[this.undoStack.length-1])
      const redoNote = cloneDeep(this.undoStack.pop())
      this.changesStack.push(redoNote)
    }
  }
}
}
</script>

<style lang="scss" scoped>
.calendar {
  width: 200px;
  position: fixed;
  left: 50%;
  top: 50%
}
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
    height: 100%;
    left:0;
    transition: all 0.5s linear;
    z-index: 50;
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
  .noteSidebarToggle {
    left: -100%;
  }
@media(min-width: 768px) {
  
  .noteContent {
    margin-left:280px;
  }
  .noteContentToggle {
    margin-left: 0;
  }
  .noteSidebar {
      width: 280px;
      left:0;
    }
   .noteSidebarToggle {
      left:-100%;
      
      .noteSidebarNav {
        margin-top: 75px;
      }
      }
}
@media (min-width:1280px) {
  .noteContent {
    margin-left:0;
  }
  .noteContentToggle {
    margin-left: 280px;
  }
  .noteSidebar {
    width: 280px;
    left:-100%;
  }
  .noteSidebarToggle {
    left:0;
  }
  .noteSidebarNav {
    margin-top: 75px;
  }
}
  .noteContent {
    margin-top: 70px;
    transition: margin 0.5s linear;
  }
  .titleContainer {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    word-wrap: break-word;
  }
  .titleUnderline {
    width: 80%;
  }
  .title {
    font-size: 1.5rem;
    p {
      font-size: inherit;
    }
  }
  .editTitleInput {
    outline: none;
    padding: 0;
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
    @media(min-width: 1024px) {
        width: 80%;
        margin: 0 auto;
    }
    @media(min-width: 1280px) {
      width: 70%;

    }
  }

</style>