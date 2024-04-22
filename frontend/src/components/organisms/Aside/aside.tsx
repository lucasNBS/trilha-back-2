import { Navbar } from "src/components/molecules/Navbar/navbar";
import style from "./aside.module.css";
import { useContext } from "react";
import { AuthenticationContext } from "src/contexts/authenticationContext";
import { destroyCookie } from "nookies";

export function Aside() {
  const { user, setUser } = useContext(AuthenticationContext)

  function handleLogout() {
    destroyCookie(null, "access_token")
    destroyCookie(null, "refresh_token")
    setUser(null)
  }
  
  return (
    <aside className={style['container']}>
      <Navbar />
      {user && <button className={style['button-logout']} onClick={handleLogout}>Logout</button>}
    </aside>
  )
}
