import {createRouter, createWebHistory} from 'vue-router'
const PostsView = () => import('@/views/PostsView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {name: 'posts'}
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView
    }
  ]
})

export default router
