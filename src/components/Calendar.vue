<template lang="pug">
  div
    div.calendarContainer
      div.calendarControls
         span.monthName {{ monthNames[monthShow - 1]}}
         span.year {{ yearShow }}
         div.prevMonthButton(@click="prevMonth")
         div.currentMonthButton(@click="curMonth")
          i
         div.nextMonthButton(@click="nextMonth")
      div.daysNames
        span пн
        span вт
        span ср
        span чт
        span пт
        span сб
        span вт
      div.days
       div.day(v-for="(day, index) of days" :key="index" :class="{'empty': day === '\u00a0', 'selected': compareDate(selectedDay, day), 'today': compareDate(today, day), 'past': past(today, day)}" @click="setDate($event, day)") {{ day }}
</template>

<script>
export default {
    props: {
        selected: {
            type: Date,
            required: false,
            default:() => new Date(new Date().setHours(0, 0, 0, 0))
        }
    },
    data() {
        return {
            days: '',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            yearShow: '',
            monthShow: 4,
            selectedDay: this.selected,
            today: new Date(),
        }
    },
    mounted() {
        this.yearShow = new Date().getFullYear()
        this.monthShow = new Date().getMonth() + 1
        this.createCalendar(this.yearShow, this.monthShow)

    },
    methods: {
        past(date, day) {
            if (day === '\u00a0') return false
            return date.getTime() > new Date(this.yearShow, this.monthShow - 1, day).getTime()
        },
        compareDate(date, day) {
            if (day === '\u00a0') return false
            if (date === '') return false

            new Date(date.setHours(0, 0, 0, 0));
            return date.getTime() === new Date(this.yearShow, this.monthShow - 1, day).getTime()
        },
        setDate(event, day) {
            // check for empty cell
            if (day === '\u00a0') return false

            const date = new Date(this.yearShow, this.monthShow - 1, day)
            // check if selected day is the same or in the past
            if (!this.selectedDay === '' && this.selectedDay.getTime() == 
            date.getTime() || this.past(this.today, day)) return false
            
            this.selectedDay = date
            this.$emit('setDate', date)
        },
        createCalendar(year, month) {

            let d = new Date(year, month - 1);

            function getDay(date) {
                let day = date.getDay();
                if (day == 0) day = 7;
                return day - 1;
            }
            const days = this.days = []
            for (let i = 0; i < getDay(d); i++) {// fill cells until first day
                days.push("\u00a0")
            }
            while (d.getMonth() == month - 1) {
                days.push(String(d.getDate()))
                d.setDate(d.getDate() + 1);
            }
            if (getDay(d) != 0) {//fill cells if threre's left any
                for (let i = getDay(d); i < 7; i++) {
                    days.push("\u00a0")
                }
            }
        },
        curMonth() {
            this.yearShow = new Date().getFullYear()
            this.monthShow = new Date().getMonth() + 1
        },
        nextMonth() {
            this.monthShow++
                if (this.monthShow > 12) {
                    this.yearShow++
                        this.monthShow = 1
                }
            this.createCalendar(this.yearShow, this.monthShow)

        },
        prevMonth() {
            this.monthShow--
                if (this.monthShow < 1) {
                    this.yearShow--
                        this.monthShow = 12
                }
            this.createCalendar(this.yearShow, this.monthShow)
        },
    }
}
</script>

<style lang="scss" scoped>
.calendarContainer {
    display: grid;
    width: 100%;
    grid-template-columns: minmax(0, 1fr);
    background: #fff;
    padding: 5px;
    border: 1px solid #8b8b8b;
    border-radius: 11px;
}

.daysNames {
    grid-column: span 1/ span 1;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    margin-bottom: 5px;
    span {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.days {
    display: grid;
    grid-column: span 1/ span 1;
    grid-template-columns: repeat(7, minmax(0, 1fr))
}

.day {
    grid-column: span 1/ span 1;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-family: 'Montserrat Alternates', 'sans-serif';
    justify-content: center;
    padding: 5px;
    &:hover {
        cursor: pointer;
        background: #f8f8f8;
    }
}

.today {
    color: $red_main;
    font-weight: 500;
}

.selected {
    background: $blue_light;
    color: #000000;
    &:hover {
        cursor: default;
        background: $blue_light;
    }
}

.past {
    cursor: default;
    background: transparent;
    color: #b8b8b8;
    &:hover {
        cursor: default;
        background: transparent;
    }
}

.empty {
    &:hover {
        cursor: default;
        background: transparent;
    }
}

.calendarControls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #888888;
}

@mixin arrow {
    width: 25px;
    height: 25px;
    padding: 5px;
    position: relative;
    cursor: pointer;
    &::before,
    &::after {
        position: absolute;
        content: '';
        width: 16px;
        height: 2px;
        background: #4e4e4e;
        top: 15px;
        left: 5px;
        transform: rotate(45deg);
    }
    &::before {
        transform: rotate(-45deg);
        top: 5px;
    }
}

.prevMonthButton {
    @include arrow;
    &:hover {
        background-color: #f8f8f8;
    }
}

.nextMonthButton {
    @include arrow;
    &:hover {
        background-color: #f8f8f8;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }
}

.currentMonthButton {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color: #f8f8f8;
    }
    i {
        width: 15px;
        height: 15px;
        border: 1px solid #d8d8d8;
        border-radius: 9999px;
        background-color: #f8f8f8;
    }
}

.monthName,
.year {
    font-size: 14px;
    font-family: 'Montserrat Alternates', 'sans-serif';
    margin-right: 5px;
}

.monthName {
    margin-left: 5px;
}
</style>