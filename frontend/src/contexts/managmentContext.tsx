import { ReactNode, SetStateAction, createContext, useState } from "react";

export const ManagmentContext = createContext({
  sold: 0,
  setSold: (pre: SetStateAction<number>) => {},
  stock: 0,
  setStock: (pre: SetStateAction<number>) => {}
})

type ManagmentContextProviderProps = {
  children: ReactNode
}

export function ManagmentContextProvider({ children }: ManagmentContextProviderProps) {
  const [stock, setStock] = useState(0)
  const [sold, setSold] = useState(0)

  return (
    <ManagmentContext.Provider value={{ stock, setStock, sold, setSold }}>
      {children}
    </ManagmentContext.Provider>
  )
}