<template>
  <div>
    <div>ログイン
      <v-text-field
        v-model="email"
        label="メールアドレス"
      />
      <v-text-field
        v-model="password"
        label="パスワード"
      />
    </div>
    <div>
      <v-btn @click="login">ログインをする</v-btn>
      <v-btn text to="./register">ユーザー登録</v-btn>
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
    login() {
      const params = {"email": this.email, "password": this.password}
      this.$store.dispatch('auth/login', params)
    }
  }
}
</script>
