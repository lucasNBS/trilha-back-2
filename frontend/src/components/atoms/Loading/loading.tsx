import style from "./loading.module.css";

export function Loading() {
  return (
    <div className={style['container']}>
      <div className={style['loading']}></div>
    </div>
  )
}