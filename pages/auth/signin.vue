<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="mail" rules="required|email" >
        <v-text-field v-model="email" :error-messages="errors" label="メールアドレス" required></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="password" rules="required|min:6" >
        <v-text-field v-model="password" :error-messages="errors" label="パスワード" required></v-text-field>
      </validation-provider>
      <v-btn class="mr-4" type="submit" :disabled="invalid" >ログインをする</v-btn>
    </form>
  </validation-observer>
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
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        const payload = {"email": this.email, "password": this.password}
        this.$store.dispatch('auth/signin', payload)
      } else {
        alert("バリデーションエラー")
      }
    }
  }
}
</script>
