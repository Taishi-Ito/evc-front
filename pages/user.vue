<template>
  <div>
    <validation-observer ref="emailObserver" v-slot="{ invalid }">
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
    <validation-observer ref="passwordObserver" v-slot="{ invalid }">
      <div>
        新しいパスワード
      </div>
      <form @submit.prevent="updatePassword">
        <validation-provider v-slot="{ errors }" name="currentPassword" rules="required|min:6" >
          <v-text-field v-model="currentPassword" :error-messages="errors" label="現在のパスワード" required></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="newPassword" rules="required|min:6" >
          <v-text-field v-model="newPassword" :error-messages="errors" label="新しいパスワード" required></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="newPasswordConfirmation" rules="required|confirmed:newPassword" >
          <v-text-field v-model="newPasswordConfirmation" :error-messages="errors" label="新しいパスワード(確認)" required></v-text-field>
        </validation-provider>
        <v-btn class="mr-4" type="submit" :disabled="invalid" >メールアドレスを変更する</v-btn>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data(){
    return {
      newEmail: "",
      passwordForEmailUpdate: "",
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: ""
    }
  },
  computed: {
    email(){
      return this.$store.getters["auth/email"]
    }
  },
  methods: {
    async updateEmail() {
      const isValid = await this.$refs.emailObserver.validate()
      if (isValid) {
        const payload = {"email": this.newEmail, "password": this.passwordForEmailUpdate}
        this.$store.dispatch('auth/updateEmail', payload)
      } else {
        alert("バリデーションエラー")
      }
    },
    async updatePassword() {
      const isValid = await this.$refs.passwordObserver.validate()
      if (isValid) {
        const payload = {"currentPassword": this.currentPassword, "newPassword": this.newPassword , "newPasswordConfirmation": this.newPasswordConfirmation}
        this.$store.dispatch('auth/updatePassword', payload)
      } else {
        alert("バリデーションエラー")
      }
    }
  },
  mounted() {
  }
}
</script>
