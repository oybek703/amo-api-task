export interface IAmoApiContact {
  name: string
  email: string
  phone: string
}

export interface IAmoContactResponse {
  _page: number
  _links: Links
  _embedded: Embedded
}

export interface Links {
  self: Self
}

export interface Self {
  href: string
}

export interface Embedded {
  contacts: Contact[]
}

export interface Contact {
  id: number
  name: string
  first_name: string
  last_name: string
  responsible_user_id: number
  group_id: number
  created_by: number
  updated_by: number
  created_at: number
  updated_at: number
  closest_task_at: any
  is_deleted: boolean
  is_unsorted: boolean
  custom_fields_values: CustomFieldsValue[]
  account_id: number
  _links: Links2
  _embedded: Embedded2
}

export interface CustomFieldsValue {
  field_id: number
  field_name: string
  field_code: string
  field_type: string
  values: Value[]
}

export interface Value {
  value: string
  enum_id: number
  enum_code: string
}

export interface Links2 {
  self: Self2
}

export interface Self2 {
  href: string
}

export interface Embedded2 {
  tags: any[]
  companies: any[]
}
