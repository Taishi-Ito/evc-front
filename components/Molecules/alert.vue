<template>
  <div class="alertContainer">
    <v-snackbar v-model="isAlert" :top="true" :color="alertColor" :timeout="timeout">
      <h3 v-html="alertMessage"></h3>
      <div v-html="detail"></div>
      <div v-if="method">error:{{ method }}</div>
      <div>{{ errorMessage }}</div>
      <template v-slot:action="{ attrs }">
        <v-icon v-bind="attrs" @click="changeAlertStatus">mdi-close-circle</v-icon>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    computed: {
      alertMessage() {
        return this.$store.getters["util/alertMessage"]
      },
      isAlert() {
        return this.$store.getters["util/isAlert"]
      },
      alertColor() {
        return this.$store.getters["util/alertColor"]
      },
      detail() {
        return this.$store.getters["util/detail"]
      },
      method() {
        return this.$store.getters["util/method"]
      },
      errorMessage() {
        return this.$store.getters["util/errorMessage"]
      },
      timeout() {
        return this.$store.getters["util/timeout"]
      },
    },
    methods: {
      changeAlertStatus(){
        this.$store.commit('util/changeAlertStatus')
      }
    }
  }
</script>

<style scoped>
  .alertContainer {
    z-index: 10001;
  }
</style>
