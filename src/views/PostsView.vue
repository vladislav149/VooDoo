<script setup lang="ts">
import VooPost from '@/components/VooPost.vue'
import VooSearch from '@/components/VooSearch.vue'
import postsApi from '@/api/posts'
import usersApi from '@/api/users'
import type {PostWithUserName} from '@/types'
import {computed, onMounted, ref, toRaw} from 'vue'

const isLoading = ref(false)
const isError = ref(false)

let originalPostsWithUserName: Array<PostWithUserName> = []
const postsWithUserName = ref<Array<PostWithUserName>>([])
const isNoPosts = computed(
  () => !isLoading.value && !isError.value && !postsWithUserName.value.length
)

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
  //комментарий для про ревьювиров
  //посчитал, что посты и юзеры критические важные данные, поэтому обернул их в Promise.all
  Promise.all([getPosts(), getUsers()])
    .then(([postsData, usersData]) => {
      postsWithUserName.value = postsData.map(post => {
        const userData = usersData.find(user => user.id === post.userId)
        return {
          ...post,
          userName: userData?.name || 'неизвестный автор'
        }
      })

      originalPostsWithUserName = structuredClone(toRaw(postsWithUserName.value))
    })
    .catch(() => {
      isError.value = true
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => getData())

function filter(author: string) {
  if (!author) {
    postsWithUserName.value = structuredClone(originalPostsWithUserName)
    return
  }

  postsWithUserName.value = originalPostsWithUserName.filter(post =>
    post.userName.toLocaleLowerCase().includes(author)
  )
}
</script>

<template>
  <div class="container mx-auto px-3">
    <VooSearch @filter="filter" />
    <VooLoader v-if="isLoading" />
    <VooErrors v-if="isError" />
    <div v-if="isNoPosts">Нет постов</div>
    <div v-else>
      <ul class="grid grid-cols-posts gap-5">
        <li
          v-for="post in postsWithUserName"
          :key="post.id"
        >
          <VooPost :post="post" />
        </li>
      </ul>
    </div>
  </div>
</template>
