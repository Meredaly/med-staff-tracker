<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <TextField v-model:text="form.full_name" label="ФИО" />
              <Dropdown
                label="Отделение"
                v-model:selected-item="selectedDepartment"
                :items="staffStore.departments"
                placeholder="Выберите отделение"
                class="mt-4"
              />
              <div class="flex justify-end gap-2 mt-4">
                <button
                  @click="close"
                  class="rounded-md bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold text-gray-800 shadow-sm hover:bg-gray-200"
                >
                  Отмена
                </button>
                <button
                  @click="save"
                  class="rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                  Сохранить
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
  import { PropType, ref, reactive, watchEffect } from 'vue'
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'

  import TextField from '@/components/ui/TextField.vue'
  import Dropdown from '@/components/ui/Dropdown.vue'

  import { INurse, iDropdownItem } from '@/types'
  import { useStaffStore } from '@/store/staff'

  const isOpen = defineModel<boolean>('isOpen')
  const emit = defineEmits(['close', 'save'])

  const props = defineProps({
    data: {
      type: Object as PropType<INurse | null>,
      default: null
    }
  })

  const staffStore = useStaffStore()

  const form = reactive<INurse>({
    id: 0,
    full_name: '',
    department_id: 0
  })

  const selectedDepartment = ref<iDropdownItem | null>(null)

  watchEffect(() => {
    form.id = props.data?.id || 0
    form.full_name = props.data?.full_name || ''
    form.department_id = props.data?.department_id || 0

    selectedDepartment.value = staffStore.departments.find((item) => item.id === form.department_id) || null
  })

  function close() {
    isOpen.value = false
    emit('close')
    clear()
  }

  function save() {
    emit('save', {
      ...form,
      department_id: selectedDepartment.value?.id || 0
    })
    clear()
  }

  function clear() {
    form.id = 0
    form.full_name = ''
    form.department_id = 0
    selectedDepartment.value = null
  }
</script>
