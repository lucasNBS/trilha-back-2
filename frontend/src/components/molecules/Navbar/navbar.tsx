import Link from "next/link";
import style from "./navbar.module.css";
import { useContext } from "react";
import { AuthenticationContext } from "src/contexts/authenticationContext";

export function Navbar() {
  const { user } = useContext(AuthenticationContext)

  return (
    <nav className={style['container']}>
      <ul className={style['list-container']}>
        <li className={style['list-item']}>
          <Link href="/" prefetch={false}>Home</Link>
        </li>
        <li className={style['list-item']}>
          <Link href="/product/new" prefetch={false}>New Product</Link>
        </li>
      </ul>
    </nav>
  )
}