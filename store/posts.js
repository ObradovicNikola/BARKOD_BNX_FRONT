export const state = () => ({
  all: [],
})

export const mutations = {
  // add(state, text) {
  //   state.list.push({
  //     text,
  //     done: false
  //   })
  // },
  // remove(state, { post }) {
  //   state.list.splice(state.list.indexOf(post), 1)
  // },
  // toggle(state, todo) {
  //   todo.done = !todo.done
  // }
  setPosts(state, all) {
    state.all = all
  },
}

export const actions = {
  async getPosts({ commit }) {
    const all = await this.$axios.$get(
      'https://jsonplaceholder.typicode.com/posts'
    )
    commit('setPosts', all)
  },
}
