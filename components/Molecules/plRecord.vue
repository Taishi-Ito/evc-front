<template>
  <div class="lists">
    <tr><td :class="yearForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="yearForm=true" @blur="updateList('Years')" v-model="year"></td></tr>
    <tr class="sum"><td>{{ sales }}</td></tr>
    <tr><td :class="customerForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="customerForm=true" @blur="updateList('customer')" v-model="customer"></td></tr>
    <tr><td :class="avCustomerSpendForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="avCustomerSpendForm=true" @blur="updateList('avCustomerSpend')" v-model="avCustomerSpend"></td></tr>
    <tr><td :class="salesCostForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="salesCostForm=true" @blur="updateList('salesCost')" v-model="salesCost"></td></tr>
    <tr><td :class="salesCostRatioForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="salesCostRatioForm=true" @blur="updateList('salesCostRatio')" v-model="salesCostRatio"></td></tr>
    <tr class="sum"><td>{{ grossProfit }}</td></tr>
    <tr class="auto"><td>{{ SgaExpenses }}</td></tr>
    <tr><td :class="laborCostForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="laborCostForm=true" @blur="updateList('laborCost')" v-model="laborCost"></td></tr>
    <tr class="auto"><td>{{ depreciation }}</td></tr>
    <tr><td :class="costOtherForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="costOtherForm=true" @blur="updateList('costOther')" v-model="costOther"></td></tr>
    <tr class="sum"><td>{{ operatingIncome }}</td></tr>
    <tr><td :class="noOpIncomeForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="noOpIncomeForm=true" @blur="updateList('noOpIncome')" v-model="noOpIncome"></td></tr>
    <tr class="auto"><td>{{ noOpCost }}</td></tr>
    <tr><td :class="interestExpenseForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="interestExpenseForm=true" @blur="updateList('interestExpense')" v-model="interestExpense"></td></tr>
    <tr><td :class="interestRateForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="interestRateForm=true" @blur="updateList('interestRate')" v-model="interestRate"></td></tr>
    <tr><td :class="otherForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="otherForm=true" @blur="updateList('other')" v-model="other"></td></tr>
    <tr class="sum"><td>{{ preTaxBenefit }}</td></tr>
    <tr><td :class="taxForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="taxForm=true" @blur="updateList('tax')" v-model="tax"></td></tr>
    <tr><td :class="taxRateForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="taxRateForm=true" @blur="updateList('taxRate')" v-model="taxRate"></td></tr>
    <tr class="sum"><td>{{ netIncome }}</td></tr>
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
      customerForm: false,
      avCustomerSpendForm: false,
      salesCostForm: false,
      salesCostRatioForm: false,
      laborCostForm: false,
      costOtherForm: false,
      noOpIncomeForm: false,
      interestExpenseForm: false,
      interestRateForm: false,
      otherForm: false,
      taxForm: false,
      taxRateForm: false,
    }
  },
  computed: {
    sameBstRecord() {
      const that = this
      const BstRecords = this.$store.getters["tables/bst/bstRecords"]
      let sameBstRecord = {}
      BstRecords.some(function(value, index){
        if (value["year"] == that.items.year) {
          sameBstRecord =  value
          return true
        } else {
          sameBstRecord = null
        }
      });
      return sameBstRecord
    },
    year: {
      get() {
        return this.items.year
      },
      set(val) {
        this.content = val
      }
    },
    sales() {
      return ((Math.trunc(this.items.customer) * Math.trunc(this.items.av_customer_spend))/this.unit).toFixed(this.fixed)
    },
    customer: {
      get() {
        if (this.customerForm) {
          return this.items.customer
        } else {
          return Number(this.items.customer).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    avCustomerSpend: {
      get() {
        if (this.avCustomerSpendForm) {
          return this.items.av_customer_spend
        } else {
          return Number(this.items.av_customer_spend).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    salesCost: {
      get() {
        if (this.salesCostForm) {
          return this.items.sales_cost
        } else {
          return (this.items.sales_cost/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    salesCostRatio: {
      get() {
        return this.items.sales_cost_ratio
      },
      set(val) {
        this.content = val
      }
    },
    grossProfit() {
      return ((Math.trunc(this.sales * this.unit) - Math.trunc(this.items.sales_cost))/this.unit).toFixed(this.fixed)
    },
    SgaExpenses() {
      return ((Math.trunc(this.items.labor_cost) + Math.trunc(this.items.cost_other) + Math.trunc(this.depreciation * this.unit))/this.unit).toFixed(this.fixed)
    },
    laborCost: {
      get() {
        if (this.laborCostForm) {
          return this.items.labor_cost
        } else {
          return (this.items.labor_cost/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    depreciation() {
      const that = this
      let capitalInvestmentRecords = this.$store.getters["tables/capitalInvestment/capitalInvestmentRecords"]
      let depreciation = 0
      capitalInvestmentRecords.some(function(value, index){
        if (value["year"] == that.items.year) {
          depreciation =  (Number(value["d_new_facilities"]) + Number(value["d_existing_facilities"])) / that.unit
        }
      });
      return depreciation
    },
    costOther: {
      get() {
        if (this.costOtherForm) {
          return this.items.cost_other
        } else {
          return (this.items.cost_other/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    operatingIncome() {
      return ((Math.trunc(this.grossProfit*this.unit) - Math.trunc(this.SgaExpenses*this.unit))/this.unit).toFixed(this.fixed)
    },
    noOpIncome: {
      get() {
        if (this.noOpIncomeForm) {
          return this.items.no_op_income
        } else {
          return (this.items.no_op_income/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    noOpCost() {
      return ((Math.trunc(this.items.interest_expense) + Math.trunc(this.items.other))/this.unit).toFixed(this.fixed)
    },
    interestExpense: {
      get() {
        if (this.interestExpenseForm) {
          return this.items.interest_expense
        } else {
          return (this.items.interest_expense/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    interestRate: {
      get() {
        return this.items.interest_rate
      },
      set(val) {
        this.content = val
      }
    },
    other: {
      get() {
        if (this.otherForm) {
          return this.items.other
        } else {
          return (this.items.other/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    preTaxBenefit() {
      return ((Math.trunc(this.operatingIncome * this.unit) + Math.trunc(this.items.no_op_income) - Math.trunc(this.noOpCost * this.unit))/this.unit).toFixed(this.fixed)

    },
    tax: {
      get() {
        if (this.taxForm) {
          return this.items.tax
        } else {
          return (this.items.tax/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.content = val
      }
    },
    taxRate: {
      get() {
        return this.items.tax_rate
      },
      set(val) {
        this.content = val
      }
    },
    netIncome() {
      return ((Math.trunc(this.preTaxBenefit * this.unit) - Math.trunc(this.items.tax))/this.unit).toFixed(this.fixed)
    }
  },
  watch: {
    'sameBstRecord.long_term_debt': {
      handler(newValue, oldValue) {
        if (newValue != oldValue) {
          this.content = this.interestExpense*this.unit
          this.updateList("interestExpense")
        }
      },
      deep: true
    },
    netIncome: function(newValue, oldValue) {
      const payload = {"year": this.items.year, "value": newValue*this.unit}
      this.$store.commit('tables/pl/updateNetIncomes', payload)
    },
    salesCost: function(newValue, oldValue) {
      const payload = {"year": this.items.year, "value": newValue*this.unit}
      this.$store.commit('tables/pl/updateSalesCosts', payload)
    },
    sales: function(newValue, oldValue) {
      this.content = this.salesCost*this.unit
      this.updateList("salesCost")
    },
    preTaxBenefit: function(newValue, oldValue) {
      this.content = this.tax*this.unit
      this.updateList("tax")
    }
  },
  methods: {
    updateList(payload) {
      let rows = []
      if (payload == "Years") {
        rows.push({"row": "year", "content": this.content})
        this.yearForm = false
      }else if (payload == "customer") {
        rows.push({"row": "customer", "content": this.content})
        this.customerForm = false
      } else if (payload == "avCustomerSpend") {
        rows.push({"row": "av_customer_spend", "content": this.content})
        this.avCustomerSpendForm = false
      } else if (payload == "salesCost") {
        let salesCosts = {"row": "sales_cost", "content": this.content}
        let salesCostRatios = {"row": "sales_cost_ratio", "content": ((this.content / (this.sales * this.unit)) * 100).toFixed(this.fixed)}
        rows.push(salesCosts)
        rows.push(salesCostRatios)
        this.salesCostForm = false
      } else if (payload == "salesCostRatio") {
        let salesCosts = {"row": "sales_cost", "content": (this.sales * this.unit) * (this.content / 100)}
        let salesCostRatios = {"row": "sales_cost_ratio", "content": this.content}
        rows.push(salesCosts)
        rows.push(salesCostRatios)
        this.salesCostRatioForm = false
      } else if (payload == "laborCost") {
        rows.push({"row": "labor_cost", "content": this.content})
        this.laborCostForm = false
      } else if (payload == "costOther") {
        rows.push({"row": "cost_other", "content": this.content})
        this.costOtherForm = false
      } else if (payload == "noOpIncome") {
        rows.push({"row": "no_op_income", "content": this.content})
        this.noOpIncomeForm = false
      } else if (payload == "interestExpense") {
        let interestExpense = {"row": "interest_expense", "content": this.content}
        let interestRate = {}
        if (this.sameBstRecord && this.sameBstRecord["long_term_debt"] > 0) {
          interestRate = {"row": "interest_rate", "content": (this.content/this.sameBstRecord["long_term_debt"])*100}
        } else {
          interestRate = {"row": "interest_rate", "content": 0}
        }
        rows.push(interestExpense)
        rows.push(interestRate)
        this.interestExpenseForm = false
      } else if (payload == "interestRate") {
        let interestExpense = {}
        if (this.sameBstRecord && this.sameBstRecord["long_term_debt"] > 0) {
          interestExpense = {"row": "interest_expense", "content": (this.content/100) * this.sameBstRecord["long_term_debt"]}
        } else {
          interestExpense = {"row": "interest_expense", "content": 0}
        }
        let interestRate = {"row": "interest_rate", "content": this.content}
        rows.push(interestExpense)
        rows.push(interestRate)
        this.interestRateForm = false
      } else if (payload == "other") {
        rows.push({"row": "other", "content": this.content})
        this.otherForm = false
      } else if (payload == "tax") {
        let tax = {"row": "tax", "content": this.content}
        let taxRate = {"row": "tax_rate", "content": (this.content / (this.preTaxBenefit * this.unit)) * 100}
        rows.push(tax)
        rows.push(taxRate)
        this.taxForm = false
      } else if (payload == "taxRate") {
        let tax = {"row": "tax", "content": (this.preTaxBenefit * this.unit) * (this.content / 100)}
        let taxRate = {"row": "tax_rate", "content": this.content}
        rows.push(tax)
        rows.push(taxRate)
        this.taxRateForm = false
      }
      payload = {"record_id": this.items.record_id, "rows": rows}
      if (this.content) {
        this.$store.dispatch('tables/pl/updatePlRecord', payload)
      }
    },
    addNewRecord(payload) {
      const params = {"type": payload, "year": this.year, "record_id": this.items.record_id, "pl_id": this.items.pl}
      this.$store.dispatch('tables/pl/addNewPlRecord', params)
    },
    deleteRecord() {
      const params = {"record_id": this.items.record_id, "pl_id": this.items.pl}
      this.$store.dispatch('tables/pl/deletePlRecord', params)
    },
    roundingDown(payload) {
      if (payload == 0) {
        return 0.000
      } else {
        return Math.floor(payload*1000)/1000
      }
    }
  },
  mounted() {
    const netIncome = {"year": this.items.year, "value": this.netIncome*this.unit}
    this.$store.commit('tables/pl/updateNetIncomes', netIncome)
    const salesCost = {"year": this.items.year, "value": this.salesCost*this.unit}
    this.$store.commit('tables/pl/updateSalesCosts', salesCost)
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
