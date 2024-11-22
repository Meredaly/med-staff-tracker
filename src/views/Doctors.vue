<template>
  <div class="container mx-auto py-4">
    <button
      @click="addDoctor"
      class="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500"
    >
      <PlusIcon class="w-5 h-5" />
      <p>Добавить доктора</p>
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
        <tr v-for="(doctor, index) in staffStore.doctors" :key="doctor.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ doctor.full_name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ staffStore.getDepartmentName(doctor.department_id) }}{{ doctor.is_head ? ', Заведующий отделения' : '' }}
          </td>
          <td>
            <div class="flex">
              <button @click="editDoctor(doctor)" class="text-indigo-600 hover:text-indigo-900">
                <PencilIcon class="w-5 h-5" />
              </button>
              <button @click="deleteDoctor(doctor)" class="text-red-600 hover:text-red-900 ml-2">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  ]
  <DoctorModal v-model:is-open="isOpenDoctorModal" :data="selectedDoctor" @save="saveDoctor" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/vue/20/solid'
  import { useStaffStore } from '@/store/staff'
  import type { IDoctor } from '@/types'

  import DoctorModal from '@/components/DoctorModal.vue'

  const staffStore = useStaffStore()

  function deleteDoctor(doctor: IDoctor) {
    staffStore.deleteDoctor(doctor)
  }
  const selectedDoctor = ref<IDoctor | null>(null)
  function editDoctor(doctor: IDoctor) {
    selectedDoctor.value = doctor
    openDoctorModal()
  }

  function saveDoctor(form: IDoctor) {
    if (form.id) {
      staffStore.updateDoctor(form)
    } else {
      staffStore.addDoctor(form)
    }
    closeDoctorModal()
  }

  function addDoctor() {
    selectedDoctor.value = null
    openDoctorModal()
  }

  const isOpenDoctorModal = ref(false)
  function openDoctorModal() {
    isOpenDoctorModal.value = true
  }
  function closeDoctorModal() {
    isOpenDoctorModal.value = false
  }
</script>

<style scoped></style>
