<template>
  <div class="wholeContainer">
    <v-card light class="card" elevation="2">
      <h2 class="cardTitle">
        メールアドレス変更
      </h2>
      <validation-observer class="inner" ref="emailObserver" v-slot="{ invalid }">
        <div class="currenEmail">
          <p class="currentEmailLabel">現在のメールアドレス</p>
          <p class="currentEmail">{{ email }}</p>
        </div>
        <form @submit.prevent="updateEmail">
          <MoleculesInputForm
            :formContent="newEmail"
            :formLabel="'メールアドレス'"
            :formId="'email'"
            :formName="'メールアドレス'"
            :formRules="'required|email'"
            :formType="'text'"
            @update="newEmail=$event"
          ></MoleculesInputForm>
          <MoleculesInputForm
            :formContent="passwordForEmailUpdate"
            :formLabel="'パスワード'"
            :formId="'password'"
            :formName="'パスワード'"
            :formRules="'required|min:6'"
            :formType="'password'"
            @update="passwordForEmailUpdate=$event"
          ></MoleculesInputForm>
          <AtomsSendBtn
            :btnId="'updateEmail'"
            :btnTitle="'送信'"
            :btnType="'submit'"
            :btnDisabled="invalid"
            :btnColor="'primary'"
          ></AtomsSendBtn>
        </form>
      </validation-observer>
    </v-card>

    <v-card light class="card" elevation="2">
      <h2 class="cardTitle">
        パスワード変更
      </h2>
      <validation-observer class="inner" ref="passwordObserver" v-slot="{ invalid }">
        <form @submit.prevent="updatePassword">
          <MoleculesInputForm
            :formContent="currentPassword"
            :formLabel="'パスワード'"
            :formId="'currentPassword'"
            :formName="'パスワード'"
            :formRules="'required|min:6'"
            :formType="'password'"
            @update="currentPassword=$event"
          ></MoleculesInputForm>
          <MoleculesInputForm
            :formContent="newPassword"
            :formLabel="'新しいパスワード'"
            :formId="'newPassword'"
            :formName="'新しいパスワード'"
            :formRules="'required|min:6'"
            :formType="'password'"
            @update="newPassword=$event"
          ></MoleculesInputForm>
          <MoleculesInputForm
            :formContent="newPasswordConfirmation"
            :formLabel="'新しいパスワード(確認)'"
            :formId="'newPasswordConfirmation'"
            :formName="'新しいパスワード(確認)'"
            :formRules="'required|confirmed:新しいパスワード'"
            :formType="'password'"
            @update="newPasswordConfirmation=$event"
          ></MoleculesInputForm>
          <AtomsSendBtn
            :btnId="'updatePassword'"
            :btnTitle="'送信'"
            :btnType="'submit'"
            :btnDisabled="invalid"
            :btnColor="'primary'"
          ></AtomsSendBtn>
        </form>
      </validation-observer>
    </v-card>
    <v-card light class="card" elevation="2">
      <h2 class="cardTitle">
        ユーザー削除
      </h2>
      <AtomsSendBtn
        :btnId="'deleteUser'"
        :btnTitle="'ユーザー削除'"
        :btnColor="'warning'"
        :btnClickEvent="'deleteUser'"
        @deleteUser="deleteUser"
      ></AtomsSendBtn>
    </v-card>
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
          const payload = {"message": "入力した値が不正です。", "color": "red lighten-2"}
          this.$store.dispatch('util/showAlert', payload, {root: true})
        }
      },
      async updatePassword() {
        const isValid = await this.$refs.passwordObserver.validate()
        if (isValid) {
          const payload = {"currentPassword": this.currentPassword, "newPassword": this.newPassword , "newPasswordConfirmation": this.newPasswordConfirmation}
          this.$store.dispatch('auth/updatePassword', payload)
        } else {
          const payload = {"message": "入力した値が不正です。", "color": "red lighten-2"}
          this.$store.dispatch('util/showAlert', payload, {root: true})
        }
      },
      deleteUser() {
        this.$store.dispatch('auth/deleteUser')
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
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
  .inner {
    width: 80%;
    margin: 0 auto;
    max-width: 500px;
  }
  .currenEmail {
    width: 80%;
    margin: 0 auto;
  }
  .currentEmailLabel {
    text-align: left !important;
    width: 100%;
    margin-bottom: 0 !important;
  }
  .currentEmail {
    text-align: left !important;
  }
  .cardTitle {
    margin-bottom: 20px;
  }
</style>
