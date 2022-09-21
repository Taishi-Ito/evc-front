<template>
  <div class="lists">
    <tr><th :class="yearForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="yearForm=true" @blur="updateList('Years')" v-model="year"></th></tr>
    <tr class="auto"><td>{{ salesCf }}</td></tr>
    <tr><td>{{ netIncome }}</td></tr>
    <tr><td>{{ depreciation }}</td></tr>
    <tr><td>{{ accountsReceivableChange }}</td></tr>
    <tr><td>{{ merchandiseOtherChange }}</td></tr>
    <tr><td>{{ accountsPayableChange }}</td></tr>
    <tr class="auto"><td>{{ investmentCf }}</td></tr>
    <tr><td>{{ facilities }}</td></tr>
    <tr class="auto"><td>{{ financesCf }}</td></tr>
    <tr><td>{{ debtChange }}</td></tr>
    <tr><td>{{ dividend }}</td></tr>
    <tr><td :class="payoutRatioForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="payoutRatioForm=true" @blur="updateList('payoutRatio')" v-model="payoutRatio"></td></tr>
    <tr><td>{{ surplusChange }}</td></tr>
    <tr class="auto"><td>{{ cfSum }}</td></tr>
    <tr><td class="inputForm last"><v-icon small @click="addNewRecord('left')">mdi-plus-circle</v-icon><v-icon small @click="deleteRecord()">mdi-trash-can</v-icon><v-icon small @click="addNewRecord('right')">mdi-plus-circle</v-icon></td></tr>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true
    },
    unit: {
      type: Number,
      required: true
    },
    fixed: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      content: "",
      yearForm: false,
      payoutRatioForm: false
    }
  },
  computed: {
    sameCapitalInvestmentRecord() {
      const that = this
      const capitalInvestmentRecords = this.$store.getters["tables/capitalInvestment/capitalInvestmentRecords"]
      let sameCapitalInvestmentRecord = {}
      capitalInvestmentRecords.some(function(value, index){
        if (value["year"] == that.items.year) {
          sameCapitalInvestmentRecord = value
          return true
        } else {
          sameCapitalInvestmentRecord = null
        }
      });
      return sameCapitalInvestmentRecord
    },
    sameBstRecord() {
      const that = this
      const bstRecords = this.$store.getters["tables/bst/bstRecords"]
      let sameBstRecord = {}
      bstRecords.some(function(value, index){
        if (value["year"] == that.items.year) {
          sameBstRecord =  value
          return true
        } else {
          sameBstRecord = null
        }
      });
      return sameBstRecord
    },
    lastBstRecord() {
      const that = this
      const bstRecords = this.$store.getters["tables/bst/bstRecords"]
      let lastBstRecord = {}
      bstRecords.some(function(value, index){
        if (value["year"] == that.items.year - 1) {
          lastBstRecord =  value
          return true
        } else {
          lastBstRecord = null
        }
      });
      return lastBstRecord
    },
    year: {
      get() {
        return this.items.year
      },
      set(val) {
        this.content = val
      }
    },
    salesCf() {
      return ((Math.trunc(this.netIncome) + Math.trunc(this.depreciation) + Math.trunc(this.accountsReceivableChange) + Math.trunc(this.merchandiseOtherChange) + Math.trunc(this.accountsPayableChange))/this.unit).toFixed(this.fixed)
    },
    netIncome() {
      return (this.$store.getters["tables/pl/netIncome"]/this.unit).toFixed(this.fixed)
    },
    depreciation() {
      return this.sameCapitalInvestmentRecord ? ((Math.trunc(this.sameCapitalInvestmentRecord["d_existing_facilities"]) + Math.trunc(this.sameCapitalInvestmentRecord["d_existing_facilities"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
    },
    accountsReceivableChange() {
      return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["accounts_receivable"]) - Math.trunc(this.lastBstRecord["accounts_receivable"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
    },
    merchandiseOtherChange() {
      return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["merchandise_other"]) - Math.trunc(this.lastBstRecord["merchandise_other"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
    },
    accountsPayableChange() {
      return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["accounts_payable"]) - Math.trunc(this.lastBstRecord["accounts_payable"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
    },
    investmentCf() {
      return this.facilities
    },
    facilities() {
      return this.sameCapitalInvestmentRecord ? ((Math.trunc(this.sameCapitalInvestmentRecord["existing_facilities"]) + Math.trunc(this.sameCapitalInvestmentRecord["new_facilities"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
    },
    financesCf() {
      return ((Math.trunc(this.debtChange) + Math.trunc(this.dividend) + Math.trunc(this.surplusChange))/this.unit).toFixed(this.fixed)
    },
    debtChange() {
      return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["long_term_debt"]) - Math.trunc(this.lastBstRecord["long_term_debt"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
    },
    dividend() {
      return this.payoutRatio> 0 ? ((this.netIncome * (this.payoutRatio/100))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
    },
    payoutRatio: {
      get() {
        return this.items.payout_ratio
      },
      set(val) {
        this.content = val
      }
    },
    surplusChange() {
      return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["capital"]) - Math.trunc(this.lastBstRecord["capital"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
    },
    cfSum() {
      return ((Math.trunc(this.salesCf) + Math.trunc(this.investmentCf) + Math.trunc(this.financesCf))/this.unit).toFixed(this.fixed)
    }

  },
  watch: {
    sales: function(newValue, oldValue) {
      this.content = this.accountsReceivable
      this.updateList("accountsReceivable")
      this.content = this.merchandiseOther
      this.updateList("merchandiseOther")
    },
    samePlRecord: function(newValue, oldValue) {
      this.content = this.accountsPayable
      this.updateList("accountsPayable")
    },
    cfSum: function(newValue, oldValue) {
      this.$store.commit('tables/cf/updateCfSum', newValue)
    }
  },
  methods: {
    updateList(payload) {
      let rows = []
      if (payload == "Years") {
        rows.push({"row": "year", "content": this.content})
        this.yearForm = false
      } else if (payload == "payoutRatio") {
        rows.push({"row": "payout_ratio", "content": this.content})
        this.payoutRatioForm = false
      }
      payload = {"record_id": this.items.record_id, "rows": rows}
      if (this.content) {
        this.$store.dispatch('tables/cf/updateCfRecord', payload)
      }
    },
    addNewRecord(payload) {
      const params = {"type": payload, "year": this.year, "record_id": this.items.record_id, "cf_id": this.items.cf}
      this.$store.dispatch('tables/cf/addNewCfRecord', params)
    },
    deleteRecord() {
      const params = {"record_id": this.items.record_id, "cf_id": this.items.cf}
      this.$store.dispatch('tables/cf/deleteCfRecord', params)
    }
  }
}
</script>
<style scoped>
.lists {
  table-layout: fixed
}
th,td {
  padding: 5px 10px 5px 10px;
  border-right: 2px #BDBDBD solid;
  border-top: 2px #BDBDBD solid;
  height: 40px !important;
  min-width: 100px;
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
.inputTdOn {
  padding: 0px;
  background-color: #FFF9C4;
}
.inputTdOff {
  padding: 0px;
}
.inputForm {
  height: 100%;
  width: 100%;
}
.auto {
  background-color: #B3E5FC;
}
</style>
