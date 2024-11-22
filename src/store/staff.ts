import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IDoctor, INurse, iDepartment } from '@/types'
import mockData from '@/mock/staff.json'

export const useStaffStore = defineStore('staff', () => {
  const doctors = ref<IDoctor[]>(mockData.doctors)
  const nurses = ref<INurse[]>(mockData.nurses)
  const departments = ref<iDepartment[]>(mockData.departments)

  function getDepartment(departmentId: number) {
    return departments.value.find((department) => department.id === departmentId) || null
  }

  function getDepartmentName(departmentId: number) {
    return getDepartment(departmentId)?.name || ''
  }

  function deleteDoctor(doctor: IDoctor) {
    const index = doctors.value.findIndex((doc) => doc.id === doctor.id)
    doctors.value.splice(index, 1)
  }

  function addDoctor(form: IDoctor) {
    form.id = Math.round(Math.random() * 1000000)
    doctors.value.unshift(form)
    selectHead(form)
  }

  function updateDoctor(form: IDoctor) {
    const findIndex = doctors.value.findIndex((doctor: IDoctor) => doctor.id === form.id)

    if (findIndex !== -1) {
      doctors.value[findIndex] = form
    }
    selectHead(form)
  }

  function selectHead(doctor: IDoctor) {
    doctors.value.forEach((doc) => {
      if (doc.department_id !== doctor.department_id) {
        return
      }

      doc.is_head = doc.id === doctor.id
    })
  }

  function deleteNurse(nurse: INurse) {
    const index = nurses.value.findIndex((n) => n.id === nurse.id)
    nurses.value.splice(index, 1)
  }

  function addNurse(form: INurse) {
    form.id = Math.round(Math.random() * 1000000)
    nurses.value.unshift(form)
  }

  function updateNurse(form: INurse) {
    const findIndex = nurses.value.findIndex((nurse: INurse) => nurse.id === form.id)

    if (findIndex !== -1) {
      nurses.value[findIndex] = form
    }
  }

  return {
    doctors,
    nurses,
    departments,
    getDepartment,
    getDepartmentName,
    deleteDoctor,
    addDoctor,
    updateDoctor,
    deleteNurse,
    addNurse,
    updateNurse
  }
})
