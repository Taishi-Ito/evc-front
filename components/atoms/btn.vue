<template>
  <div>
    <v-btn depressed color="primary" @click="$store.dispatch('auth/updateMessageAction', 'update!!!')">{{ btnTitle }}</v-btn>
  </div>
</template>

<script>
export default {
  data(){
    return {
      btnTitle: "axios通信確認"
    }
  }
}
</script>
