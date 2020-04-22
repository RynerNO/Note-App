<template lang="pug">
  div
    div(v-for="message of flashMessages" :key='message.id' :class="{'success': message.type === 'success','error': message.type === 'error'}" class="flashMessage") {{ message.message }}
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.success {
    background: $green_main;
    color: #fff;
}

.error {
    background: $red_dark;
    color: #fff;
}

.flashMessage {
    width: 270px;
    height: 70px;
    border-radius: 15px;
    position: fixed;
    bottom: 10%;
    left: 50%;
    margin-left: -125px;
    margin-bottom: -35px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    @media(min-width: 768px) {
        bottom: 50px;
        left: 50px;
        margin: 0;
    }
}
</style>