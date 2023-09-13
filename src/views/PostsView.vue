<script setup lang="ts">
import VooPost from '@/components/VooPost.vue'
import VooSearch from '@/components/VooSearch.vue'
import postsApi from '@/api/posts'
import usersApi from '@/api/users'
import type {PostWithUserName} from '@/types'
import {computed, ref} from 'vue'

const isLoading = ref(false)
const isError = ref(false)
const isNoPosts = computed(() => !isLoading.value && !isError.value && !filteredPosts.value.length)

const author = ref('')
const postsWithUserName = ref<Array<PostWithUserName>>([])

const filteredPosts = computed(() => {
  if (!author.value) {
    return postsWithUserName.value
  }

  return postsWithUserName.value.filter(post =>
    post.userName.toLocaleLowerCase().includes(author.value)
  )
})

getData()

async function getPosts() {
  const {data} = await postsApi.getPosts()
  return data
}

async function getUsers() {
  const {data} = await usersApi.getUsers()
  return data
}

function getData() {
  isLoading.value = true
  Promise.all([getPosts(), getUsers()])
    .then(([postsData, usersData]) => {
      postsWithUserName.value = postsData.map(post => {
        const userData = usersData.find(user => user.id === post.userId)
        return {
          ...post,
          userName: userData?.name || 'неизвестный автор'
        }
      })
    })
    .catch(() => {
      isError.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <div class="container mx-auto px-3">
    <VooSearch v-model="author" />
    <VooLoader v-if="isLoading" />
    <VooErrors v-if="isError" />
    <div v-if="isNoPosts">Нет постов</div>
    <div v-else>
      <TransitionGroup
        class="grid grid-cols-posts gap-5"
        tag="ul"
      >
        <li
          v-for="post in filteredPosts"
          :key="post.id"
        >
          <VooPost :post="post" />
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.v-move,
.v-enter-active,
.v-leave-active {
  transition:
    opacity 1s,
    transform 1s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
