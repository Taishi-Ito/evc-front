<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">プロジェクト名</th>
            <th class="text-left">ワークグループ名</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projectLists" :key="project.id" @click="clickList(project.id)" class="project-list">
            <td>{{ project.title }}</td>
            <td>{{ project.work_group }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    projectLists: {
      type: Array,
      required: true
    },
  },
  methods: {
    clickList(payload) {
      this.$emit('execute', payload)
    }
  }
}
</script>

<style>
  .project-list {
    cursor: pointer;
  }
</style>
