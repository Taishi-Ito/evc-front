<template>
  <div>
    <v-row class="container">
      <v-col cols="11">
          <v-text-field v-model="q" :placeholder="placeholder"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn class="primary" @click="clickEvent()">{{ btnTitle }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      btnTitle: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: false
      }
    },
    data(){
      return {
        q: ""
      }
    },
    methods: {
      clickEvent(){
        this.$emit('execute', this.q)
      }
    }
  }
</script>

<style>
  .container {
    align-items: center;
  }
</style>
