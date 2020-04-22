<template lang="pug">
  div
    div.taskContainer
      div.taskExpandSubtask(v-if="(!editTaskInput && task.canHaveSubtasks && hasSubtasks)" :class="{'taskExpandSubtaskActive': expand}" @click="expandSubTask")
      div.taskCircle(v-if="!editTaskInput && !task.completed" @click="setCompleted" :class="{'priorityOneBackground': task.priority === 1, 'priorityTwoBackground': task.priority === 2, 'priorityThreeBackground': task.priority === 3}")
        img(src="../../assets/CheckIcon.svg")
      div.taskContent(:class="{'taskContentEditing': editTaskInput}")
        p.taskText(v-show="!editTaskInput") {{ task.text }}
        textarea-autosize.taskEditInput(v-show="editTaskInput" ref="editTaskInput" v-model="task.text"
        :min-height="50" 
        :autosize="true"
        )
        div.editButtonsContainer(v-show="editTaskInput")
          button.editButtonSave(@click="applyEdit") Сохранить
          button.editButtonCancel(@click="cancelEdit") Отмена
      div.taskActionsContainer(v-if="!editTaskInput")
        div.taskEditButton(@click="editText" v-if="!task.completed")
          img(src="../../assets/TaskEditButton.svg")
        div(ref="calendarCont" v-click-outside="hideCalendar")
            div.taskSetTimeButton(v-if="task.canSetDate && !task.completed && !task.isSubTask" @click="showCalendar = !showCalendar" )
                img(src="../../assets/SetTimeButton.svg")
            calendar.calendar(  @setDate="setDate($event)" :selected="new Date(Date.parse(task.date))" :class="{'showCalendar': showCalendar}")
        div.taskSetPriorityContainer(ref="priorityCont" v-click-outside="hidePriorityList")
            div.taskSetPriority(v-if="!task.completed" @click="showPriorityList = !showPriorityList" :class="{'priorityOneBackground': task.priority === 1, 'priorityTwoBackground': task.priority === 2, 'priorityThreeBackground': task.priority === 3}")
            div.taskPriorityList(:class="{'showPriorityList': showPriorityList}")
                div.priorityOne(v-if="!(task.priority === 1)" @click="setPriority(1)")
                div.priorityTwo(v-if="!(task.priority === 2)" @click="setPriority(2)")
                div.priorityThree(v-if="!(task.priority === 3)" @click="setPriority(3)")
                div.priorityFour(v-if="!(task.priority === 4)" @click="setPriority(4)")
        div.taskAddSubtask(@click="addSubTask(); $emit('addSubTask')" v-if="task.canHaveSubtasks && !task.completed")
        div.taskDeleteButton(@click="$emit('taskDelete')")
          i
      div.date(v-if="task.canSetDate && !editTaskInput && !task.isSubTask")
        span {{ dateText }}
        span(v-if="dateCompletedText")  - {{ dateCompletedText }}
    div.subTask(v-for="subTask of subTasksSorted" :key="subTask.id" v-if="expand")
      task(v-bind="subTask" :completed="task.completed" @addSubTask="sendChanges" @taskDelete="deleteSubTask(subTask)" @subTaskChanged="makeChanges($event)")
</template>
<script>
import Calendar from '@components/Calendar.vue'
import uniqid from 'uniqid';
import ClickOutside from 'vue-click-outside'
export default {
    name: 'task',
    components: {
        Calendar
    },
    directives: {
        ClickOutside
    },
    props: {
        id: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        priority: {
            type: Number,
            required: true
        },
        isSubTask: {
            type: Boolean,
            required: false,
            default: false
        },
        depth: {
            type: Number,
            required: true,
        },
        maxDepth: {
            type: Number,
            required: false,
            default: 2
        },
        canHaveSubtasks: {
            type: Boolean,
            required: false,
            default: true
        },
        date: {
            type: String,
            required: false,
            default: () => new Date().toString()
        },
        dateCompleted: {
            type: String,
            required: false,

        },
        completed: {
            type: Boolean,
            required: true
        },
        subTasks: {
            type: Array,
            required: false,
            default: () => []
        },
        canSetDate: {
            type: Boolean,
            required: false,
            default: true
        },
        new: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            showPriorityList: false,
            editTaskInput: false,
            showCalendar: false,
            expand: false,
        }
    },
    computed: {
        subTasksSorted: {
            get() {
                return this.task.subTasks.sort(function(a, b) {
                    if (b.completed) {
                        return false
                    } else if (a.completed) {
                        return true
                    }
                    return a.priority - b.priority;
                })
            }
        },
        hasSubtasks: function() {
            if (!this.task.subTasks) return false
            return this.task.subTasks.length > 0
        },
        task: {
            get() {
                return { ...this.$props }
            }
        },
        dateText: function() {
            const tomorrow = new Date(new Date().setHours(0, 0, 0, 0))
            tomorrow.setDate(tomorrow.getDate() + 1)
            const yesterday = new Date(new Date().setHours(0, 0, 0, 0))
            yesterday.setDate(yesterday.getDate() - 1)
            if (Date.parse(this.task.date) === tomorrow.getTime()) {
                return 'Завтра'
            } else if (Date.parse(this.task.date) === yesterday.getTime()) {
                return 'Вчера'
            } else if (Date.parse(this.task.date) === new Date(new Date().setHours(0, 0, 0, 0)).getTime()) {
                return 'Сегодня'
            }
            return new Date(Date.parse(this.task.date)).toLocaleDateString('ru-RU', {
                month: 'long',
                day: 'numeric'
            })
        },
        dateCompletedText: function() {
            if (this.dateCompleted) {
                const tomorrow = new Date(new Date().setHours(0, 0, 0, 0))
                tomorrow.setDate(tomorrow.getDate() + 1)
                const yesterday = new Date(new Date().setHours(0, 0, 0, 0))
                yesterday.setDate(yesterday.getDate() - 1)
                if (Date.parse(this.task.dateCompleted) === tomorrow.getTime()) {
                    return 'Завтра'
                } else if (Date.parse(this.task.dateCompleted) === yesterday.getTime()) {
                    return 'Вчера'
                } else if (Date.parse(this.task.dateCompleted) === new Date(new Date().setHours(0, 0, 0, 0)).getTime()) {
                    return 'Сегодня'
                }
                return new Date(Date.parse(this.task.dateCompleted)).toLocaleDateString('ru-RU', {
                    month: 'long',
                    day: 'numeric'
                })
            } else return false
        }
    },
    methods: {
        hideCalendar() {

            this.showCalendar = false;


        },
        hidePriorityList() {

            this.showPriorityList = false;
        },

        expandSubTask() {
            this.expand = !this.expand;

        },
        addSubTask() {
            if (!this.task.hasOwnProperty('subTasks')) this.task.subTasks = []
            let depth = this.task.depth + 1
            let canHaveSubtasks = true
            if (depth === this.maxDepth) canHaveSubtasks = false
            this.task.subTasks.push({
                id: uniqid(),
                text: '',
                priority: 4,
                depth,
                canHaveSubtasks,
                isSubTask: true,
                completed: this.task.completed,
                date: this.task.date
            })
            if (!this.expand) this.expand = true
            this.$forceUpdate() // rerender component to show nested changes
            this.sendChanges()
        },
        deleteSubTask(subTaskObj) {

            this.task.subTasks.forEach((subTask, i) => {

                if (subTask.id === subTaskObj.id) {

                    this.task.subTasks.splice(i, 1)
                    this.sendChanges()
                    this.$forceUpdate()
                    this.flash('Подзадача удалена!', 'error')

                }
            })
        },
        setDate(date) {
            if (Date.parse(this.task.date) !== date.getTime()) {
                date = date.toString()
                this.task.date = date
                this.sendChanges()
            }
        },
        setCompleted() {
            this.task.completed = true
            this.task.dateCompleted = new Date(new Date().setHours(0, 0, 0, 0)).toString()
            this.flash('Отправлено в архив')
            this.sendChanges()
        },
        applyEdit() {
            this.editTaskInput = false
            this.task.new = false
            if (this.task.text.length === 0) {
                this.$emit('taskDelete')
                return false;
            }
            this.sendChanges()
        },
        cancelEdit() {
            if (this.task.new) {
                this.$emit('taskDelete')
            }
            this.editTaskInput = false
            this.task.text = this.task.text
        },
        makeChanges(changes) {
            const subTask = this.task.subTasks.find(subTask => subTask.id === changes.id);
            Object.assign(subTask, changes.changes)

            this.sendChanges()
        },
        sendChanges() {

            if (this.task.isSubTask === true) {
                this.$emit('subTaskChanged', {
                    id: this.task.id,
                    changes: this.task
                })
                return false
            }
            this.$emit('taskChanged', {
                id: this.task.id,
                changes: this.task
            })
        },
        editText() {
            this.editTaskInput = true
            this.$nextTick(() => {
                this.$refs.editTaskInput.$el.focus()
            })

        },
        setPriority(level) {
            if (level !== this.task.priority) {
                this.task.priority = level
                this.sendChanges()
            }
        },
    },
    mounted() {
        if (this.new) { // open editor if new
            this.editTaskInput = true
            this.$nextTick(() => {
                this.$refs.editTaskInput.$el.focus()
            })
        }
        this.$refs.calendarCont = this.$refs.priorityCont = this.$el
    }
}
</script>
<style lang="scss">
@mixin circle {
    min-width: 20px;
    height: 20px;
    border-radius: 9999px;
    background: #FAFAFA;
    border: 1px solid #CDCDCD;
    cursor: pointer;
}

.task {
    width: 100%;
}

.subTask {
    &>div {
        margin-left: 45px;
        margin-top: 40px;
        padding-bottom: 0;
    }
}

.expandSubTask {
    &>div {
        display: flex;
    }
}

.taskContainer {
    display: flex;
    align-items: center;
    font-family: 'Montserrat Alternates', 'sans-serif';
    font-size: 14px;
    font-weight: 400;
    border-bottom: 1px solid #ccc;
    margin: 0 20px;
    position: relative;
    margin-top: 40px;
    &:hover {
        .taskActionsContainer {
            opacity: 1;
        }
    }
}

.taskContent {
    width: 100%;
}

.taskContentEditing {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.editButtonsContainer {
    margin: 5px 0;
}

.editButtonSave {
    @include button;
    background-color: $blue_light;
    color: #fff;
}

.buttonDisabled {
    cursor: default;
    background-color: #dad9d9;
}

.editButtonCancel {
    @include button;
}

.taskText {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 5px;
    word-wrap: break-word;
}

.taskEditInput {
    outline: none;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 5px;
    border: 1px solid rgb(156, 156, 156);
    resize: none;
    width: 100%;
    &:focus {
        outline: none;
    }
}

.taskCircle {
    @include circle;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    margin-bottom: 5px;
    position: relative;
    align-self: flex-start;
    z-index: 15;
    img {
        display: none;
    }
    &:hover {
        img {
            display: block;
        }
    }
}

.taskExpandSubtask {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #555;
    position: absolute;
    transform: rotate(-90deg);
    left: -10px;
    top: 7px;
    transition: all 0.2s linear;
    cursor: pointer;
}

.taskExpandSubtaskActive {
    transform: rotate(0deg);
}

.taskEditButton {
    width: 31px;
    height: 31px;
    margin-right: 5px;
    padding: 5px;
    cursor: pointer;
    img {
        width: 100%;
    }
    &:hover {
        background: #dfdfdf;
    }
}

.taskSetTimeButton {
    width: 31px;
    height: 31px;
    margin-right: 5px;
    padding: 5px;
    position: relative;
    cursor: pointer;
    img {
        width: 100%;
    }
    &:hover {
        background: #dfdfdf;
        .calendar {
            visibility: visible;
        }
    }
}

.calendar {
    position: absolute;
    z-index: 150;
    width: 250px;
    left: -56px;
    top: 34px;
    display: none;
    transition: all 0.2s linear;
}

.showCalendar {
    display: block;
}

.taskActionsContainer {
    position: absolute;
    right: 0;
    background: $main;
    top: -5px;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s linear;
}

.taskSetPriority {
    margin-left: 15px;
    margin-right: 5px;
    @include circle;
    position: relative;
    &::after {
        content: '';
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #555;
        position: absolute;
        right: 20px;
        top: 6px;
    }
    .showPriorityList {
        height: 110px;
    }
}

.taskSetPriorityContainer {
    position: relative;
}

.taskPriorityList {
    position: absolute;
    top: 19px;
    left: 15px;
    width: 25px;
    height: 0;
    overflow: hidden;
    transition: height 0.3s linear;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.showPriorityList {
    height: 110px;
}

.priorityOne {
    @include circle;
    z-index: 15;
    background: rgba(245, 0, 29, 0.08);
    border-color: $red_main;
    margin-top: 5px;
}

.priorityTwo {
    @include circle;
    z-index: 15;
    background: rgba(255, 169, 64, 0.25);
    border-color: #FFA940;
    margin-top: 5px;
}

.priorityThree {
    @include circle;
    z-index: 15;
    background: rgba(3, 67, 106, 0.15);
    border-color: $blue_dark;
    margin-top: 5px;
}

.priorityFour {
    @include circle;
    margin-top: 5px;
}

.taskAddSubtask {
    @include plusButton;
    background: transparent;
    width: 31px;
    height: 31px;
    margin-right: 5px;
    padding: 5px;
    cursor: pointer;
    img {
        width: 100%;
    }
    &:hover {
        background: #dfdfdf;
    }
    cursor: pointer;
    &::before,
    &::after {
        background: $green_main;
        top: 14px;
        left: 5px;
    }
}

.taskDeleteButton {
    @include deleteButton;
    width: 31px;
    height: 31px;
    margin-right: 5px;
    padding: 5px;
    position: relative;
    cursor: pointer;
    img {
        width: 100%;
    }
    &:hover {
        background: #dfdfdf;
        &::before,
        &::after {
            background: $red_main;
        }
    }
    cursor: pointer;
    &::before,
    &::after {
        background: $red_main;
        top: 14px;
        left: 3px;
    }
}

.priorityOneBackground {
    background: rgba(245, 0, 29, 0.08);
    border-color: $red_main;
}

.priorityTwoBackground {
    background: rgba(255, 169, 64, 0.25);
    border-color: #FFA940;
}

.priorityThreeBackground {
    background: rgba(3, 67, 106, 0.15);
    border-color: $blue_dark;
}

.date {
    width: 100%;
    position: absolute;
    top: 34px;
    left: 32px;
    color: $red_main;
    cursor: default;
}
</style>