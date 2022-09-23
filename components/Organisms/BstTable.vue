<template>
<v-col cols="12" >
  <v-card class="wraper">
    <v-row no-gutters class="selectBoxes">
      <v-col class="d-flex" cols="6" sm="2">
        <v-select :items="units" item-text="text" item-value="id" label="単位" outlined @change="updateBst('unit', $event)" v-model="selectedUnit" dense></v-select>
      </v-col>
      <v-col class="d-flex fixes" cols="6" sm="2">
        <v-select :items="fixes" item-text="text" item-value="id" label="小数点以下" outlined @change="updateBst('fixed', $event)" v-model="selectedFixed" dense></v-select>
      </v-col>
    </v-row>
    <div class="table">
      <div class="items">
        <tr><th><br></th></tr>
        <tr class="auto"><td>資産</td></tr>
        <tr class="auto"><td>流動資産</td></tr>
        <tr><td>現金</td></tr>
        <tr><td>売掛金</td></tr>
        <tr><td>売上比</td></tr>
        <tr><td>商品その他</td></tr>
        <tr><td>売上比</td></tr>
        <tr class="auto"><td>固定資産</td></tr>
        <tr><td>土地・建物</td></tr>
        <tr><td>投資その他</td></tr>
        <tr class="auto"><td>負債</td></tr>
        <tr class="auto"><td>流動負債</td></tr>
        <tr><td>買掛金</td></tr>
        <tr><td>原価比</td></tr>
        <tr><td>その他</td></tr>
        <tr class="auto"><td>固定負債</td></tr>
        <tr><td>長期借入金</td></tr>
        <tr><td>その他</td></tr>
        <tr class="auto"><td>株主資本</td></tr>
        <tr><td>資本金</td></tr>
        <tr><td>利益余剰金</td></tr>
        <tr><td class="last">オプション</td></tr>
      </div>
      <div v-for="items in data">
        <MoleculesBstRecord
          :items="items"
          :unit="bstUnitNumber"
          :fixed="selectedFixed"
        ></MoleculesBstRecord>
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
      return this.$store.getters["tables/bst/bstRecords"]
    },
    selectedUnit: {
      get() {
        return this.$store.getters["tables/bst/bstUnit"]
      },
      set(val) {
        return val
      }
    },
    selectedFixed: {
      get() {
        return this.$store.getters["tables/bst/bstFixed"]
      },
      set(val) {
        return val
      }
    },
    bstUnitNumber() {
      return this.$store.getters["tables/bst/bstUnitNumber"]
    },
    bstUnitTitle() {
      return this.$store.getters["tables/bst/bstUnitTitle"]
    },
    bstId() {
      return this.$store.getters["tables/bst/bstId"]
    }
  },
  methods: {
    updateBst(target, event) {
      let params = {}
      if (target == "unit") {
        params = {"unit": event, "fixed": this.selectedFixed, "id": this.bstId}
      } else if (target == "fixed") {
        params = {"unit": this.selectedUnit, "fixed": event, "id": this.bstId}
      }
      this.$store.dispatch('tables/bst/updateBst', params)
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
