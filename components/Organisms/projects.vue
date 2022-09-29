<template>
  <div>
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

    <v-list-group :value="false" no-action sub-group>
      <template v-slot:activator>
        <v-list-item-title v-text="projectsData['workGroupTitle']['title']"></v-list-item-title>
        <v-list-item-icon class="buttons">
          <v-btn icon dark @click.stop="openTextFieldDialog('edit', 'workGroup', {'data': projectsData['workGroupTitle'], 'title': 'ワークグループ名変更', 'label': 'ワークグループ名', 'btnText': '変更'})">
            <v-icon v-text="'mdi-pencil'" small :color="buttonColor"></v-icon>
          </v-btn>
          <v-btn icon dark @click.stop="openConfirmDialog(projectsData['workGroupTitle'], 'workGroup')">
            <v-icon v-text="'mdi-trash-can'" small :color="buttonColor"></v-icon>
          </v-btn>
        </v-list-item-icon>
      </template>

      <v-list-item :key="'new' + i" link @click.stop="openTextFieldDialog('new', 'project',{'data': projectsData['workGroupTitle'], 'title': 'プロジェクト新規作成', 'label': 'プロジェクト名', 'btnText': '新規作成'})">
        <v-list-item-title v-text="'新規作成'"></v-list-item-title>
        <v-list-item-icon>
          <v-icon v-text="'mdi-plus-thick'" small :color="buttonColor"></v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item v-for="(projectTitle) in projectsData['projectTitles']" :key="projectTitle['id']" link :to="`/project/${projectTitle['id']}`">
        <v-list-item-title v-text="projectTitle['title']"></v-list-item-title>
          <v-list-item-icon class="buttons">
            <v-btn icon dark @click.prevent="openTextFieldDialog('edit', 'project', {'data': projectTitle, 'title': 'プロジェクト名変更', 'label': 'プロジェクト名', 'btnText': '変更'})">
              <v-icon v-text="'mdi-pencil'" small :color="buttonColor"></v-icon>
            </v-btn>
            <v-btn icon dark @click.prevent="openConfirmDialog(projectTitle, 'project')">
              <v-icon v-text="'mdi-trash-can'" small :color="buttonColor"></v-icon>
            </v-btn>
          </v-list-item-icon>
      </v-list-item>
    </v-list-group>
    <MoleculesConfirmDialog
      :dialog="confirmDialog"
      :execWord="'削除'"
      :isDestructive="true"
      :title="deleteTitle"
      @execute="execDelete"
      @close="closeConfirmDialog"
    ></MoleculesConfirmDialog>
  </div>
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
        showDialog: false,
        title: "",
        label: "",
        content: "",
        btnText: "",
        id: null,
        type: "",
        target: "",
        confirmDialog: false,
        deleteTitle: "",
        deleteTargetId: null,
        deleteTarget: ""
      }
    },
    methods: {
      openTextFieldDialog(type, target, payload) {
        this.title = payload["title"]
        this.label = payload["label"]
        this.id = payload["data"]["id"]
        this.btnText = payload["btnText"]
        this.showDialog = true
        this.type = type
        this.target = target
        if (type == "edit") {
          this.content = payload["data"]["title"]
        } else {
          this.content = ""
        }
      },
      execTextFieldDialog() {
        if (this.type == "edit" && this.target == "workGroup") {
          const payload = {"title": this.content, "id": this.id}
          this.$store.dispatch('dashboard/changeWorkGroupTitle', payload)
        } else if (this.type == "edit" && this.target == "project") {
          const payload = {"title": this.content, "id": this.id}
          this.$store.dispatch('dashboard/changeProjectTitle', payload)
        } else if (this.type == "new" && this.target == "project") {
          const payload = {"title": this.content, "work_group_id": this.id}
          this.$store.dispatch('dashboard/createProject', payload)
        }
        this.showDialog = false
      },
      openConfirmDialog(data, target) {
        this.deleteTargetId = data["id"]
        this.deleteTitle = data["title"] + "を削除しますか？"
        this.deleteTarget = target
        this.confirmDialog = true
      },
      closeConfirmDialog() {
        this.confirmDialog = false
      },
      execDelete() {
        if (this.deleteTarget == 'workGroup') {
          this.$store.dispatch('dashboard/deleteWorkGroup', this.deleteTargetId)
        } else if (this.deleteTarget == 'project') {
          this.$store.dispatch('dashboard/deleteProject', this.deleteTargetId)
        }
        this.confirmDialog = false
      }
    }
  }
</script>

<style scoped>
  .buttons {
    margin-right: 20px;
  }
  .inner {
    width: 80%;
    margin: 0 auto;
  }
</style>
