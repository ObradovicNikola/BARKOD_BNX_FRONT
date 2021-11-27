<template>
  <v-app color="red lighten-4">
    <app-header />
    <v-main>
      <v-container class="my-5" style="max-width: 1200px">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- <v-bottom-navigation v-model="value" :background-color="color"> -->
    <!-- hide-on-scroll -->
    <v-bottom-navigation
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
    </v-bottom-navigation>
  </v-app>
</template>

<script>
const name = 'NuxtDefaultLayout'
const data = () => ({
  color: 'blue-grey',
})

export default { name, data }
</script>
