<template>
<v-col cols="12" >
  <v-card class="wraper">
    <v-row no-gutters class="selectBoxes">
      <v-col class="d-flex" cols="6" sm="2">
        <v-select :items="units" item-text="text" item-value="id" label="単位" outlined @change="updateCapitalInvestment('unit', $event)" v-model="selectedUnit" dense></v-select>
      </v-col>
      <v-col class="d-flex fixes" cols="6" sm="2">
        <v-select :items="fixes" item-text="text" item-value="id" label="小数点以下" outlined @change="updateCapitalInvestment('fixed', $event)" v-model="selectedFixed" dense></v-select>
      </v-col>
    </v-row>
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
          :unit="capitalInvestmentUnitNumber"
          :fixed="selectedFixed"
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
      units: [{"id": "yen", "text": "円"}, {"id":"thousand", "text":"千円"}, {"id":"million", "text":"百万円"}, {"id":"hundred_million", "text":"億円"}],
      fixes: [{"id": 0, "text": "切り捨て"}, {"id": 1, "text": "第一位"}, {"id": 2, "text": "第二位"}, {"id": 3, "text": "第三位"}]
    }
  },
  computed: {
    data() {
      return this.$store.getters["tables/capitalInvestment/capitalInvestmentRecords"]
    },
    selectedUnit: {
      get() {
        return this.$store.getters["tables/capitalInvestment/capitalInvestmentUnit"]
      },
      set(val) {
        return val
      }
    },
    selectedFixed: {
      get() {
        return this.$store.getters["tables/capitalInvestment/capitalInvestmentFixed"]
      },
      set(val) {
        return val
      }
    },
    capitalInvestmentUnitNumber() {
      return this.$store.getters["tables/capitalInvestment/capitalInvestmentUnitNumber"]
    },
    capitalInvestmentUnitTitle() {
      return this.$store.getters["tables/capitalInvestment/capitalInvestmentUnitTitle"]
    },
    capitalInvestmentId() {
      return this.$store.getters["tables/capitalInvestment/capitalInvestmentId"]
    }
  },
  methods: {
    updateCapitalInvestment(target, event) {
      let params = {}
      if (target == "unit") {
        params = {"unit": event, "fixed": this.selectedFixed, "id": this.capitalInvestmentId}
      } else if (target == "fixed") {
        params = {"unit": this.selectedUnit, "fixed": event, "id": this.capitalInvestmentId}
      }
      this.$store.dispatch('tables/capitalInvestment/updateCapitalInvestment', params)
    }
  },
}
</script>
<style scoped>
.selectBoxes {
  padding: 10px 0px 0px 10px;
}
.table {
  display: flex;
  overflow-x: auto;
  table-layout: fixed;
  padding: 10px 10px 20px 10px;
}
th,td {
  padding: 5px 10px 5px 10px;
  border-right: 2px #BDBDBD solid;
  border-top: 2px #BDBDBD solid;
  height: 40px;
  min-width: 150px;
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
.fixes {
  margin-left: 5px;
}
</style>
