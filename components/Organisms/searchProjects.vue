<template>
  <div>
    <v-col cols="6" class="search-form">
      <MoleculesSearchForm
        :btnTitle="'検索'"
        :placeholder="'プロジェクト名を入力してください'"
        @execute="search"
      ></MoleculesSearchForm>
    </v-col>

    <v-col cols="6" class="lists-field">
      <MoleculesProjectLists
        :projectLists="projectLists"
        @execute="moveToProject"
      ></MoleculesProjectLists>
      <div class="clearBtn">
        <v-btn @click="clearProjectList()">{{ btnTitle }}</v-btn>
      </div>
    </v-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        btnTitle: "クリア"
      }
    },
    computed: {
      projectLists() {
        return this.$store.getters["dashboard/projectLists"]
      },
    },
    methods: {
      search(payload) {
        this.$store.dispatch('dashboard/searchProjects', payload)
      },
      moveToProject(payload) {
        this.$store.dispatch('dashboard/moveToProject', payload)
      },
      clearProjectList() {
        this.$store.commit('dashboard/clearProjectList')
      }
    }
  }
</script>

<style>
  .search-form {
    margin: 0 auto;
  }
  .lists-field {
    width: 100%;
    margin: 0 auto;
  }
  .project-list {
    cursor: pointer;
  }
  .clearBtn {
    margin-top: 20px;
    text-align: center;
  }
</style>
