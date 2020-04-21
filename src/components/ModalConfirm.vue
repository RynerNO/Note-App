<template lang="pug">
  div.modalContainer
    div.modal
      p.modalMessage {{ message }}
      div.modalButtonContainer
        button(@click="$emit('modalConfirm')").modalConfirmButton 
          span {{ confirmButtonText }}
        button(@click="$emit('modalClose')").modalCancelButton Отмена
    div.modalBackground(@click="$emit('modalClose')")
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        confirmButtonText: {
            type: String,
            required: true
        }
    },

}
</script>
<style lang="scss" scoped>
.modalContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 95;
}

.modalBackground {
    background: rgba(24, 24, 24, 0.3);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.modal {
    width: 239px;
    background: #FEFDF8;
    position: absolute;
    margin-left: -119.5px;
    margin-top: -48px;
    left: 50%;
    top: 50%;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-family: 'Montserrat Alternates', 'sans-serif';
    z-index: 10;
}

.modalMessage {
    color: $blue_dark;
    width: 80%;
    margin: 10px auto;
    text-align: center;
}

.modalButtonContainer {
    margin-top: 25px;
    display: flex;
    align-self: center;
    justify-content: center;
    width: 100%;
    background: $blue;
    border-radius: 0 0 14px 14px;
    padding: 8px;
}

.modalConfirmButton {
    @include button;
    background: $red_main;
    color: #fff;
    &:hover {
        background: $red_dark;
    }
}

.modalCancelButton {
    @include button;
    margin: 0;
    &:hover {
        text-decoration: underline;
    }
}
</style>