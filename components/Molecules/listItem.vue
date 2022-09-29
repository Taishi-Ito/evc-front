<template>
  <div>
    <v-list-item :key="item.key" :to="item.to" router exact @click="clickEvent()">
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: false
      },
      btnClickEvent:  {
        type: String,
        required: false
      }
    },
    methods: {
      clickEvent() {
        if (this.btnClickEvent) {
          this.$emit(this.btnClickEvent)
        }
      }
    }
  }
</script>
