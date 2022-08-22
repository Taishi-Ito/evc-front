<template>
  <div class="textFieldContainer">
    <div class="inner">
      <v-text-field v-model="content" :label="textFieldLabel"/>
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
    computed: {
      content: {
        get() {
          return this.textFieldContent
        },
        set(val) {
          this.$emit('update', val)
        }
      }
    }
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
