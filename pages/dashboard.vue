<template>
  <div>
    <AtomsTextField
      :textFieldContent="workgroup"
      @update="workgroup=$event"
    ></AtomsTextField>
    <AtomsSendBtn
      :btnId="'createWorkGroup'"
      :btnTitle="'ワークグループ作成'"
      :btnColor="'primary'"
      :btnClickEvent="'createWorkGroup'"
      @createWorkGroup="createWorkGroup"
    ></AtomsSendBtn>
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
