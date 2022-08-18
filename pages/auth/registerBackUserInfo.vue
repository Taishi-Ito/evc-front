<template>
  <div>
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
    }
  }
  }
</script>
