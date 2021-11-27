<template>
  <v-app-bar app flat dark height="">
    <v-toolbar flat>
      <v-toolbar-title>BARKOD EXCHANGE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-md-flex">
        <v-btn v-for="item in menuItems" :key="item.icon" :to="item.link" text
          >{{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <!-- <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = true"
      ></v-app-bar-nav-icon> -->
    </v-toolbar>
    <!-- <v-navigation-drawer v-model="drawer" app right absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="blue-grey--text text--accent-4"
        >
          <v-list-item color="info" to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>

          <v-list-item to="/contact">
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer> -->
  </v-app-bar>
</template>

<script>
const data = () => ({
  drawer: false,
  group: null,
  menuItems: [
    {
      title: 'Home',
      icon: 'home',
      link: '/',
    },
    // {
    //   title: 'About',
    //   icon: 'info',
    //   link: '/about',
    // },
    // {
    //   title: 'Contact',
    //   icon: 'email',
    //   link: '/contact',
    // },
  ],
})

export default {
  name: 'AppHeader',
  data,
}
</script>
