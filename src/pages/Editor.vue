<template lang="pug">
  div
    flash-message
    editor-header(@toogleSidebar="toogleSidebar" @undoChange="undoChange" @redoChange="redoChange" @saveChanges="saveChanges" @addTask="addTask" @deleteNote="deleteNote" @leaveEditor="leaveEditor")
    
    sidebar(@active="currentFilter='activeFilter'" @planned="currentFilter='plannedFilter'" @completed="currentFilter='completedFilter'" @all="currentFilter='allTasks'" :toogle="sidebarToogle")
    div.noteContent(:class="{'noteContentToggle': sidebarToogle}")
      div.titleContainer
        p.title(v-show="!editTitleInput" @click="editTitle") {{ note.name }}
        input.title.editTitleInput(
          @blur="editTitleInput = false; pushChange()"
          v-show="editTitleInput" ref="editTitleInput" v-model="note.name" v-autowidth="{maxWidth: '320px', minWidth:'30px'}")
        hr.titleUnderline
      p.currentFilter {{ textFilterName }}
      div.tasksContainer
        div(v-for="task of filter" :key="task.id")
            task(v-bind="task" @taskChanged="submitTaskChanges($event)" @taskDelete="deleteTask(task.id)")
    modal-confirm(v-if="deleteNoteModalVisible" @modalClose="deleteNoteModalVisible = false;" @modalConfirm="deleteNote(true)" :message="'Удалить заметку?'" :confirmButtonText="'Удалить'")
    modal-confirm(v-if="leaveNoteModalVisible" @modalClose="leaveNoteModalVisible = false;" @modalConfirm="leaveEditor(true); " :message="'Все несохраненные изменения будут утеряны, вы уверены?'" :confirmButtonText="'Выйти'")
</template>

<script>
import Task from '@components/Editor/Task.vue'
import FlashMessage from '@components/FlashMessage.vue'
import { mapState } from 'vuex';
import cloneDeep from 'lodash.clonedeep'
import EditorHeader from '@components/Editor/EditorHeader.vue'
import uniqid from 'uniqid';
import ModalConfirm from '@components/ModalConfirm.vue'
import Calendar from '@components/Calendar.vue'
import EditorHeaderMixin from "@mixins/Editor/EditorHeader"
import Sidebar from '@components/Editor/Sidebar.vue'
export default {
    components: {
        Task,
        ModalConfirm,
        Calendar,
        FlashMessage,
        EditorHeader,
        Sidebar,
    },
    mixins: [EditorHeaderMixin],


    data() {
        return {
            editTitleInput: false,
            undoStack: [],
            note: {
                id: uniqid(),
                name: 'Новая заметка',
                tasks: [],
            },
            changesStack: '',
            deleteNoteModalVisible: false,
            leaveNoteModalVisible: false,
            currentFilter: 'allTasks',
        }
    },
    computed: {
        ...mapState({
            notes: state => state.notes,
        }),
        activeFilter: function() {
            const filtered = this.note.tasks.filter(function(task) {
                return (Date.parse(task.date) <= new Date().setHours(0, 0, 0, 0)) && !task.completed
            })
            return filtered.sort(function(a, b) {
                return a.priority - b.priority;
            })
        },

        plannedFilter: function() {
            return this.note.tasks.filter(function(task) {
                return (Date.parse(task.date) > new Date().setHours(0, 0, 0, 0) && !task.completed);
            }).sort(function(a, b) {
                return a.priority - b.priority;
            })
        },
        completedFilter: function() {
            return this.note.tasks.filter(function(task) {
                return task.completed
            }).sort(function(a, b) {
                return Date.parse(a.dateComleted) - Date.parse(b.dateComleted);
            })
        },
        allTasks: function() {
            return this.note.tasks.filter(function(task) {
                return !task.completed
            }).sort(function(a, b) {
                return a.priority - b.priority;
            })
        },
        textFilterName: function() {
            switch (this.currentFilter) {
                case "allTasks":
                    return "Все"
                case "activeFilter":
                    return 'Активно'
                case 'plannedFilter':
                    return 'Запланировано'
                case 'completedFilter':
                    return 'Архив'
            }
        },
        filter: function() {

            return this[this.currentFilter]
        }

    },
    mounted() {
        // find note in the vuex state
        const note = this.notes.find(note => note.id === this.$route.params.id);
        if (note) {
            this.note = note;
        }
        // set base state for undo-redo
        this.changesStack = [cloneDeep(this.note)]
    },
    methods: {

        editTitle() {
            this.editTitleInput = true
            this.$nextTick(() => {
                this.$refs.editTitleInput.focus()
            })

        },

        deleteTask(id) {
            this.note.tasks.forEach((task, i) => {
                if (task.id === id) {
                    this.note.tasks.splice(i, 1)
                    this.flash('Задача удалена!', 'error')
                    this.pushChange()
                }
            })
        },
        submitTaskChanges(event) {

            let task = this.note.tasks.find(task => task.id === event.id);
            Object.assign(task, event.changes)

            this.pushChange()
        },
        addTask() {
            this.note.tasks.push({
                id: uniqid(),
                text: '',
                priority: 4,
                subTasks: [],
                completed: false,
                canSetDate: true,
                depth: 0,
                date: new Date(new Date().setHours(0, 0, 0, 0)).toString(),
            })
            
        },

        pushChange() {
            // push changed note object to chages stack
            const note = cloneDeep(this.note)
            this.changesStack.push(note)
            this.undoStack = []
            if (this.changesStack.length > 99) {
                this.changesStack.shift()
            }
        },

    }
}
</script>

<style lang="scss" scoped>
.calendar {
    width: 200px;
    position: fixed;
    left: 50%;
    top: 50%;
}

@media (min-width: 768px) {
    .noteContent {
        margin-left: 280px;
    }
    .noteContentToggle {
        margin-left: 0;
    }
}

@media (min-width: 1280px) {
    .noteContent {
        margin-left: 0;
    }
    .noteContentToggle {
        margin-left: 280px;
    }
}

.noteContent {
    margin-top: 70px;
    transition: margin 0.4s linear;
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
    font-family: "Montserrat Alternates", "sans-serif";
    color: #000000;
    font-weight: 500;
    margin-left: 10px;
    @media (min-width: 768px) {
        margin-left: 30px;
    }
}

.tasksContainer {
    margin-top: 40px;
    @media (min-width: 768px) {
        margin-left: 40px;
    }
    @media (min-width: 1024px) {
        width: 80%;
        margin: 0 auto;
    }
    @media (min-width: 1280px) {
        width: 70%;
    }
}
</style>