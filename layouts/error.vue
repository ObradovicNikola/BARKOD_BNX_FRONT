<template>
  <v-main style="max-width: 600px; margin: auto">
    <v-alert prominent type="error">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
    </v-alert>
    <NuxtLink to="/" class="text-decoration-none">
      <v-btn x-large block color="info" class="mt-12">
        <v-icon left>mdi-home</v-icon>
        Home page</v-btn
      >
    </NuxtLink>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
