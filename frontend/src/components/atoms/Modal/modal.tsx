import { Dispatch, ReactNode, SetStateAction } from "react";
import style from "./modal.module.css";

type ModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export function Modal({ setIsOpen, children }: ModalProps) {
  return (
    <>
      <div className={style['background']} onClick={() => setIsOpen(false)}>
        <div className={style['modal-container']} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  )
}