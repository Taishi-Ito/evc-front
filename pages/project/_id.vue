<template>
  <div>
    <h3>プロジェクトID{{ projectId }}</h3>
    <div>
      <h2>設備投資</h2>
      <OrganismsCapitalInvestmentTable></OrganismsCapitalInvestmentTable>
    </div>
    <div>
      <h2>P/L</h2>
      <OrganismsPlTable></OrganismsPlTable>
    </div>
    <div>
      <h2>B/S</h2>
      <OrganismsBstTable></OrganismsBstTable>
    </div>
    <div>
      <h2>CF</h2>
      <OrganismsCfTable></OrganismsCfTable>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
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
      this.$store.dispatch('tables/bst/getBst', this.$route.params.id)
      this.$store.dispatch('tables/cf/getCf', this.$route.params.id)
    }
  }
</script>
