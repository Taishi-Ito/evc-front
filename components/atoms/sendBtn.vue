<template>
  <div class="sendBtnContainer">
    <v-btn class="mr-4 sendBtn" type="btnType" :disabled="btnDisabled" btnSize :color="btnColor" :id="btnId">{{ btnTitle }}</v-btn>
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
    btnType: {
      type: String,
      required: true
    },
    btnDisabled: {
      type: Boolean,
      required: false
    },
    btnSize: {
      type: String,
      required: false
    },
    btnColor: {
      type: String,
      required: false
    }
  }
  }
</script>
<style>
.sendBtnContainer {
  margin-top: 30px;
}
.sendBtn {
  width: 80%;
  margin: 0 auto;
  max-width: 140px;
}
</style>
