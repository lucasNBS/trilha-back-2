import { parseCookies, setCookie } from "nookies";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { baseAxios } from "src/lib/axios";
import { User } from "src/types/user";

type AuthenticationContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  setUser: (pre: SetStateAction<User | null>) => {},
})

type AuthenticationContextProviderProps = {
  children: ReactNode
}

export function AuthenticationContextProvider({ children }: AuthenticationContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const refreshToken = parseCookies()['refresh_token']
        const request = await baseAxios.post('/token/', JSON.stringify(refreshToken))
          .then(res => res.data)
  
        setCookie(null, 'access_token', request['access_token'], { maxAge: 20, path: "/" })
        setUser(request['user'])
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}