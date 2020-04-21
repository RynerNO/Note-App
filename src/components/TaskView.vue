<template lang="pug">
  div
    task(:text="text" :id="id" :date="date" :hasSubtasks="subTasks.length > 0" :priority="priority" @taskChanged="$emit('taskChanged', $event)" @addSubTask="addSubTask" @taskDelete="$emit('taskDelete')" :expandSubTask="expandSubTask" @expandSubTask="subTaskShowToggle")
    div(class="subTask" :class="{'expandSubTask': expandSubTask}" v-for="subTask of subTasks" :key="subTask.id")
      task(:text="subTask.text" :id="subTask.id" :priority="subTask.priority" :canHaveSubtasks ='false' @taskChanged="changeSubTask($event, subTask.id)")
</template>

<script>
import Task from '@components/Task.vue'
import uniqid from 'uniqid';
export default {
components: {
  Task
},
props: {
  id: {
    type: String,
    required:true,
  },
  text: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  subTasks: {
    type: Array,
    required: false
  },
  date: {
    type: Date,
    required: false,
    default: () => new Date()
  }
},
data() {
  return {
    expandSubTask: false,
    task: {
      subTasks: this.subTasks
    }
  }
},
methods: {
  subTaskShowToggle() {
    this.expandSubTask = !this.expandSubTask
  },
  changeSubTask(event, id) {
    event.id = this.id
    event.changes.id = id
    event.type = "subTask"
    this.$emit('taskChanged', event)
  },
  addSubTask() {
    this.task.subTasks.push({
      id: uniqid(),
      text: 'Новое под-задание',
      priority: 4
    })
    this.$emit('taskChanged', {
      id:this.id,
      changes: {
      subTasks: this.task.subTasks
      }})
  }
}
}
</script>

<style lang="scss" scoped>
.subTask { 
  &>div {
    margin-left: 45px;
    margin-top: 25px;
    padding-bottom: 0; 
    display: none;
  }
  }
.expandSubTask {
  &>div {
  display: flex;
  }
}
</style>