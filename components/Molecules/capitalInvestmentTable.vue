<template>
<v-col cols="12" >
  <v-card class="wraper">
    <h4>単位:{{unitTitle}}</h4>
    <div class="table">
      <div class="items">
        <tr><th><br></th></tr>
        <tr><td>設備投資</td></tr>
        <tr><td>既存の設備投資</td></tr>
        <tr><td>新規の設備投資</td></tr>
        <tr><td>減価償却</td></tr>
        <tr><td>既存の設備</td></tr>
        <tr><td>新規の設備</td></tr>
        <tr><td>償却年数（年）</td></tr>
        <tr><td class="last">オプション</td></tr>
      </div>
      <div v-for="items in data">
        <AtomsCapitalInvestmentLine
          :items="items"
          :unit="unitNumber"
          :fixed="fixed"
        ></AtomsCapitalInvestmentLine>
      </div>
    </div>
  </v-card>
</v-col>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.getters["dashboard/capitalInvestmentRecords"]
    },
    unit() {
      return this.$store.getters["dashboard/unit"]
    },
    fixed() {
      return this.$store.getters["dashboard/fixed"]
    },
    unitNumber() {
      if (this.unit == "yen") {
        return 1
      } else if (this.unit == "thousand") {
        return 1000
      } else if (this.unit == "million") {
        return 1000000
      }
    },
    unitTitle() {
      if (this.unit == "yen") {
        return "円"
      } else if (this.unit == "thousand") {
        return "千円"
      } else if (this.unit == "million") {
        return "百万円"
      }
    }
  },
  methods: {
  },
}
</script>
<style scoped>
.table {
  display: flex;
  overflow-x: auto;
  table-layout: fixed
}
th,td {
  padding: 5px 10px 5px 10px;
  border-right: 2px #BDBDBD solid;
  border-top: 2px #BDBDBD solid;
  height: 40px;
  width: 150px;
}
.items th {
  border-right: 2px #BDBDBD solid;
  border-left: 2px #BDBDBD solid;
  border-top: 2px #BDBDBD solid;
}
.items td {
  border-right: 2px #BDBDBD solid;
  border-left: 2px #BDBDBD solid;
  border-top: 2px #BDBDBD solid;
}
.last {
  border-bottom: 2px #BDBDBD solid;
}
.wraper {
  width: 100% !important;
}
</style>
