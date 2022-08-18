<template>
  <div>
    <validation-observer ref="emailObserver" v-slot="{ invalid }">
      <div>
        現在のメールアドレス
        {{ email }}
      </div>
      <form @submit.prevent="updateEmail">
        <MoleculesInputForm
          :formContent="newEmail"
          :formLabel="'メールアドレス'"
          :formId="'email'"
          :formName="'email'"
          :formRules="'required|email'"
          :formType="'text'"
          @update="newEmail=$event"
        ></MoleculesInputForm>
        <MoleculesInputForm
          :formContent="passwordForEmailUpdate"
          :formLabel="'パスワード'"
          :formId="'password'"
          :formName="'password'"
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
    <validation-observer ref="passwordObserver" v-slot="{ invalid }">
      <div>
        新しいパスワード
      </div>
      <form @submit.prevent="updatePassword">
        <MoleculesInputForm
          :formContent="currentPassword"
          :formLabel="'パスワード'"
          :formId="'currentPassword'"
          :formName="'currentPassword'"
          :formRules="'required|min:6'"
          :formType="'password'"
          @update="currentPassword=$event"
        ></MoleculesInputForm>
        <MoleculesInputForm
          :formContent="newPassword"
          :formLabel="'新しいパスワード'"
          :formId="'newPassword'"
          :formName="'newPassword'"
          :formRules="'required|min:6'"
          :formType="'password'"
          @update="newPassword=$event"
        ></MoleculesInputForm>
        <MoleculesInputForm
          :formContent="newPasswordConfirmation"
          :formLabel="'新しいパスワード(確認)'"
          :formId="'newPasswordConfirmation'"
          :formName="'newPasswordConfirmation(確認)'"
          :formRules="'required|confirmed:newPassword'"
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
    <AtomsSendBtn
      :btnId="'deleteUser'"
      :btnTitle="'ユーザー削除'"
      :btnColor="'warning'"
      :btnClickEvent="'deleteUser'"
      @deleteUser="deleteUser"
    ></AtomsSendBtn>
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
    },
    deleteUser() {
      this.$store.dispatch('auth/deleteUser')
    }
  },
  mounted() {
  }
}
</script>
