<template>
  <div class="textFieldContainer">
    <div class="inner">
      <v-text-field v-model="textFieldContent" :label="textFieldLabel"/>
    </div>
  </div>
</template>
<script>
  export default {
  props: {
    textFieldContent: {
      type: String,
      required: false
    },
    textFieldLabel: {
      type: String,
      required: false
    }
  },
  watch: {
    textFieldContent (val) {
      this.$emit("update", val);
    },
  },
  }
</script>
<style>
.textFieldContainer {
  margin-top: 20px;
}
.inner {
  width: 80%;
}
</style>
