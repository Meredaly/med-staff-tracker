<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <Listbox v-model="selectedItem">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white pl-3 pr-10 text-left border border-gray-300 ring-gray-300 h-[38px] focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
        >
          <span v-if="selectedItem" class="block truncate">{{ selectedItem.name }}</span>
          <span v-else class="text-gray-400">{{ placeholder }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="item in items"
              :key="item.name"
              :value="item"
              as="template"
            >
              <li :class="[active ? 'bg-blue-100' : '', 'relative cursor-default select-none py-2 px-3 text-gray-900']">
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ item.name }}</span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  import { iDropdownItem } from '@/types'

  const selectedItem = defineModel<iDropdownItem | null>('selectedItem')

  defineProps({
    items: { type: Array as PropType<iDropdownItem[]> },
    label: { type: String, default: '' },
    placeholder: { type: String }
  })
</script>
