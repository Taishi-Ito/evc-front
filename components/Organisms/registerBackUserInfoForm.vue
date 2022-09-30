<template>
  <div>
    <div class="wholeContainer">
      <v-card class="card" elevation="2">
        <h2 class="cardTitle">
          ユーザー登録
        </h2>
        <AtomsTextField
          :textFieldContent="name"
          :textFieldLabel="'名前'"
          @update="name=$event"
        ></AtomsTextField>
        <AtomsSendBtn
          :btnId="'registerBackUserInfo'"
          :btnTitle="'名前を登録'"
          :btnColor="'primary'"
          :btnClickEvent="'registerBackUserInfo'"
          @registerBackUserInfo="registerBackUserInfo"
        ></AtomsSendBtn>
      </v-card>
      <div class="sign-out">
        <AtomsSendBtn
          :btnId="'signOut'"
          :btnTitle="'ログアウト'"
          :btnColor="'accent'"
          :btnClickEvent="'signOut'"
          @signOut="signOut"
        ></AtomsSendBtn>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: "",
      }
    },
    methods: {
      registerBackUserInfo() {
        const payload = {"name": this.name}
        this.$store.dispatch('auth/registerBackUserInfo', payload)
      },
      signOut() {
        this.$store.dispatch('auth/signOut')
      }
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
  .cardTitle {
    margin-bottom: 20px;
  }
  .sign-out {
    text-align: center;
  }
</style>
