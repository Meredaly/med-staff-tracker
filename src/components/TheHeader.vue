<template>
  <div class="bg-blue-500 p-4 bg-white border-b border-gray-200">
    <div class="container mx-auto">
      <div class="flex justify-center space-x-4 text-gray-600">
        <router-link to="/doctors" active-class="text-blue-600" class="hover:text-blue-600"> Врачи </router-link>
        <router-link to="/nurses" active-class="text-blue-600" class="hover:text-blue-600"> Медсестры </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
