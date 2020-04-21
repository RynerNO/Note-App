<template lang="pug">
div.taskContainer
    div.taskExpandSubtask(v-if="(!editTaskInput && canHaveSubtasks && hasSubtasks)" :class="{'taskExpandSubtaskActive': expandSubTask}" @click="$emit('expandSubTask')")
    div.taskCircle(v-if="!editTaskInput && !task.completed" @click="setCompleted" :class="{'priorityOneBackground': priority === 1, 'priorityTwoBackground': priority === 2, 'priorityThreeBackground': priority === 3}")
      img(src="../assets/CheckIcon.svg")
    div.taskContent(:class="{'taskContentEditing': editTaskInput}")
      p.taskText(v-show="!editTaskInput") {{ text }}
      textarea-autosize.taskEditInput(v-show="editTaskInput" ref="editTaskInput" v-model="task.text"
      :min-height="50" 
      :autosize="true"
      )
      div.editButtonsContainer(v-show="editTaskInput")
        button.editButtonSave(@click="applyEdit") Сохранить
        button.editButtonCancel(@click="cancelEdit") Отмена
    div.taskActionsContainer(v-if="!editTaskInput")
      div.taskEditButton(@click="editText")
        img(src="../assets/TaskEditButton.svg")
      div.taskSetTimeButton()
        img(src="../assets/SetTimeButton.svg")
        calendar.calendar(@setDate="setDate($event)" :class="{'showCalendar': showCalendar}")
      div.taskSetPriority(:class="{'priorityOneBackground': priority === 1, 'priorityTwoBackground': priority === 2, 'priorityThreeBackground': priority === 3}")
        div.taskPriorityList
          div.priorityOne(v-if="!(priority === 1)" @click="setPriority(1)")
          div.priorityTwo(v-if="!(priority === 2)" @click="setPriority(2)")
          div.priorityThree(v-if="!(priority === 3)" @click="setPriority(3)")
          div.priorityFour(v-if="!(priority === 4)" @click="setPriority(4)")
      div.taskAddSubtask(@click="$emit('addSubTask')" v-if="canHaveSubtasks")
      div.taskDeleteButton(@click="$emit('taskDelete')")
        i
    div.date
      span {{ dateText }}
      span(v-if="dateCompletedText")  - {{ dateCompletedText }}

</template>

<script>
import Calendar from '@components/Calendar.vue'
export default {
    components: {
        Calendar
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
        canHaveSubtasks: {
            type: Boolean,
            required: false,
            default: true
        },
        expandSubTask: {
            type: Boolean,
            required: false,
            default: false
        },
        hasSubtasks: {
            type: Boolean,
            required: false,
            default: false
        },
        date: {
            type: Date,
            required: false,
            default: () => new Date()
        },
        dateCompleted: {
            type: Date,
            required: false,

        },
        completed: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            editTaskInput: false,
            task: {
                text: this.text,
                priority: this.priority,
                date: this.date,
                completed: this.completed,
                dateCompleted: this.dateCompleted,
            },
            showCalendar: false,
            dateText: this.date.toLocaleDateString('ru-RU', {
                month: 'long',
                day: 'numeric'
            }),

        }
    },
    computed: {
        dateCompletedText: function() {
            if (this.task.dateCompleted) {
                return this.task.dateCompleted.toLocaleDateString('ru-RU', {
                    month: 'long',
                    day: 'numeric'
                })
            } else return false
        }
    },
    methods: {
        editText() {
            this.editTaskInput = true
            this.$nextTick(() => {
                this.$refs.editTaskInput.$el.focus()
            })

        },
        setPriority(level) {
            if (level !== this.task.priority) {
                this.task.priority = level
                this.$emit('taskChanged', {
                    id: this.id,
                    changes: {
                        priority: Number(this.task.priority)
                    }
                })
            }
        },

        setCompleted() {
            this.task.completed = true
            this.task.dateCompleted = new Date(new Date().setHours(0, 0, 0, 0))
            this.$emit('taskChanged', {
                id: this.id,
                changes: {
                    completed: this.task.completed,
                    dateCompleted: this.task.dateCompleted
                }
            })

        },
        setDate(date) {

            if (!this.task.hasOwnProperty('time') || date.getTime() !== this.task.date.getTime()) {

                this.task.date = date
                this.$emit('taskChanged', {
                    id: this.id,
                    changes: {
                        date: this.task.date
                    }
                })
            }
        },
        hideCalendar() {
            if (this.showCalendar) this.showCalendar = false;

        },
        applyEdit() {
            this.editTaskInput = false
            this.$emit('taskChanged', {
                id: this.id,
                type: 'task',
                changes: {
                    text: String(this.task.text)
                }
            })
        },
        cancelEdit() {
            this.editTaskInput = false
            this.task.text = this.text
        }
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
    visibility: hidden;
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
    &:hover {
        .taskPriorityList {
            height: 110px;
        }
    }
}

.taskPriorityList {
    position: absolute;
    top: 19px;
    left: -1px;
    width: 25px;
    height: 0;
    overflow: hidden;
    transition: height 0.1s linear;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .priorityOne {
        @include circle;
        background: rgba(245, 0, 29, 0.08);
        border-color: $red_main;
        margin-top: 5px;
    }
    .priorityTwo {
        @include circle;
        background: rgba(255, 169, 64, 0.25);
        border-color: #FFA940;
        margin-top: 5px;
    }
    .priorityThree {
        @include circle;
        background: rgba(3, 67, 106, 0.15);
        border-color: $blue_dark;
        margin-top: 5px;
    }
    .priorityFour {
        @include circle;
        margin-top: 5px;
    }
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