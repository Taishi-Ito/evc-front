<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <div>
      現在のメールアドレス
      {{ email }}
    </div>
    <form @submit.prevent="updateEmail">
      <validation-provider v-slot="{ errors }" name="mail" rules="required|email" >
        <v-text-field v-model="newEmail" :error-messages="errors" label="メールアドレス" required></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="password" rules="required|min:6" >
        <v-text-field v-model="passwordForEmailUpdate" :error-messages="errors" label="パスワード" required></v-text-field>
      </validation-provider>
      <v-btn class="mr-4" type="submit" :disabled="invalid" >メールアドレスを変更する</v-btn>
    </form>
  </validation-observer>
</template>

<script>
export default {
  data(){
    return {
      newEmail: "",
      password: "",
      passwordForEmailUpdate: ""
    }
  },
  computed: {
    email(){
      return this.$store.getters["auth/email"]
    }
  },
  methods: {
    async updateEmail() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        const payload = {"email": this.newEmail, "password": this.passwordForEmailUpdate}
        this.$store.dispatch('auth/updateEmail', payload)
      } else {
        alert("バリデーションエラー")
      }
    }
  },
  mounted() {
  }
}
</script>
