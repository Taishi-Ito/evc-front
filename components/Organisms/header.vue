<template>
  <div>
    <v-toolbar elevation="4">
      <AtomsSignoutBtn />
      {{ userId }}
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
    }
  }
}
</script>
