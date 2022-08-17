<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <MoleculesInputForm
        :formContent="email"
        :formLabel="'メールアドレス'"
        :formId="'signUpEmail'"
        :formName="'メールアドレス'"
        :formRules="'required|email'"
        :formType="'text'"
        @update="email=$event"
      ></MoleculesInputForm>
      <MoleculesInputForm
        :formContent="password"
        :formLabel="'パスワード'"
        :formId="'signUpPassword'"
        :formName="'パスワード'"
        :formRules="'required|min:6'"
        :formType="'password'"
        @update="password=$event"
      ></MoleculesInputForm>
      <MoleculesInputForm
        :formContent="passwordConfirmation"
        :formLabel="'新しいパスワード(確認)'"
        :formId="'signUpPasswordConfirmation'"
        :formName="'新しいパスワード(確認)'"
        :formRules="'required|confirmed:パスワード'"
        :formType="'password'"
        @update="passwordConfirmation=$event"
      ></MoleculesInputForm>
      <AtomsSendBtn
        :btnId="'register'"
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
        this.$store.dispatch('auth/signUp', payload)
      } else {
        alert("バリデーションエラー")
      }
    }
  }
  }
</script>
