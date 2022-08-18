<template>
  <div class="wholeContainer">
    <v-card class="card" elevation="2">
      <h2 class="cardTitle">
        ユーザー登録
      </h2>
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
        this.$store.dispatch('auth/signUp', payload)
      } else {
        alert("バリデーションエラー")
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
