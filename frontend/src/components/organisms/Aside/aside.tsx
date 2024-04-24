import { Navbar } from "src/components/molecules/Navbar/navbar";
import style from "./aside.module.css";
import { useContext } from "react";
import { AuthenticationContext } from "src/contexts/authenticationContext";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

export function Aside() {
  const { user, setUser } = useContext(AuthenticationContext)
  const router = useRouter()

  function handleLogout() {
    destroyCookie(null, "access_token")
    destroyCookie(null, "refresh_token")
    setUser(null)
    router.push("/login")
  }

  return (
    <aside className={style['container']}>
      {user?.id && <span className={style['username']}>Hello, {user.name}</span>}
      <Navbar />
      {user?.id && <button className={style['button-logout']} onClick={handleLogout}>Logout</button>}
    </aside>
  )
}
