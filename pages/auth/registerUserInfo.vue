<template>
  <div>
    <div>
      <v-text-field v-model="name" label="名前"/>
    </div>
    <div>
      <v-btn @click="registerUserInfo">名前を登録をする</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      name: "",
    }
  },
  methods: {
    registerUserInfo() {
      const payload = {"name": this.name}
      this.$store.dispatch('auth/registerUserInfo', payload)
    }
  }
  }
</script>
