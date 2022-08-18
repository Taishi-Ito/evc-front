<template>
  <div>
    <v-toolbar elevation="4">
      <AtomsSignoutBtn />
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
    userName(){
      return this.$store.getters["auth/name"]
    }
  }
}
</script>
