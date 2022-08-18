<template>
  <div class="inputFormContainer">
    <div class="inputFormInner">
      <p class="label" :for="formId">{{ formLabel }}</p>
      <validation-provider v-slot="{ errors }" :name="formName" :rules="formRules" >
        <input class="inputForm" v-model="content" :error-messages="errors" :label="formLabel" :type="formType" :id="formId">
        <div class="errorMessageContainer">
          <p class="errorMessage" v-for="error in errors">{{ error }}</p>
        </div>
      </validation-provider>
    </div>
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
  /* min-width: 120px; */
  vertical-align: middle;
  height: 40px;
  /* min-width: 300px; */
  width: 100%;
}
.errorMessageContainer {
  height: 20px;
}
.errorMessage {
  font-size: 15px;
  color: red;
}
.label {
  text-align: left !important;
  width: 100%;
  margin-bottom: 0 !important;
}
.inputFormInner {
  width: 80%;
  margin: 0 auto;
}
</style>
