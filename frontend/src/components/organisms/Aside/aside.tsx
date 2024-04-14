import { Navbar } from "src/components/molecules/Navbar/navbar";
import style from "./aside.module.css";

export function Aside() {
  return (
    <aside className={style['container']}>
      <Navbar />
    </aside>
  )
}
