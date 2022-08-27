<template>
  <v-list-group :value="false" prepend-icon="mdi-apps" dark>
    <template v-slot:activator>
      <v-list-item-title>ワークグループ</v-list-item-title>
    </template>

    <div v-for="(projectsData, i) in projectsDatas">
      <OrganismsProjects
        :projectsData="projectsData"
        :i="i"
      ></OrganismsProjects>
    </div>
  </v-list-group>
</template>

<script>
export default {
  data () {
    return {
      projectsDatas: [
        {"workGroupTitle": {"title": "化学メーカー", "id": 1}, "projectTitles": [{"title": "積水化学", "id": 1},{"title": "日東電工", "id": 2}]},
        {"workGroupTitle": {"title": "自動車メーカー", "id": 2}, "projectTitles": [{"title": "トヨタ自動車", "id": 3},{"title": "日産自動車", "id": 4}]}
        ]
    }
  },

}
</script>

<style scoped>
</style>
