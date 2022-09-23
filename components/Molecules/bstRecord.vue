<template>
  <div class="lists">
    <tr><th :class="yearForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="yearForm=true" @blur="updateList('Years')" v-model="year"></th></tr>
    <tr class="auto"><td>{{ assets }}</td></tr>
    <tr class="auto"><td>{{ currentAssets }}</td></tr>
    <tr><th :class="cashForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="cashForm=true" @blur="updateList('cash')" v-model="cash"></th></tr>
    <tr><th :class="accountsReceivableForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="accountsReceivableForm=true" @blur="updateList('accountsReceivable')" v-model="accountsReceivable"></th></tr>
    <tr><th :class="arSalesRatioForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="arSalesRatioForm=true" @blur="updateList('arSalesRatio')" v-model="arSalesRatio"></th></tr>
    <tr><th :class="merchandiseOtherForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="merchandiseOtherForm=true" @blur="updateList('merchandiseOther')" v-model="merchandiseOther"></th></tr>
    <tr><th :class="moSalesRatioForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="moSalesRatioForm=true" @blur="updateList('moSalesRatio')" v-model="moSalesRatio"></th></tr>
    <tr class="auto"><td>{{ fixedAssets }}</td></tr>
    <tr><th :class="landBuildingsForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="landBuildingsForm=true" @blur="updateList('landBuildings')" v-model="landBuildings"></th></tr>
    <tr><th :class="investmentOtherForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="investmentOtherForm=true" @blur="updateList('investmentOther')" v-model="investmentOther"></th></tr>
    <tr class="auto"><td>{{ debt }}</td></tr>
    <tr class="auto"><td>{{ currentDebt }}</td></tr>
    <tr><th :class="accountsPayableForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="accountsPayableForm=true" @blur="updateList('accountsPayable')" v-model="accountsPayable"></th></tr>
    <tr><th :class="costRatioForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="costRatioForm=true" @blur="updateList('costRatio')" v-model="costRatio"></th></tr>
    <tr><th :class="cdOtherForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="cdOtherForm=true" @blur="updateList('cdOther')" v-model="cdOther"></th></tr>
    <tr class="auto"><td>{{ fixedLiabilities }}</td></tr>
    <tr><th :class="longTermDebtForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="longTermDebtForm=true" @blur="updateList('longTermDebt')" v-model="longTermDebt"></th></tr>
    <tr><th :class="flOtherForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="flOtherForm=true" @blur="updateList('flOther')" v-model="flOther"></th></tr>
    <tr class="auto"><td>{{ capitalStock }}</td></tr>
    <tr><th :class="capitalForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="capitalForm=true" @blur="updateList('capital')" v-model="capital"></th></tr>
    <tr><th :class="surplusForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="surplusForm=true" @blur="updateList('surplus')" v-model="surplus"></th></tr>
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
      cashForm: false,
      accountsReceivableForm: false,
      arSalesRatioForm: false,
      merchandiseOtherForm: false,
      moSalesRatioForm: false,
      landBuildingsForm: false,
      investmentOtherForm: false,
      accountsPayableForm: false,
      costRatioForm: false,
      cdOtherForm: false,
      longTermDebtForm: false,
      flOtherForm: false,
      capitalForm: false,
      surplusForm: false
    }
  },
  computed: {
    lastBstRecord() {
      const that = this
      const BstRecords = this.$store.getters["tables/bst/bstRecords"]
      let lastBstRecord = {}
      BstRecords.some(function(value, index){
        if (value["year"] == that.items.year - 1) {
          lastBstRecord = value
          return true
        } else {
          lastBstRecord = null
        }
      });
      return lastBstRecord
    },
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
    samePlRecord() {
      const that = this
      const plRecords = this.$store.getters["tables/pl/plRecords"]
      let samePlRecord = {}
      plRecords.some(function(value, index){
        if (value["year"] == that.items.year) {
          samePlRecord =  value
          return true
        } else {
          samePlRecord = null
        }
      });
      return samePlRecord
    },
    sameCfRecord() {
      const that = this
      const cfRecords = this.$store.getters["tables/cf/cfRecords"]
      let sameCfRecord = {}
      cfRecords.some(function(value, index){
        if (value["year"] == that.items.year) {
          sameCfRecord =  value
          return true
        } else {
          sameCfRecord = null
        }
      });
      return sameCfRecord
    },
    sales() {
      return this.samePlRecord ? this.samePlRecord["customer"] * this.samePlRecord["av_customer_spend"] : null
    },
    lastYearCash() {
      return this.lastBstRecord ? this.lastBstRecord["cash"] : null
    },
    cf() {
      // 【宿題】CFと紐づける必要あり
      const cfSums = this.$store.getters["tables/cf/cfSums"]
      return cfSums[this.items.year] ? this.$store.getters["tables/cf/cfSum"] : 0.000
    },
    lastYearLandBuildings() {
      return this.lastBstRecord ? this.lastBstRecord["land_buildings"] : null
    },
    facilitiesSum() {
      return this.sameCapitalInvestmentRecord ? this.sameCapitalInvestmentRecord["existing_facilities"] + this.sameCapitalInvestmentRecord["new_facilities"] : null
    },
    dSum() {
      return this.sameCapitalInvestmentRecord ? this.sameCapitalInvestmentRecord["d_existing_facilities"] + this.sameCapitalInvestmentRecord["d_new_facilities"] : null
    },
    lastSurplus() {
      return this.lastBstRecord && this.lastBstRecord["surplus"] ? this.lastBstRecord["surplus"] : null
    },
    netIncome() {
      // 【宿題】CFと紐づける必要あり
      const netIncomes = this.$store.getters["tables/pl/netIncomes"]
      const netIncome =  netIncomes[this.items.year]
      return netIncome ? netIncome / this.unit : 0.000
    },
    dividend() {
      // 【宿題】CFと紐づける必要あり
      const netIncomes = this.$store.getters["tables/pl/netIncomes"]
      const netIncome =  netIncomes[this.items.year]
      const payoutRatio = this.sameCfRecord["payout_ratio"]/100
      return netIncome ? netIncome*payoutRatio : 0.000
    },
    salesCosts() {
      const salesCosts = this.$store.getters["tables/pl/salesCosts"]
      const salesCost = salesCosts[this.items.year]
      return salesCost ? salesCost / this.unit : 0.000
    },
    year: {
      get() {
        return this.items.year
      },
      set(val) {
        this.content = val
      }
    },
    assets() {
      return ((Math.trunc(this.currentAssets*this.unit) + Math.trunc(this.fixedAssets*this.unit))/this.unit).toFixed(this.fixed)
    },
    currentAssets() {
      return ((Math.trunc(this.items.cash) + Math.trunc(this.items.accounts_receivable) + Math.trunc(this.items.merchandise_other))/this.unit).toFixed(this.fixed)
    },
    cash: {
      get() {
        const that = this
        if (this.cashForm) {
          return this.items.cash
        } else {
          if (that.lastYearCash && that.cf) {
            return ((Math.trunc(that.lastYearCash) + Math.trunc(that.cf))/this.unit).toFixed(this.fixed)
          } else {
            return (this.items.cash/this.unit).toFixed(this.fixed)
          }
        }
      },
      set(val) {
        this.content = val
      }
    },
    accountsReceivable: {
      get() {
        if (this.accountsReceivableForm) {
          return this.items.accounts_receivable
        } else {
          return (this.items.accounts_receivable/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    arSalesRatio: {
      get() {
        return this.items.ar_sales_ratio
      },
      set(val) {
        this.content = val
      }
    },
    merchandiseOther: {
      get() {
        if (this.merchandiseOtherForm) {
          return this.items.merchandise_other
        } else {
          return (this.items.merchandise_other/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    moSalesRatio: {
      get() {
        return this.items.mo_sales_ratio
      },
      set(val) {
        this.content = val
      }
    },
    fixedAssets() {
      return ((Math.trunc(this.items.land_buildings) + Math.trunc(this.items.investment_other))/this.unit).toFixed(this.fixed)
    },
    landBuildings: {
      get() {
        if (this.landBuildingsForm) {
          return this.items.land_buildings
        } else {
          if (this.lastYearLandBuildings && this.facilitiesSum && this.dSum) {
            return ((Math.trunc(this.lastYearLandBuildings) + Math.trunc(this.facilitiesSum) - Math.trunc(this.dSum))/this.unit).toFixed(this.fixed)
          } else {
            return (this.items.land_buildings/this.unit).toFixed(this.fixed)
          }
        }
      },
      set(val) {
        this.content = val
      }
    },
    investmentOther: {
      get() {
        if (this.investmentOtherForm) {
          return this.items.investment_other
        } else {
          return (this.items.investment_other/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    debt() {
      return ((Math.trunc(this.currentDebt*this.unit) + Math.trunc(this.fixedLiabilities*this.unit))/this.unit).toFixed(this.fixed)
    },
    currentDebt() {
      return ((Math.trunc(this.items.accounts_payable) + Math.trunc(this.items.cd_other))/this.unit).toFixed(this.fixed)
    },
    accountsPayable: {
      get() {
        if (this.accountsPayableForm) {
          return this.items.accounts_payable
        } else {
          return (this.items.accounts_payable/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    costRatio: {
      get() {
        return this.items.cost_ratio
      },
      set(val) {
        this.content = val
      }
    },
    cdOther: {
      get() {
        if (this.cdOtherForm) {
          return this.items.cd_other
        } else {
          return (this.items.cd_other/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    fixedLiabilities() {
      return ((Math.trunc(this.items.long_term_debt) + Math.trunc(this.items.fl_other))/this.unit).toFixed(this.fixed)
    },
    longTermDebt: {
      get() {
        if (this.longTermDebtForm) {
          return this.items.long_term_debt
        } else {
          return (this.items.long_term_debt/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    flOther: {
      get() {
        if (this.flOtherForm) {
          return this.items.fl_other
        } else {
          return (this.items.fl_other/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    capitalStock() {
      return ((Math.trunc(this.items.capital) + Math.trunc(this.surplus*this.unit))/this.unit).toFixed(this.fixed)
    },
    capital: {
      get() {
        if (this.capitalForm) {
          return this.items.capital
        } else {
          return (this.items.capital/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    surplus: {
      get() {
        if (this.lastSurplus && this.netIncome && this.dividend) {
          return ((Math.trunc(this.lastSurplus*this.unit) + Math.trunc(this.netIncome*this.unit) + Math.trunc(this.dividend*this.unit))/this.unit).toFixed(this.fixed)
        } else {
          return (this.items.surplus/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    }
  },
  watch: {
    sales: function(newValue, oldValue) {
      this.content = this.accountsReceivable*this.unit
      this.updateList("accountsReceivable")
      this.content = this.merchandiseOther*this.unit
      this.updateList("merchandiseOther")
    },
    salesCosts: {
      handler(newValue, oldValue) {
        this.content = this.accountsPayable*this.unit
        this.updateList("accountsPayable")
      },
      deep: true
    }
  },
  methods: {
    updateList(payload) {
      let rows = []
      if (payload == "Years") {
        rows.push({"row": "year", "content": this.content})
        this.yearForm = false
      }else if (payload == "cash") {
        rows.push({"row": "cash", "content": this.content})
        this.cashForm = false
      } else if (payload == "accountsReceivable") {
        let accountsReceivable = {"row": "accounts_receivable", "content": this.content}
        let arSalesRatio = {}
        if (this.samePlRecord && this.sales > 0) {
          arSalesRatio = {"row": "ar_sales_ratio", "content": (this.content/this.sales)*100}
        } else {
          arSalesRatio = {"row": "ar_sales_ratio", "content": 0}
        }
        rows.push(accountsReceivable)
        rows.push(arSalesRatio)
        this.accountsReceivableForm = false
      } else if (payload == "arSalesRatio") {
        let accountsReceivable = {}
        if (this.samePlRecord) {
          accountsReceivable = {"row": "accounts_receivable", "content": this.sales * (this.content / 100)}
        } else {
          accountsReceivable = {"row": "accounts_receivable", "content": 0}
        }
        let arSalesRatio = {"row": "ar_sales_ratio", "content": this.content}
        rows.push(accountsReceivable)
        rows.push(arSalesRatio)
        this.arSalesRatioForm = false
      } else if (payload == "merchandiseOther") {
        let merchandiseOther = {"row": "merchandise_other", "content": this.content}
        let moSalesRatio = {}
        if (this.samePlRecord && this.sales > 0) {
          moSalesRatio = {"row": "mo_sales_ratio", "content": (this.content/ this.sales)*100}
        } else {
          moSalesRatio = {"row": "mo_sales_ratio", "content": 0}
        }
        rows.push(merchandiseOther)
        rows.push(moSalesRatio)
        this.merchandiseOtherForm = false
      } else if (payload == "moSalesRatio") {
        let merchandiseOther = {}
        if (this.samePlRecord) {
          merchandiseOther = {"row": "merchandise_other", "content": this.sales * (this.content / 100)}
        } else {
          merchandiseOther = {"row": "merchandise_other", "content": 0}
        }
        let moSalesRatio = {"row": "mo_sales_ratio", "content": this.content}
        rows.push(merchandiseOther)
        rows.push(moSalesRatio)
        this.moSalesRatioForm = false
      } else if (payload == "landBuildings") {
        rows.push({"row": "land_buildings", "content": this.content})
        this.landBuildingsForm = false
      } else if (payload == "investmentOther") {
        rows.push({"row": "investment_other", "content": this.content})
        this.investmentOtherForm = false
      } else if (payload == "accountsPayable") {
        let accountsPayable = {"row": "accounts_payable", "content": this.content}
        let costRatio = {}
        if (this.samePlRecord && this.samePlRecord["sales_cost"] > 0) {
          costRatio = {"row": "cost_ratio", "content": (this.content/this.samePlRecord["sales_cost"])*100}
        } else {
          costRatio = {"row": "cost_ratio", "content": 0}
        }
        rows.push(accountsPayable)
        rows.push(costRatio)
        this.accountsPayableForm = false
      } else if (payload == "costRatio") {
        let accountsPayable = {}
        if (this.samePlRecord) {
          accountsPayable = {"row": "accounts_payable", "content": this.samePlRecord["sales_cost"] * (this.content / 100)}
        } else {
          accountsPayable = {"row": "accounts_payable", "content": 0}
        }
        let costRatio = {"row": "cost_ratio", "content": this.content}
        rows.push(accountsPayable)
        rows.push(costRatio)
        this.costRatioForm = false
      } else if (payload == "cdOther") {
        rows.push({"row": "cd_other", "content": this.content})
        this.cdOtherForm = false
      } else if (payload == "longTermDebt") {
        rows.push({"row": "long_term_debt", "content": this.content})
        this.longTermDebtForm = false
      } else if (payload == "flOther") {
        rows.push({"row": "fl_other", "content": this.content})
        this.flOtherForm = false
      } else if (payload == "capital") {
        rows.push({"row": "capital", "content": this.content})
        this.capitalForm = false
      } else if (payload == "surplus") {
        rows.push({"row": "surplus", "content": this.content})
        this.surplusForm = false
      }
      payload = {"record_id": this.items.record_id, "rows": rows}
      if (this.content) {
        this.$store.dispatch('tables/bst/updateBstRecord', payload)
      }
    },
    addNewRecord(payload) {
      const params = {"type": payload, "year": this.year, "record_id": this.items.record_id, "bst_id": this.items.bst}
      this.$store.dispatch('tables/bst/addNewBstRecord', params)
    },
    deleteRecord() {
      const params = {"record_id": this.items.record_id, "bst_id": this.items.bst}
      this.$store.dispatch('tables/bst/deleteBstRecord', params)
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
