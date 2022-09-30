<template>
  <div class="text-center">
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<style scoped>
  .v-progress-circular {
    margin: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
  }
</style>
