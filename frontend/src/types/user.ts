export type User = {
  id: number
  email: string
  name: string
  role: "COMMON" | "ADMIN" | "CEO"
}

export type LoginFormType = {
  email: string
  password: string
}

export type RegisterFormType = {
  email: string
  name: string
  password: string
}
