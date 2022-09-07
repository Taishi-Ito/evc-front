<template>
  <div>
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
  },
  mounted() {
    this.$store.dispatch('dashboard/getWorkGroupProjectLists')
  }
}
</script>
