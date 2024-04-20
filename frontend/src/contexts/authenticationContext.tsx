import { parseCookies } from "nookies";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
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
      const request = await fetch('http://127.0.0.1:8000/user/',
        {
          method: 'GET',
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => res.json())

      console.log(request)
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