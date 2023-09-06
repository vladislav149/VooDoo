<script lang="ts" setup>
import SearchIcon from '@/assets/search.svg'
import {ref} from 'vue'

const author = ref('')

const emit = defineEmits({
  filter: (author: string) => {
    return typeof author === 'string'
  }
})

function filterByAuthor() {
  emit('filter', author.value.toLocaleLowerCase())
  author.value = ''
}
</script>

<template>
  <form
    class="flex justify-center mb-10"
    @submit.prevent="filterByAuthor"
  >
    <button
      class="bg-white w-10 h-10 flex justify-center items-center border-2 border-r-0 text-black hover:bg-sky-600 hover:border-sky-600 hover:text-white duration-300"
      type="submit"
    >
      <Component
        class="w-4 h-4"
        :is="SearchIcon"
      />
    </button>
    <label>
      <input
        class="h-10 border-2 pl-2 outline-sky-600 hover:border-sky-600 duration-300"
        type="text"
        placeholder="Filter by author"
        v-model="author"
      />
    </label>
  </form>
</template>
