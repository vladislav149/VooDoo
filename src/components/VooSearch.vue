<script lang="ts" setup>
import SearchIcon from '@/assets/search.svg'
import {computed} from 'vue'

const props = defineProps<{
  modelValue: String
}>()

const emit = defineEmits(['update:modelValue'])

const author = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value.toLocaleLowerCase())
})
</script>

<template>
  <form
    class="flex justify-center mb-10"
    @submit.prevent
  >
    <button
      class="bg-white w-10 h-10 flex justify-center items-center border-2 border-r-0 text-black hover:bg-sky-600 hover:border-sky-600 hover:text-white duration-300"
      type="submit"
    >
      <SearchIcon class="w-4 h-4" />
    </button>
    <label>
      <input
        class="h-10 border-2 pl-2 outline-sky-600 hover:border-sky-600 duration-300"
        type="text"
        placeholder="Filter by author"
        autofocus
        v-model.lazy="author"
      />
    </label>
  </form>
</template>
