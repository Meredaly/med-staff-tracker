<template>
  <div class="flex items-center">
    <input id="checkbox" v-model="checked" type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
    <label for="checkbox" class="ml-2 text-gray-700">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
  const checked = defineModel<boolean>('checked')

  defineProps({
    label: {
      type: String,
      default: ''
    }
  })
</script>

<style scoped></style>
