<template>
  <div class="container mx-auto py-4">
    <button
      @click="addNurse"
      class="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500"
    >
      <PlusIcon class="w-5 h-5" />
      <p>Добавить медсестру</p>
    </button>
    <table class="min-w-full divide-y divide-gray-200 mt-4">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            width="1"
          >
            n
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ФИО
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Отделение
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            width="1"
          ></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(nurse, index) in staffStore.nurses" :key="nurse.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ nurse.full_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ staffStore.getDepartmentName(nurse.department_id) }}
          </td>
          <td>
            <div class="flex">
              <button @click="editNurse(nurse)" class="text-indigo-600 hover:text-indigo-900">
                <PencilIcon class="w-5 h-5" />
              </button>
              <button @click="deleteNurse(nurse)" class="text-red-600 hover:text-red-900 ml-2">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  ]
  <NurseModal v-model:is-open="isOpenNurseModal" :data="selectedNurse" @save="saveNurse" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/vue/20/solid'
  import { useStaffStore } from '@/store/staff'
  import type { INurse } from '@/types'

  import NurseModal from '@/components/NurseModal.vue'

  const staffStore = useStaffStore()

  function deleteNurse(nurse: INurse) {
    staffStore.deleteNurse(nurse)
  }
  const selectedNurse = ref<INurse | null>(null)
  function editNurse(nurse: INurse) {
    selectedNurse.value = nurse
    openNurseModal()
  }

  function saveNurse(form: INurse) {
    if (form.id) {
      staffStore.updateNurse(form)
    } else {
      staffStore.addNurse(form)
    }
    closeNurseModal()
  }

  function addNurse() {
    selectedNurse.value = null
    openNurseModal()
  }

  const isOpenNurseModal = ref(false)
  function openNurseModal() {
    isOpenNurseModal.value = true
  }
  function closeNurseModal() {
    isOpenNurseModal.value = false
  }
</script>

<style scoped></style>
