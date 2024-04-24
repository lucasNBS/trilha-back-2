import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { tokenRefresh } from "src/services/client/token";
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
      const res = await tokenRefresh()

      if (res) {
        setUser(res['user'])
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