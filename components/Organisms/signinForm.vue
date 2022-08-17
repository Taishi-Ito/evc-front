<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <MoleculesInputForm
        :formContent="email"
        :formLabel="'メールアドレス'"
        :formId="'emailField'"
        :formName="'emailField'"
        :formRules="'required|email'"
        :formType="'text'"
        @update="email=$event"
      ></MoleculesInputForm>
      <MoleculesInputForm
        :formContent="password"
        :formLabel="'パスワード'"
        :formId="'passwordField'"
        :formName="'passwordField'"
        :formRules="'required|min:6'"
        :formType="'password'"
        @update="password=$event"
      ></MoleculesInputForm>
      <AtomsSendBtn
        :btnId="'signin'"
        :btnTitle="'送信'"
        :btnType="'submit'"
        :btnDisabled="invalid"
        :btnColor="'primary'"
      ></AtomsSendBtn>
    </form>
  </validation-observer>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirmation: ""
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
