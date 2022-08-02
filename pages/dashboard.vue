<template>
  <div>
    {{ message }}
    <AtomsBtn />
    <v-text-field v-model="workgroup"></v-text-field>
    <v-btn @click="createWorkGroup()">ワークグループ作成</v-btn>
    {{ workGroupLists }}
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
    },
    workGroupLists(){
      return this.$store.getters["dashboard/workGroupLists"]
    }
  },
  methods: {
    createWorkGroup(){
      this.$store.dispatch('dashboard/createWorkGroup', this.workgroup)
      this.workgroup = ""
    }
  },
  mounted() {
    this.$store.dispatch('dashboard/getWorkGroups')
  }
}
</script>
