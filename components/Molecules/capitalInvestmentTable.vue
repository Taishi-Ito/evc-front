<template>
<v-col cols="12" >
  <v-card class="wraper">
    <h4>単位:{{unitTitle}}</h4>
    <v-col class="d-flex" cols="6" sm="2">
      <v-select :items="units" item-text="text" item-value="id" label="単位" outlined @change="updateCapitalInvestment('unit', $event)" v-model="selectedUnit" dense></v-select>
    </v-col>
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
  data(){
    return {
      units: [{"id": "yen", "text": "円"}, {"id":"thousand", "text":"千円"}, {"id":"million", "text":"百万円"}, {"id":"hundred_million", "text":"億円"}]
    }
  },
  computed: {
    data() {
      return this.$store.getters["dashboard/capitalInvestmentRecords"]
    },
    selectedUnit: {
      get() {
        return this.$store.getters["dashboard/capitalInvestmentUnit"]
      },
      set(val) {
        return val
      }
    },
    fixed() {
      return this.$store.getters["dashboard/capitalInvestmentFixed"]
    },
    unitNumber() {
      return this.$store.getters["dashboard/unitNumber"]
    },
    unitTitle() {
      return this.$store.getters["dashboard/unitTitle"]
    },
    capitalInvestmentId() {
      return this.$store.getters["dashboard/capitalInvestmentId"]
    }
  },
  methods: {
    updateCapitalInvestment(target, event) {
      let params = {}
      if (target == "unit") {
        params = {"unit": event, "fixed": this.fixed, "id": this.capitalInvestmentId}
      } else if (target == "fixed") {
        params = {"unit": this.unit, "fixed": payload["fixed"], "id": this.capitalInvestmentId}
      }
      this.$store.dispatch('dashboard/updateCapitalInvestment', params)
    }
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
