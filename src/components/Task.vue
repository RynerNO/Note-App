<template lang="pug">
  div
    div.taskContainer
      div.taskExpandSubtask
      div.taskCircle
        img(src="../assets/CheckIcon.svg")
      h2.taskText Какая-то задача
      input.taskEditInput
      div.taskActionsContainer
        div.taskEditButton
          img(src="../assets/TaskEditButton.svg")
        div.taskSetPriority
          div.taskPriorityList
            div.priorityOne
            div.priorityTwo
            div.priorityThree
            div.priorityFour
        div.taskAddSubtask
        div.taskDeleteButton
          i
    div.taskContainer.subTask
      div.subTaskCircle 
        img(src="../assets/CheckIcon.svg")
      h2.taskText Какая-то задача
      input.taskEditInput
      div.taskActionsContainer
        div.taskEditButton
          img(src="../assets/TaskEditButton.svg")
        div.taskSetPriority
          div.taskPriorityList
            div.priorityOne
            div.priorityTwo
            div.priorityThree
            div.priorityFour
        div.taskAddSubtask
        div.taskDeleteButton
          i

</template>

<script>
export default {

}
</script>

<style lang="scss">
@mixin circle {
    width: 20px;
    height: 20px;
    border-radius: 9999px;
    background: #FAFAFA;
    border:1px solid #CDCDCD;
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
    margin-top: 20px;
    &:hover {
      .taskActionsContainer {
          opacity: 1;
      }
      
    }
  }

  .taskText {
    font-weight: 400;
    
    font-size: 14px;
    margin-bottom: 5px;
  }
  .taskEditInput {
    display: none;
    outline: none;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 5px;

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
        cursor: pointer;
  }
  .taskEditButton {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    cursor: pointer;
    img {
      width: 100%;
    }
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
     
    .priorityOne {
      @include circle;
      position: absolute;
      background: rgba(245, 0, 29, 0.08);
      border-color: $red_main;
      top: 11px;
      left:0;
    }
    .priorityTwo {
      @include circle;
      background: rgba(255, 169, 64, 0.25);
      position: absolute;
      border-color: #FFA940;
      top: 35px;
      left:0;
    }
    .priorityThree {
      @include circle;
      background: rgba(3, 67, 106, 0.15);
      position: absolute;
      border-color: $blue_dark;
      top: 59px;
      left:0;
    }
    .priorityFour {
      @include circle;
      position: absolute;
      top: 83px;
      left:0;
    }
     
  }
  .taskAddSubtask { 
   @include plusButton;
   background: transparent;
   cursor: pointer;
   &::before, &::after {
     background: $green_main;
   } 
  }
  .taskDeleteButton {
    @include deleteButton;
    width: 25px;
    height: 25px;
    position: relative;
    &:hover {
      background: transparent; 
      &::before, &::after {
        background: $red_main; 
      }
    }
    
    &::before, &::after {
     width: 20px;
     top: 12px;
     left: 3px;
   } 
    margin-right: 5px;
  }
  .subTask {
    
    margin-left: 35px;
    margin-top: 25px;
    padding-bottom: 0;
    display: none;
  }
  .subTaskCircle {
    @include circle;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    margin-bottom: 5px;
    position: relative;
    img {
      display: none;
    }
    &:hover {
      img {
        display: block;
      }
    }
  }
</style>