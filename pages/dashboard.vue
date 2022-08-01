<template>
  <div>
    {{ message }}
    <AtomsBtn />
    <v-text-field v-model="workgroup"></v-text-field>
    <v-btn @click="createWorkGroup()">ワークグループ作成</v-btn>
  </div>
</template>

<script>
export default {
  data(){
    return {
      workgroup: ""
    }
  },
  computed: {
    message(){
      return this.$store.getters["auth/message"]
    }
  },
  methods: {
    createWorkGroup(){
      this.$store.dispatch('dashboard/createWorkGroup', this.workgroup)
    }
  }
}
</script>
