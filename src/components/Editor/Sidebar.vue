<template lang="pug">
  aside.noteSidebar(:class="{'noteSidebarToggle': toogle}")
      div.noteSidebarNav
      div.noteSidebarNavButton(@click="currentFilter = 'all'; $emit('all')" :class="{'noteSidebarNavButtonActive': currentFilter === 'all'}") 
        img(src="../../assets/NoteSidebarActive.svg")
        |Все 
      div.noteSidebarNavButton(@click="currentFilter = 'active'; $emit('active')" :class="{'noteSidebarNavButtonActive': currentFilter === 'active'}") 
        img(src="../../assets/NoteSidebarActive.svg")
        |Активно 
      div.noteSidebarNavButton(@click="currentFilter = 'planned'; $emit('planned')" :class="{'noteSidebarNavButtonActive': currentFilter === 'planned'}")  
        img(src="../../assets/NoteSidebarPlanned.svg")
        |Запланировано
      div.noteSidebarNavButton(@click="currentFilter = 'completed'; $emit('completed')" :class="{'noteSidebarNavButtonActive':currentFilter === 'completed'}") 
        img(src="../../assets/NoteSidebarCompleted.svg")
        |Архив
</template>
<script>
export default {
    props: {
      default: {
        type: String,
        required: false,
        default: 'all'
      },
      toogle: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data() {
        return {
            currentFilter: this.default
        }
    }
}
</script>
<style lang="scss" scoped>
.noteSidebar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f6f5f5;
    position: fixed;
    top: 45px;
    height: 100%;
    left: 0;
    transition: all 0.4s linear;
    z-index: 50;
    .noteSidebarNavButton {
        @include button;
        background: #efede4;
        display: flex;
        font-size: 17px;
        font-family: "Montserrat Alternates", "sans-serif";
        font-weight: 500;
        color: #000000;
        width: 208px;
        margin-top: 15px;
        align-items: center;
        &:hover {
            background: #dadada;
        }
    }
    .noteSidebarNavButtonActive {
        background: #fa3e54;
        color: #fff;
        &:hover {
            cursor: default;
            background: #fa3e54;
        }
    }
}

.noteSidebarToggle {
    left: -100%;
}

@media (min-width: 768px) {
    .noteSidebar {
        width: 280px;
        left: 0;
    }
    .noteSidebarToggle {
        left: -100%;
       
    }
    .noteSidebarNav {
            margin-top: 75px;
        }
}

@media (min-width: 1280px) {
    .noteSidebar {
        width: 280px;
        left: -100%;
    }
    .noteSidebarToggle {
        left: 0;
    }
}
</style>