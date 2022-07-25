<template>
  <div>
    <div>
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
      email: "",
      password: ""
    }
  },
  methods: {
    execSignUp() {
      const payload = {"email": this.email, "password": this.password}
      this.$store.dispatch('auth/signUp', payload)
    }
  }
  }
</script>
