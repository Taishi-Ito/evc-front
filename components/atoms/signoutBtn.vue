<template>
  <div>
    <v-btn elevation="2" @click="$store.dispatch('auth/signOut')">ログアウト</v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"]
    },
    userId() {
      return this.$store.getters["auth/userId"]
    },
    email() {
      return this.$store.getters["auth/email"]
    }
  }
}
</script>
