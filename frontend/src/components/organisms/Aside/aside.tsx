import { Navbar } from "src/components/molecules/Navbar/navbar";
import style from "./aside.module.css";
import { Button } from "src/components/atoms/Button/button";
import { useContext } from "react";
import { AuthenticationContext } from "src/contexts/authenticationContext";
import { destroyCookie } from "nookies";

function handleLogout() {
  destroyCookie(null, "accessToken")
  destroyCookie(null, "refreshToken")
}

export function Aside() {
  const { user } = useContext(AuthenticationContext)
  
  return (
    <aside className={style['container']}>
      <Navbar />
      {user && <button className={style['button-logout']} onClick={handleLogout}>Logout</button>}
    </aside>
  )
}
