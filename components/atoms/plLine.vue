<template>
  <div class="lists">
    <tr><th :class="yearForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="yearForm=true" @blur="updateList('Years')" v-model="year"></th></tr>
    <tr class="auto"><td>{{ sales }}</td></tr>
    <tr><th :class="customerForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="customerForm=true" @blur="updateList('customer')" v-model="customer"></th></tr>
    <tr><th :class="avCustomerSpendForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="avCustomerSpendForm=true" @blur="updateList('avCustomerSpend')" v-model="avCustomerSpend"></th></tr>
    <tr><th :class="salesCostForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="salesCostForm=true" @blur="updateList('salesCost')" v-model="salesCost"></th></tr>
    <tr><th :class="salesCostRatioForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="salesCostRatioForm=true" @blur="updateList('salesCostRatio')" v-model="salesCostRatio"></th></tr>
    <tr class="auto"><td>{{ grossProfit }}</td></tr>
    <tr class="auto"><td>{{ SgaExpenses }}</td></tr>
    <tr><th :class="laborCostForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="laborCostForm=true" @blur="updateList('laborCost')" v-model="laborCost"></th></tr>
    <tr class="auto"><td>{{ depreciation }}</td></tr>
    <tr><th :class="costOtherForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="costOtherForm=true" @blur="updateList('costOther')" v-model="costOther"></th></tr>
    <tr class="auto"><td>{{ operatingIncome }}</td></tr>
    <tr><th :class="noOpIncomeForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="noOpIncomeForm=true" @blur="updateList('noOpIncome')" v-model="noOpIncome"></th></tr>
    <tr class="auto"><td>{{ noOpCost }}</td></tr>
    <tr><th :class="interestExpenseForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="interestExpenseForm=true" @blur="updateList('interestExpense')" v-model="interestExpense"></th></tr>
    <tr><th :class="interestRateForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="interestRateForm=true" @blur="updateList('interestRate')" v-model="interestRate"></th></tr>
    <tr><th :class="otherForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="otherForm=true" @blur="updateList('other')" v-model="other"></th></tr>
    <tr class="auto"><td>{{ preTaxBenefit }}</td></tr>
    <tr><td :class="taxForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="taxForm=true" @blur="updateList('tax')" v-model="tax"></td></tr>
    <tr><td :class="taxRateForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="taxRateForm=true" @blur="updateList('taxRate')" v-model="taxRate"></td></tr>
    <tr class="auto"><td>{{ netIncome }}</td></tr>
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
          return (this.items.customer/this.unit).toFixed(this.fixed)
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
          return (this.items.av_customer_spend/this.unit).toFixed(this.fixed)
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
      return ((Math.trunc(this.sales) - Math.trunc(this.items.sales_cost))/this.unit).toFixed(this.fixed)
    },
    SgaExpenses() {
      return ((Math.trunc(this.items.labor_cost) + Math.trunc(this.items.cost_other) + Math.trunc(this.depreciation))/this.unit).toFixed(this.fixed)
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
      // 設備投資と紐付け
      return 1000000
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
      return ((Math.trunc(this.grossProfit) - Math.trunc(this.items.sales_cost))/this.unit).toFixed(this.fixed)
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
      return ((Math.trunc(this.operatingIncome) + Math.trunc(this.items.no_op_income) - Math.trunc(this.noOpCost))/this.unit).toFixed(this.fixed)

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
      return ((Math.trunc(this.preTaxBenefit) - Math.trunc(this.items.tax))).toFixed(this.fixed)
    }
  },
  methods: {
    updateList(payload) {
      let row = ""
      if (payload == "Years") {
        row = "year"
        this.yearForm = false
      }else if (payload == "customer") {
        row = "customer"
        this.customerForm = false
      } else if (payload == "avCustomerSpend") {
        row = "av_customer_spend"
        this.avCustomerSpendForm = false
      } else if (payload == "salesCost") {
        row = "sales_cost"
        this.salesCostForm = false
      } else if (payload == "salesCostRatio") {
        row = "sales_cost_ratio"
        this.salesCostRatioForm = false
      } else if (payload == "laborCost") {
        row = "labor_cost"
        this.laborCostForm = false
      } else if (payload == "costOther") {
        row = "cost_other"
        this.costOtherForm = false
      } else if (payload == "noOpIncome") {
        row = "no_op_income"
        this.noOpIncomeForm = false
      } else if (payload == "interestExpense") {
        row = "interest_expense"
        this.interestExpenseForm = false
      } else if (payload == "interestRate") {
        row = "interest_rate"
        this.interestRateForm = false
      } else if (payload == "other") {
        row = "other"
        this.otherForm = false
      } else if (payload == "tax") {
        row = "tax"
        this.taxForm = false
      } else if (payload == "taxRate") {
        row = "tax_rate"
        this.taxRateForm = false
      }
      payload = {"record_id": this.items.record_id, "row": row, "content": this.content}
      this.$store.dispatch('dashboard/updatePlRecord', payload)
    },
    addNewRecord(payload) {
      const params = {"type": payload, "year": this.year, "record_id": this.items.record_id, "pl_id": this.items.pl}
      this.$store.dispatch('dashboard/addNewPlRecord', params)
    },
    deleteRecord() {
      const params = {"record_id": this.items.record_id, "pl_id": this.items.pl}
      this.$store.dispatch('dashboard/deletePlRecord', params)
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
