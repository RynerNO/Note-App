<template lang="pug">
  div#app
    router-view
</template>
<script>
export default {
  mounted() {
     this.$router.replace('/') 
  }
}
</script>

