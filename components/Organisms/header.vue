<template>
  <div>
    <v-toolbar elevation="4">
      <AtomsSignoutBtn />
      {{ userId }}
      {{ userName }}
      <v-btn @click="$store.dispatch('auth/deleteUser')">ユーザー削除</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    userId(){
      return this.$store.getters["auth/userId"]
    },
    userName(){
      return this.$store.getters["auth/name"]
    }
  }
}
</script>
