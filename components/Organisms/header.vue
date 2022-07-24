<template>
  <div>
    <v-toolbar elevation="4">
      <AtomsSignoutBtn />
      {{ userId }}
      {{ userName }}
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
