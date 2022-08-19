<template>
  <div class="wholeContainer">
    <v-card class="card" elevation="2">
      <h2 class="cardTitle">
        ログイン
      </h2>
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
    </v-card>
  </div>
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
        const payload = {"message": "入力した値が不正です。", "color": "red lighten-2"}
        this.$store.dispatch('util/showAlert', payload, {root: true})
      }
    }
  }
}
</script>
<style>
.wholeContainer {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}
.card {
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  margin-top: 30px;
  text-align: center;
}
.cardTitle {
  margin-bottom: 20px;
}
</style>
