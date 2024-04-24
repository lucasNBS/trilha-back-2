import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/atoms/Button/button";
import { Input } from "src/components/atoms/Input/input";
import { Modal } from "src/components/atoms/Modal/modal";
import { ModalOptionsType } from "src/pages";
import * as Yup from "yup";
import { ManagmentContext } from "src/contexts/managmentContext";
import style from "./managmentModal.module.css";
import { baseAxios } from "src/lib/axios";
import { manageStock } from "src/services/client/stockManagment";

export type ManagmentForm = {
  quantity_sold?: number
  quantity_in_stock?: number
  operation: string
}

type ManagmentModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  options: ModalOptionsType
}

const ManagmentFormSchema = Yup.object().shape({
  quantity_sold: Yup.number()
    .typeError("This field must be a number")
    .min(0, "This field cannot be negative"),
  quantity_in_stock: Yup.number()
    .typeError("This field must be a number")
    .min(0, "This field cannot be negative"),
  operation: Yup.string()
    .required()
    .test("is valid", "Invalid value", (val) => val === "remove" || val === "add")
})

export function ManagmentModal({ setIsOpen, options }: ManagmentModalProps) {
  const name = options.type === "Sell" ? 'quantity_sold' : 'quantity_in_stock'
  const apiType = options.type === "Sell" ? 'quantity-sold' : 'quantity-stock'

  const { setSold, setStock, setSales, setEditedProductId } = useContext(ManagmentContext)
  const {
      register,
      formState: { errors },
      setValue,
      setError,
      handleSubmit
    } = useForm<ManagmentForm>({
    resolver: yupResolver(ManagmentFormSchema)
  })

  async function submit(data: ManagmentForm) {
    const value = data[name]

    const res = await manageStock(options, apiType, data)

    if (res.detail) {
      setError(name, { message: res.detail })
    } else {
      setIsOpen(false)
      setEditedProductId(options.product.id)

      if (name === 'quantity_in_stock' && typeof value === 'number') {
        if (data.operation === 'add') {
          setStock(pre => pre + value)
        }
        if (data.operation === 'remove') {
          setStock(pre => pre - value)
        }
      }

      if (name === 'quantity_sold' && typeof value === 'number') {
        if (data.operation === 'add') {
          setSold(pre => pre + value)
          setStock(pre => pre - value)
          setSales(pre => pre + value * options.product.price)
        }
        if (data.operation === 'remove') {
          setSold(pre => pre - value)
          setStock(pre => pre + value)
          setSales(pre => pre - value * options.product.price)
        }
      }
    }
  }

  return (
    <Modal setIsOpen={setIsOpen}>
      <form className={style['container']} method="post" onSubmit={handleSubmit(submit)}>
        <h2 className={style['title']}>Manage {options.type}</h2>
        <Input register={register} name={name} type="number" error={errors[name]?.message} />
        <div className={style['actions-container']}>
          <Button
            isLink={false}
            text="Remove"
            type="delete"
            onClick={() => {
              setValue("operation", "remove")
            }}
          />
          <Button
            isLink={false}
            text="Add"
            type="manage"
            onClick={() => {
              setValue("operation", "add")
            }}
          />
        </div>
      </form>
    </Modal>
  )
}