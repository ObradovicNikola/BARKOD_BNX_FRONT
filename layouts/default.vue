<template>
  <v-app color="red lighten-4">
    <app-header />
    <v-main class="main-container px-10">
      <!-- style="max-width: 1200px" -->
      <!-- <v-container class=""> -->
      <Nuxt />
      <!-- </v-container> -->
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- <v-bottom-navigation v-model="value" :background-color="color"> -->
    <!-- hide-on-scroll -->
    <!-- <v-bottom-navigation
      :background-color="color"
      dark
      shift
      fixed
      class="d-md-none"
    >
      <v-btn exact to="/" @click="color = 'blue-grey'">
        <span>Home</span>
        <v-icon class="mx-auto">mdi-home</v-icon>
      </v-btn>

      <v-btn to="/about" @click="color = 'teal'">
        <span>About</span>
        <v-icon class="mx-auto">mdi-account</v-icon>
      </v-btn>

      <v-btn to="/info" @click="color = 'brown'">
        <span>Book</span>
        <v-icon class="mx-auto">mdi-book</v-icon>
      </v-btn>

      <v-btn to="/contact" @click="color = 'indigo'">
        <span>Contact</span>
        <v-icon class="mx-auto">mdi-email</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
  </v-app>
</template>

<script>
const name = 'NuxtDefaultLayout'
const data = () => ({
  color: 'blue-grey',
})

export default { name, data }
</script>

<style scoped>
.main-container {
  background: linear-gradient(to bottom, #1b1824 55%, white 50%);
}

@media only screen and (max-width: 800px) {
  .main-container {
    background: linear-gradient(to bottom, #1b1824 40%, white 30%);
  }
}
</style>
