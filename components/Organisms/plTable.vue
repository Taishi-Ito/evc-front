<template>
<v-col cols="12" >
  <v-card class="wraper">
    <v-row no-gutters class="selectBoxes">
      <v-col class="d-flex" cols="6" sm="2">
        <v-select :items="units" item-text="text" item-value="id" label="単位" outlined @change="updatePl('unit', $event)" v-model="selectedUnit" dense></v-select>
      </v-col>
      <v-col class="d-flex fixes" cols="6" sm="2">
        <v-select :items="fixes" item-text="text" item-value="id" label="小数点以下" outlined @change="updatePl('fixed', $event)" v-model="selectedFixed" dense></v-select>
      </v-col>
    </v-row>
    <div class="table">
      <div class="items">
        <tr><td>年</td></tr>
        <tr class="sum"><td>売り上げ</td></tr>
        <tr><td>客数</td></tr>
        <tr><td>客単価</td></tr>
        <tr><td>売上原価</td></tr>
        <tr><td>原価率（%）</td></tr>
        <tr class="sum"><td>粗利益</td></tr>
        <tr><td>販管費</td></tr>
        <tr><td>人件費</td></tr>
        <tr><td>減価償却</td></tr>
        <tr><td>経費その他</td></tr>
        <tr class="sum"><td>営業利益</td></tr>
        <tr><td>営業外収益</td></tr>
        <tr><td>営業外費用</td></tr>
        <tr><td>支払利息</td></tr>
        <tr><td>利率（%）</td></tr>
        <tr><td>その他</td></tr>
        <tr class="sum"><td>税引前利益</td></tr>
        <tr><td>税金</td></tr>
        <tr><td>税率（%）</td></tr>
        <tr class="sum"><td>当期純利益</td></tr>
        <tr><td class="last">オプション</td></tr>
      </div>
      <div v-for="items in data">
        <MoleculesPlRecord
          :items="items"
          :unit="plUnitNumber"
          :fixed="selectedFixed"
        ></MoleculesPlRecord>
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
      return this.$store.getters["tables/pl/plRecords"]
    },
    selectedUnit: {
      get() {
        return this.$store.getters["tables/pl/plUnit"]
      },
      set(val) {
        return val
      }
    },
    selectedFixed: {
      get() {
        return this.$store.getters["tables/pl/plFixed"]
      },
      set(val) {
        return val
      }
    },
    plUnitNumber() {
      return this.$store.getters["tables/pl/plUnitNumber"]
    },
    plUnitTitle() {
      return this.$store.getters["tables/pl/plUnitTitle"]
    },
    plId() {
      return this.$store.getters["tables/pl/plId"]
    }
  },
  methods: {
    updatePl(target, event) {
      let params = {}
      if (target == "unit") {
        params = {"unit": event, "fixed": this.selectedFixed, "id": this.plId}
      } else if (target == "fixed") {
        params = {"unit": this.selectedUnit, "fixed": event, "id": this.plId}
      }
      this.$store.dispatch('tables/pl/updatePl', params)
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
.sum {
  background-color: #B3E5FC;
}
</style>
