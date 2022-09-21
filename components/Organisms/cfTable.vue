<template>
<v-col cols="12" >
  <v-card class="wraper">
    <v-row no-gutters class="selectBoxes">
      <v-col class="d-flex" cols="6" sm="2">
        <v-select :items="units" item-text="text" item-value="id" label="単位" outlined @change="updateCf('unit', $event)" v-model="selectedUnit" dense></v-select>
      </v-col>
      <v-col class="d-flex fixes" cols="6" sm="2">
        <v-select :items="fixes" item-text="text" item-value="id" label="小数点以下" outlined @change="updateCf('fixed', $event)" v-model="selectedFixed" dense></v-select>
      </v-col>
    </v-row>
    <div class="table">
      <div class="items">
        <tr><th><br></th></tr>
        <tr class="auto"><td>営業CF</td></tr>
        <tr><td>当期純利益</td></tr>
        <tr><td>減価償却</td></tr>
        <tr><td>売掛金の増減</td></tr>
        <tr><td>商品その他の増減</td></tr>
        <tr><td>買掛金の増減</td></tr>
        <tr class="auto"><td>投資CF</td></tr>
        <tr><td>設備投資</td></tr>
        <tr class="auto"><td>財務CF</td></tr>
        <tr><td>借入金の増減</td></tr>
        <tr><td>配当</td></tr>
        <tr><td>配当性向</td></tr>
        <tr><td>資本金の増減</td></tr>
        <tr class="auto"><td>CF合計</td></tr>
        <tr><td class="last">オプション</td></tr>
      </div>
      <div v-for="items in data">
        <MoleculesCfRecord
          :items="items"
          :unit="cfUnitNumber"
          :fixed="selectedFixed"
        ></MoleculesCfRecord>
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
      return this.$store.getters["tables/cf/cfRecords"]
    },
    selectedUnit: {
      get() {
        return this.$store.getters["tables/cf/cfUnit"]
      },
      set(val) {
        return val
      }
    },
    selectedFixed: {
      get() {
        return this.$store.getters["tables/cf/cfFixed"]
      },
      set(val) {
        return val
      }
    },
    cfUnitNumber() {
      return this.$store.getters["tables/cf/cfUnitNumber"]
    },
    cfUnitTitle() {
      return this.$store.getters["tables/cf/cfUnitTitle"]
    },
    cfId() {
      return this.$store.getters["tables/cf/cfId"]
    }
  },
  methods: {
    updateCf(target, event) {
      let params = {}
      if (target == "unit") {
        params = {"unit": event, "fixed": this.selectedFixed, "id": this.cfId}
      } else if (target == "fixed") {
        params = {"unit": this.selectedUnit, "fixed": event, "id": this.cfId}
      }
      this.$store.dispatch('tables/cf/updateCf', params)
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
.auto {
  background-color: #B3E5FC;
}
</style>
