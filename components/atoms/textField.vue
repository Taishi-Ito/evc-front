<template>
  <div class="textFieldContainer">
    <v-text-field v-model="textFieldContent" :label="textFieldLabel"/>
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
</style>
