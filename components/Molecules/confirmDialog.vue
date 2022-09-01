<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 lighten-2 justify-center cardTitle">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="isDestructive">
            <v-btn color="error" text @click="execute()">{{ execWord }}</v-btn>
            <v-btn color="primary" text @click="close()">{{ closeWord }}</v-btn>
          </div>
          <div v-else>
            <v-btn color="primary" text @click="close()">{{ closeWord }}</v-btn>
            <v-btn color="error" text @click="execute()">{{ execWord }}</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    execWord: {
      type: String,
      required: true
    },
    closeWord: {
      type: String,
      required: false,
      default: "キャンセル"
    },
    isDestructive: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    execute() {
      this.$emit("execute");
    },
    close() {
      this.$emit("close");
    }
  }

}
</script>

<style scoped>
.cardTitle {
  height: 100px;
}
</style>
