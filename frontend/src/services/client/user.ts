import { baseAxios } from "src/lib/axios";
import { LoginFormType, RegisterFormType } from "src/types/user";

const errorMessage = { detail: 'Something went wrong' }

export async function login(data: LoginFormType) {
  try {
    const res = await baseAxios.post('/login/', JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => res.data)

    return res
  } catch (err) {
    return errorMessage
  }
}

export async function register(data: RegisterFormType) {
  try {
    const res = await baseAxios.post('/register/', JSON.stringify(data))
      .then(res => res.data)

    return res
  } catch (err) {
    return errorMessage
  }
}