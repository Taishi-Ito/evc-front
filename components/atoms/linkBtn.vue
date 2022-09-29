<template>
  <div class="linkBtnContainer">
    <v-btn class="mr-4 sendBtn" btnSize :color="btnColor" :id="btnId" :to="to">{{ btnTitle }}</v-btn>
  </div>
</template>

<script>
  export default {
  props: {
    btnId: {
      type: String,
      required: true
    },
    btnTitle: {
      type: String,
      required: true
    },
    btnSize: {
      type: String,
      required: false
    },
    btnColor: {
      type: String,
      required: false
    },
    to: {
      type: String,
      required: false
    }
  }
  }
</script>
<style scoped>
  .linkBtnContainer {
    margin-top: 30px;
  }
  .sendBtn {
    width: 80%;
    margin: 0 auto;
    max-width: 140px;
  }
</style>
