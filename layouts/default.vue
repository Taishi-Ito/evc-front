<template>
  <v-app light>
    <OrganismsHeader />
    <MoleculesAlert />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <OrganismsFooter />
  </v-app>
</template>
<style scoped>
.v-application {
  background-color: #F5F5F5;
}
</style>
