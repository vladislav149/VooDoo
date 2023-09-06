<script lang="ts" setup>
import type {PostWithUserName} from '@/types'
interface Post {
  post: PostWithUserName
}
defineProps<Post>()
</script>

<template>
  <article class="bg-white p-5 shadow-xl">
    <h1 class="mb-5 text-sky-600 font-black text-lg first-letter:uppercase">{{ post.title }}</h1>
    <p class="first-letter:uppercase mb-5">{{ post.body }}</p>
    <cite class="text-gray-400">{{ post.userName }}</cite>
  </article>
</template>
