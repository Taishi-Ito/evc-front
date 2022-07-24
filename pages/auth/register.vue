<template>
  <div>
    <div>
      <v-text-field v-model="name" label="名前"/>
      <v-text-field v-model="email" label="メールアドレス"/>
      <v-text-field v-model="password" label="パスワード"/>
    </div>
    <div>
      <v-btn @click="execSignUp">ユーザー登録をする</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    }
  },
  methods: {
    execSignUp() {
      const payload = {"name": this.name, "email": this.email, "password": this.password}
      this.$store.dispatch('auth/signUp', payload)
    }
  }
  }
</script>
