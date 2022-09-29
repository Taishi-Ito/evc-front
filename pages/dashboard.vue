<template>
  <div>
    <OrganismsSearchProjects></OrganismsSearchProjects>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      }
    },
    computed: {
    },
    methods: {
      createWorkGroup(){
        this.$store.dispatch('dashboard/createWorkGroup', this.workgroup)
        this.workgroup = ""
      }
    }
  }
</script>
