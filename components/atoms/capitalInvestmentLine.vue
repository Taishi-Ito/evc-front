<template>
  <div class="lists">
    <tr><th :class="yearForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="yearForm=true" @blur="updateList('Years')" v-model="year"></th></tr>
    <tr><td>{{ facilitiesSum }}</td></tr>
    <tr><td :class="existingFacilitiesForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="existingFacilitiesForm=true" @blur="updateList('ExistingFacilities')" v-model="existingFacilities"></td></tr>
    <tr><td :class="newFacilitiesForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="newFacilitiesForm=true" @blur="updateList('NewFacilities')" v-model="newFacilities"></td></tr>
    <tr><td>{{ dSum }}</td></tr>
    <tr><td :class="dExistingFacilitiesForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="dExistingFacilitiesForm=true" @blur="updateList('DExistingFacilities')" v-model="dExistingFacilities"></td></tr>
    <tr><td :class="dNewFacilitiesForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="dNewFacilitiesForm=true" @blur="updateList('DNewFacilities')" v-model="dNewFacilities"></td></tr>
    <tr><td :class="dYearForm ? 'inputTdOn' : 'inputTdOff'"><input style="padding: 5px 10px 5px 10px;" type="text" class="inputForm" @click="dYearForm=true" @blur="updateList('DYear')" v-model="dYear"></td></tr>
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
      yearForm: false,
      yearContent: this.items.year,
      existingFacilitiesForm: false,
      existingFacilitiesContent: this.items.existing_facilities,
      newFacilitiesForm: false,
      newFacilitiesContent: this.items.new_facilities,
      dExistingFacilitiesForm: false,
      dExistingFacilitiesContent: this.items.d_existing_facilities,
      dNewFacilitiesForm: false,
      dNewFacilitiesContent: this.items.d_new_facilities,
      dYearForm: false,
      dYearContent: this.items.d_year,
    }
  },
  computed: {
    year: {
      get() {
        return this.items.year
      },
      set(val) {
        this.yearContent = val
      }
    },
    existingFacilities: {
      get() {
        if (this.existingFacilitiesForm) {
          return this.items.existing_facilities
        } else {
          return (this.items.existing_facilities/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.existingFacilitiesContent = val
      }
    },
    newFacilities: {
      get() {
        if (this.newFacilitiesForm) {
          return this.items.new_facilities
        } else {
          return (this.items.new_facilities/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.newFacilitiesContent = val
      }
    },
    facilitiesSum() {
      return ((Math.trunc(this.items.existing_facilities) + Math.trunc(this.items.new_facilities))/this.unit).toFixed(this.fixed)
    },
    dExistingFacilities: {
      get() {
        if (this.dExistingFacilitiesForm) {
          return this.items.d_existing_facilities
        } else {
          return (this.items.d_existing_facilities/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.dExistingFacilitiesContent = val
      }
    },
    dNewFacilities: {
      get() {
        if (this.dNewFacilitiesForm) {
        return this.items.d_new_facilities

        } else {
        return (this.items.d_new_facilities/this.unit).toFixed(this.fixed)
        }
      },
      set(val) {
        this.dNewFacilitiesContent = val
      }
    },
    dSum() {
      return ((Math.trunc(this.items.d_existing_facilities) + Math.trunc(this.items.d_new_facilities))/this.unit).toFixed(this.fixed)
    },
    dYear: {
      get() {
        return this.items.d_year
      },
      set(val) {
        this.dYearContent = val
      }
    }
  },
  methods: {
    updateList(payload) {
      let content = 0
      let row = ""
      if (payload == "Years") {
        content = this.yearContent
        row = "year"
        this.yearForm = false
      }else if (payload == "ExistingFacilities") {
        content = this.existingFacilitiesContent
        row = "existing_facilities"
        this.existingFacilitiesForm = false
      } else if (payload == "NewFacilities") {
        content = this.newFacilitiesContent
        row = "new_facilities"
        this.newFacilitiesForm = false
      } else if (payload == "DExistingFacilities") {
        content = this.dExistingFacilitiesContent
        row = "d_existing_facilities"
        this.dExistingFacilitiesForm = false
      } else if (payload == "DNewFacilities") {
        content = this.dNewFacilitiesContent
        row = "d_new_facilities"
        this.dNewFacilitiesForm = false
      } else if (payload == "DYear") {
        content = this.dYearContent
        row = "d_year"
        this.dYearForm = false
      }
      payload = {"record_id": this.items.record_id, "row": row, "content": content}
      this.$store.dispatch('dashboard/updateCapitalInvestment', payload)
    },
    addNewRecord(payload) {
      const params = {"type": payload, "year": this.year, "record_id": this.items.record_id, "capital_investment_id": this.items.capital_investment}
      this.$store.dispatch('dashboard/addNewCapitalInvestmentRecord', params)
    },
    deleteRecord() {
      const params = {"record_id": this.items.record_id, "capital_investment_id": this.items.capital_investment}
      this.$store.dispatch('dashboard/deleteCapitalInvestmentRecord', params)
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
  width: 100px;
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
</style>
