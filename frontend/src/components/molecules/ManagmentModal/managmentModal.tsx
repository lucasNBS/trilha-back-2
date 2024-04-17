import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/atoms/Button/button";
import { Input } from "src/components/atoms/Input/input";
import { Modal } from "src/components/atoms/Modal/modal";
import { ModalOptionsType } from "src/pages";
import * as Yup from "yup";
import style from "./managmentModal.module.css";

export type ManagmentForm = {
  [k: string]: number
}

type ManagmentModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  options: ModalOptionsType
}

export function ManagmentModal({ setIsOpen, options }: ManagmentModalProps) {
  const name = options.type === "Sell" ? 'quantity_sold' : 'quantity_in_stock'

  const ManagmentFormSchema = Yup.object().shape({
    [name]: Yup.number()
      .typeError("This field must be a number")
      .required("This field is required")
      .min(0, "This field cannot be negative")
  })

  const { register, formState: { errors }, handleSubmit } = useForm<ManagmentForm>({
    resolver: yupResolver(ManagmentFormSchema)
  })

  return (
    <Modal setIsOpen={setIsOpen}>
      <form className={style['container']}>
        <h2 className={style['title']}>Manage {options.type}</h2>
        <Input register={register} name={name} type="number" error={errors[name]?.message} />
        <div className={style['actions-container']}>
          <Button isLink={false} text="Remove" type="delete" onClick={() => {}} />
          <Button isLink={false} text="Add" type="manage" onClick={() => {}} />
        </div>
      </form>
    </Modal>
  )
}