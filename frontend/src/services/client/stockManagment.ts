import { ManagmentForm } from "src/components/molecules/ManagmentModal/managmentModal";
import { baseAxios } from "src/lib/axios";
import { ModalOptionsType } from "src/pages";

const errorMessage = { detail: "Something went wrong" }

export async function manageStock(
  options: ModalOptionsType,
  apiType: "quantity-sold" | "quantity-stock",
  data: ManagmentForm
) {
  try {
    const res = await baseAxios.patch(
      `/product/${options.product.id}/${apiType}/`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(res => res.data)

    return res
  } catch (err) {
    return errorMessage
  }
}