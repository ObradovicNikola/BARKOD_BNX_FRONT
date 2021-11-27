<template>
  <div class="home">
    <h1>Home page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus
      et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,
      nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus
      sapien nunc eget.
    </p>
    <h1 class="mb-3">Users:</h1>
    <div v-for="user in users" :key="`user-${user.id}`">
      <div class="d-flex">
        <p class="mr-4" style="min-width: 150px">
          <strong>Name:</strong> {{ user.first_name }}
        </p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
    </div>
    <h1>Posts:</h1>
    <div v-for="post in posts" :key="post.id">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <br />
    </div>
  </div>
</template>

<script>
const name = 'HomePage'

const asyncData = async function ({ $axios }) {
  const dataJSON = await $axios.$get('https://reqres.in/api/users?page=2')
  // const res = await $axios.get('https://jsonplaceholder.typicode.com/posts')
  // console.log(res.data)
  const users = dataJSON.data
  return { users }
}
// const methods = {
//   async fetchSomething() {
//     const ip = await this.$axios.$get('http://icanhazip.com')
//     this.ip = ip
//   },
// }

const created = function () {
  // console.log('created')
  this.$store.dispatch('posts/getPosts')
}

// calls every time the route changes
const mounted = function () {
  // console.log('mounted')
}

const computed = {
  posts() {
    return this.$store.state.posts.all.slice(0, 5)
  },
}
export default { name, asyncData, computed, created, mounted }
</script>
