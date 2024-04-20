export type User = {
  id: number
  email: string
  name: string
  role: "COMMON" | "ADMIN" | "CEO"
}