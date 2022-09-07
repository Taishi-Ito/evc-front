<template>
  <div>
    <h3>{{ id }}</h3>
    <div>
      <h2>設備投資</h2>
      <MoleculesCapitalInvestmentTable></MoleculesCapitalInvestmentTable>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      id: this.$route.params.id
    }
  },
  computed: {
  },
  methods: {
  },
  created() {
    this.$store.dispatch('dashboard/getCapitalInvestment', this.$route.params.id)
  }
}
</script>
