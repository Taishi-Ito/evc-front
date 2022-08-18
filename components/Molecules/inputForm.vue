<template>
  <div class="inputFormContainer">
    <label :for="formId">{{ formLabel }}</label>
    <br>
    <validation-provider v-slot="{ errors }" :name="formName" :rules="formRules" >
      <input class="inputForm" v-model="content" :error-messages="errors" :label="formLabel" :type="formType" :id="formId">
      <div class="errorMessageContainer">
        <p class="errorMessage" v-for="error in errors">{{ error }}</p>
      </div>
    </validation-provider>
  </div>
</template>

<script>
export default {
  props: {
    formLabel: {
      type: String,
      required: false
    },
    formId: {
      type: String,
      required: false
    },
    formName: {
      type: String,
      required: false
    },
    formRules: {
      type: String,
      required: false
    },
    formType: {
      type: String,
      required: true
    },
    formContent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: null
    }
  },
  watch: {
    content (val) {
      this.$emit("update", val);
    },
  },
  mounted() {
    if (this.formContent) {
      this.content = this.formContent;
    }
  },
}
</script>
<style>
.inputFormContainer {
  margin-top: 20px;
}
.inputForm {
  border: 2px solid #ddd;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  min-width: 120px;
  vertical-align: middle;
  height: 40px;
  min-width: 300px;
}
.errorMessageContainer {
  height: 20px;
}
.errorMessage {
  font-size: 15px;
  color: red;
}
</style>
