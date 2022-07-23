<template>
  <div>
    {{ message }}
    <AtomsBtn />
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  computed: {
    message(){
      return this.$store.getters["fireauth/message"]
    }
  }
}
</script>
