<template>
  <div>
    <v-list-group :value="false" prepend-icon="mdi-apps" dark>
      <template v-slot:activator>
        <v-list-item-title>ワークグループ</v-list-item-title>
      </template>

      <v-list-item :key="'neWorkGroup'" @click="openTextFieldDialog('new', 'workGroup', {'title': 'ワークグループ新規作成', 'label': 'ワークグループ名', 'btnText': '新規作成'})">
        <v-list-item-title v-text="'新規作成'" class="neWorkGroup"></v-list-item-title>
        <v-list-item-icon>
          <v-icon v-text="'mdi-plus-thick'" small :color="buttonColor"></v-icon>
        </v-list-item-icon>
      </v-list-item>

      <div v-for="(projectsData, i) in workGroupProjectLists">
        <OrganismsProjects
          :projectsData="projectsData"
          :i="i"
        ></OrganismsProjects>
      </div>
    </v-list-group>

    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">{{ title }}</v-card-title>
        <div class="textFieldContainer">
          <div class="inner">
            <v-text-field v-model="content" :label="label"/>
          </div>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="execTextFieldDialog()">{{ btnText }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        buttonColor: "blue-grey lighten-3",
        showDialog: false,
        title: "",
        label: "",
        content: "",
        btnText: ""
      }
    },
    computed: {
      workGroupProjectLists() {
        return this.$store.getters["dashboard/workGroupProjectLists"]
      }
    },
    methods: {
      openTextFieldDialog(type, target, payload) {
        this.title = payload["title"]
        this.label = payload["label"]
        this.btnText = payload["btnText"]
        this.content = ""
        this.showDialog = true
      },
      execTextFieldDialog() {
        this.$store.dispatch('dashboard/createWorkGroup', this.content)
        this.content = ""
        this.showDialog = false
      }
    }
  }
</script>

<style scoped>
  .neWorkGroup {
    margin-left: 56px;
  }
  .inner {
    width: 80%;
    margin: 0 auto;
  }
</style>
