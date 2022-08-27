<template>
  <v-list-group :value="false" no-action sub-group>
    <template v-slot:activator>
      <v-list-item-title v-text="projectsData['workGroupTitle']['title']"></v-list-item-title>
      <v-list-item-icon class="buttons">
        <v-btn icon dark>
          <v-icon v-text="'mdi-pencil'" small :color="buttonColor"></v-icon>
        </v-btn>
        <v-btn icon dark>
          <v-icon v-text="'mdi-trash-can'" small :color="buttonColor"></v-icon>
        </v-btn>
      </v-list-item-icon>
    </template>

    <v-list-item :key="'new' + i" link>
      <v-list-item-title v-text="'新規作成'"></v-list-item-title>
      <v-list-item-icon>
        <v-icon v-text="'mdi-plus-thick'" small :color="buttonColor"></v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-list-item v-for="(projectTitle) in projectsData['projectTitles']" :key="projectTitle['id']" link>
      <v-list-item-title v-text="projectTitle['title']"></v-list-item-title>
        <v-list-item-icon class="buttons">
          <v-btn icon dark>
            <v-icon v-text="'mdi-pencil'" small :color="buttonColor"></v-icon>
          </v-btn>
          <v-btn icon dark>
            <v-icon v-text="'mdi-trash-can'" small :color="buttonColor"></v-icon>
          </v-btn>
        </v-list-item-icon>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
    props: {
    projectsData: {
      type: Object,
      required: true
    },
    i: {
      type: Number,
      required: true
    }

  },
  data () {
    return {
      buttonColor: "blue-grey lighten-3",
    }
  },

}
</script>

<style scoped>
.buttons {
  margin-right: 20px;
}
</style>
