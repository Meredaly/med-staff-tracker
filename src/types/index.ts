export interface IDoctor {
  id: number
  full_name: string
  department_id: number
  is_head: boolean
}

export interface INurse {
  id: number
  full_name: string
  department_id: number
}

export interface iDepartment {
  id: number
  name: string
}

export interface iDropdownItem {
  id: number
  name: string
}
