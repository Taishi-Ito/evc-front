<template>
  <div>
    <v-snackbar v-model="isAlert" :top="true" :color="alertColor" :timeout="timeout">
      {{ alertMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="changeAlertStatus">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timeout: -1
      }
    },
    computed: {
      alertMessage() {
        return this.$store.getters["util/alertMessage"]
      },
      isAlert() {
        return this.$store.getters["util/isAlert"]
      },
      alertColor() {
        return this.$store.getters["util/alertColor"]
      }
    },
    methods: {
      changeAlertStatus(){
        this.$store.commit('util/changeAlertStatus')
      }
    }
  }
</script>
