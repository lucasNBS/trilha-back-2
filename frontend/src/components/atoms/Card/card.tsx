import style from "./card.module.css";

type CardProps = {
  title: string
  content: number
}

export function Card({  title, content }: CardProps) {
  return (
    <div className={style['container']}>
      <h3 className={style['title']}>{title}</h3>
      <span className={style['content']}>{content}</span>
    </div>
  )
}