<template>
  <div>
    <h3>プロジェクトID{{ projectId }}</h3>
    <div>
      <h2>設備投資</h2>
      <MoleculesCapitalInvestmentTable></MoleculesCapitalInvestmentTable>
    </div>
    <div>
      <h2>P/L</h2>
      <MoleculesPlTable></MoleculesPlTable>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      projectId: this.$route.params.id
    }
  },
  computed: {
  },
  methods: {
  },
  created() {
    this.$store.dispatch('tables/capitalInvestment/getCapitalInvestment', this.$route.params.id)
    this.$store.dispatch('tables/pl/getPl', this.$route.params.id)
  }
}
</script>
