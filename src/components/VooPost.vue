<script lang="ts" setup>
import type {PostWithUserName} from '@/types'

defineProps<{
  post: PostWithUserName
}>()
</script>

<template>
  <article class="flex flex-col h-80 bg-white p-5 shadow-xl">
    <h1 class="mb-5 text-sky-600 font-black text-lg first-letter:uppercase">{{ post.title }}</h1>
    <p class="first-letter:uppercase mb-auto line-clamp-5">{{ post.body }}</p>
    <cite class="text-gray-400 mt-5">{{ post.userName }}</cite>
  </article>
</template>
