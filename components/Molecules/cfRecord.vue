<template>
  <div class="lists">
    <tr><td :class="yearForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="yearForm=true" @blur="updateList('Years')" v-model="year"></td></tr>
    <tr class="sum"><td>{{ salesCf }}</td></tr>
    <tr class="auto"><td>{{ netIncome }}</td></tr>
    <tr class="auto"><td>{{ depreciation }}</td></tr>
    <tr class="auto"><td>{{ accountsReceivableChange }}</td></tr>
    <tr class="auto"><td>{{ merchandiseOtherChange }}</td></tr>
    <tr class="auto"><td>{{ accountsPayableChange }}</td></tr>
    <tr class="sum"><td>{{ investmentCf }}</td></tr>
    <tr class="auto"><td>{{ facilities }}</td></tr>
    <tr class="sum"><td>{{ financesCf }}</td></tr>
    <tr class="auto"><td>{{ debtChange }}</td></tr>
    <tr><td :class="dividendForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="dividendForm=true" @blur="updateList('dividend')" v-model="dividend"></td></tr>
    <tr><td :class="payoutRatioForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="payoutRatioForm=true" @blur="updateList('payoutRatio')" v-model="payoutRatio"></td></tr>
    <tr class="auto"><td>{{ surplusChange }}</td></tr>
    <tr class="sum"><td>{{ cfSum }}</td></tr>
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
    data() {
      return {
        content: "",
        yearForm: false,
        payoutRatioForm: false,
        dividendForm: false
      }
    },
    computed: {
      sameCapitalInvestmentRecord() {
        const that = this
        const capitalInvestmentRecords = this.$store.getters["tables/capitalInvestment/capitalInvestmentRecords"]
        let sameCapitalInvestmentRecord = {}
        capitalInvestmentRecords.some(function(value, index) {
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
        bstRecords.some(function(value, index) {
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
        bstRecords.some(function(value, index) {
          if (value["year"] == that.items.year-1) {
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
        return ((Math.trunc(this.netIncome)+Math.trunc(this.depreciation)+Math.trunc(this.accountsReceivableChange)+Math.trunc(this.merchandiseOtherChange)+Math.trunc(this.accountsPayableChange))/this.unit).toFixed(this.fixed)
      },
      netIncome() {
        const netIncomes = this.$store.getters["tables/pl/netIncomes"]
        return netIncomes[this.items.year] ? ((netIncomes[String(this.items.year)])/this.unit).toFixed(this.fixed) : 0.000
      },
      lastNetIncome() {
        const netIncomes = this.$store.getters["tables/pl/netIncomes"]
        return netIncomes[this.items.year-1] ? ((netIncomes[String(this.items.year-1)])/this.unit).toFixed(this.fixed) : null
      },
      depreciation() {
        return this.sameCapitalInvestmentRecord ? ((Math.trunc(this.sameCapitalInvestmentRecord["d_existing_facilities"])+Math.trunc(this.sameCapitalInvestmentRecord["d_new_facilities"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
      },
      accountsReceivableChange() {
        return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["accounts_receivable"])-Math.trunc(this.lastBstRecord["accounts_receivable"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
      },
      merchandiseOtherChange() {
        return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["merchandise_other"])-Math.trunc(this.lastBstRecord["merchandise_other"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
      },
      accountsPayableChange() {
        return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["accounts_payable"])-Math.trunc(this.lastBstRecord["accounts_payable"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
      },
      investmentCf() {
        return this.facilities
      },
      facilities() {
        return this.sameCapitalInvestmentRecord ? ((Math.trunc(this.sameCapitalInvestmentRecord["existing_facilities"])+Math.trunc(this.sameCapitalInvestmentRecord["new_facilities"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
      },
      financesCf() {
        return ((Math.trunc(this.debtChange*this.unit)+Math.trunc(this.dividend*this.unit)+Math.trunc(this.surplusChange*this.unit))/this.unit).toFixed(this.fixed)
      },
      debtChange() {
        return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["long_term_debt"])-Math.trunc(this.lastBstRecord["long_term_debt"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
      },
      dividend: {
        get() {
          if(this.lastNetIncome) {
            return this.payoutRatio > 0 ? (((this.lastNetIncome*this.unit)*(this.payoutRatio/100))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
          } else {
            return this.items.dividend/this.unit
          }
        },
        set(val) {
          this.content = val
        }
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
        return this.sameBstRecord && this.lastBstRecord ? ((Math.trunc(this.sameBstRecord["capital"])-Math.trunc(this.lastBstRecord["capital"]))/this.unit).toFixed(this.fixed) : (0.000).toFixed(this.fixed)
      },
      cfSum() {
        return ((Math.trunc(this.salesCf*this.unit)+Math.trunc(this.investmentCf*this.unit)+Math.trunc(this.financesCf*this.unit))/this.unit).toFixed(this.fixed)
      }

    },
    watch: {
      cfSum: function(newValue, oldValue) {
        const payload = {"year": this.items.year, "value": newValue}
        this.$store.commit('tables/cf/updateCfSums', payload)
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
        } else if (payload == "dividend") {
          rows.push({"row": "dividend", "content": this.content})
          this.dividendForm = false
        }
        payload = {"record_id": this.items.record_id, "rows": rows}
        if (this.content) {
          this.$store.dispatch('tables/cf/updateCfRecord', payload)
        }
        this.content = ""
      },
      addNewRecord(payload) {
        const params = {"type": payload, "year": this.year, "record_id": this.items.record_id, "cf_id": this.items.cf}
        this.$store.dispatch('tables/cf/addNewCfRecord', params)
      },
      deleteRecord() {
        const params = {"record_id": this.items.record_id, "cf_id": this.items.cf}
        this.$store.dispatch('tables/cf/deleteCfRecord', params)
      },
      mounted() {
        const payload = {"year": this.items.year, "value": this.cfSum*this.unit}
        this.$store.commit('tables/cf/updateCfSums', payload)
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
  .sum {
    background-color: #B3E5FC;
  }
  .auto {
    color: #0D47A1;
  }
</style>
