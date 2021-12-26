import { createStore } from 'vuex'
import sourceData from '@/data'

export default createStore({
  state: {
    ...sourceData,
    authId: 'rpbB8C6ifrYmNDufMERWfQUoa202',
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find((user) => user.id === state.authId)
      if (!user) return null
      return {
        ...user,
        // authUser.posts
        // authUser.getPosts()
        get posts() {
          return state.posts.filter((post) => post.userId === user.id)
        },
        // authUser.postsCount
        get postsCount() {
          return this.posts.length
        },
        // authUser.threads
        get threads() {
          return state.threads.filter((thread) => thread.userId === user.id)
        },
        // authUser.threadsCount
        get threadsCount() {
          return this.threads.length
        },
      }
    },
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'gggg' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', { post }) // set the post
      commit('appendPostToThread', {
        // append post to thread
        postId: post.id,
        threadId: post.threadId,
      })
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    },
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post)
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId)
      state.users[userIndex] = user
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId)
      thread.posts.push(postId)
    },
  },
})
