import { ReactNode } from "react";
import style from "./userForm.module.css";
import Link from "next/link";

type UserFormProps = {
  children: ReactNode
  handleSubmit: (e: any) => Promise<void>
  type: "Register" | "Login"
}

export function UserForm({ children, handleSubmit, type }: UserFormProps) {  
  return (
    <section className={style['container']}>
      <div className={style['card-container']}>
        <h2 className={style['title']}>{type}</h2>
        <form method="post" className={style['form-container']} onSubmit={handleSubmit}>
          {children}
        </form>
        <div className={style['message-text']}>
          <p className={style['message']}>
            {type === "Register" ? "Don't have an account?" : "Already has an account?"}
          </p>
          <Link
            className={style['link']}
            prefetch={false}
            href={type === "Register" ? `/login` : '/register'}
          >
            {type === "Register" ? "Login" : "Register"}
          </Link>
        </div>
      </div>
    </section>
  )
}