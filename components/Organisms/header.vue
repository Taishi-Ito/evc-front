<template>
  <div>
    <!-- left drawer -->
    <v-navigation-drawer v-if="isLoggedIn" class="leftDrawer" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" width="300" fixed app dark temporary>
      <v-list>
        <MoleculesListItem
          :item="{icon: 'mdi-home', title: 'ダッシュボード', to: '/dashBoard', key: 'dashBoard'}"
        ></MoleculesListItem>
        <OrganismsWorkGroups></OrganismsWorkGroups>
      </v-list>
    </v-navigation-drawer>

    <!-- contents -->
    <v-app-bar class="appBar" :clipped-left="clipped" fixed app dark>
      <v-app-bar-nav-icon v-if="isLoggedIn" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <div class="userName">{{ userName }}</div>
      <v-spacer />
      <v-btn v-if="isLoggedIn" icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- right drawer -->
    <v-navigation-drawer v-if="isLoggedIn" class="rightDrawer" v-model="rightDrawer" :right="right" temporary fixed dark>
      <v-list>
        <MoleculesListItem
          :item="{icon: 'mdi-account', title: 'ユーザー設定', to: '/user', key: 'userPage'}"
        ></MoleculesListItem>
        <MoleculesListItem
          :item="{icon: 'mdi-logout-variant', title: 'ログアウト', key: 'signOut'}"
          :btnClickEvent="'signOut'"
	        @signOut="signOut"
        ></MoleculesListItem>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'EVC'
      }
    },
    computed: {
      userName() {
        return this.$store.getters["auth/name"]
      },
      isLoggedIn() {
        return this.$store.getters["auth/isLoggedIn"]
      }
    },
    methods: {
      signOut() {
        this.$store.dispatch('auth/signOut')
      }
    }
  }
</script>

<style scoped>
  .userName {
    margin-left: 20px;
  }
  .leftDrawer {
    background: linear-gradient(135deg,#424242,#616161);
  }
  .appBar {
  }
  .rightDrawer {
    background: linear-gradient(135deg,#424242,#616161);
  }
</style>
