<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      v-model="text"
      :type="type"
      :disabled="disabled"
      class="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 ring-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
</template>

<script setup lang="ts">
  const text = defineModel<string | number>('text')

  defineProps({
    type: { type: String, default: 'text' },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  })
</script>

<style scoped></style>
