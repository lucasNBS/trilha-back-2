import Image from "next/image";
import { Button } from "src/components/atoms/Button/button";
import style from "./galleryCard.module.css"
import { Product } from "src/types/products";
import { Dispatch, SetStateAction, useContext } from "react";
import { ManagmentContext } from "src/contexts/managmentContext";
import { ModalOptionsType } from "src/pages";

type GalleryCardProps = {
  product: Product
  setProducts: Dispatch<SetStateAction<Product[]>>
  setModalOptions: Dispatch<SetStateAction<ModalOptionsType>>
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export function GalleryCard({
  product,
  setProducts,
  setModalOptions,
  setIsModalOpen
}: GalleryCardProps) {
  const { setSold, setStock } = useContext(ManagmentContext)
  
  async function handleDeleteProduct() {
    try {
      await fetch(`http://127.0.0.1:8000/products/${product.id}/`, { method: "DELETE" })
  
      setProducts(pre => pre.filter(item => item.id !== product.id))
      setSold(pre => pre - product.quantity_sold)
      setStock(pre => pre - product.quantity_in_stock)
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className={style['container']}>
      <div className={style['image-container']}>
        <Image
          className={style['image']}
          src={product.image}
          alt="Product image"
          width={200}
          height={200}
        />
      </div>
      <div className={style['data-container']}>
        <h3 className={style['title']}>{product.title}</h3>
        <div className={style['info-container']}>
          <span className={style['info']}><strong>Price: </strong>{product.price} R$</span>
          <span className={style['info']}><strong>Stock: </strong>{product.quantity_in_stock}</span>
          <span className={style['info']}><strong>Sold: </strong>{product.quantity_sold}</span>
        </div>
        <div className={style['actions-container']}>
          <Button isLink={true} text="Detail" href={`/product/${product.id}/`} />
          <Button isLink={true} text="Edit" href={`/product/${product.id}/edit`} />
          <Button
            isLink={false}
            text="Delete"
            type="delete"
            onClick={handleDeleteProduct}
          />
          <Button
            isLink={false}
            text="Sell"
            type="manage"
            onClick={() => {
              setModalOptions({ product: product, type: "Sell" })
              setIsModalOpen(true)
            }}
          />
          <Button
            isLink={false}
            text="Stock"
            type="manage"
            onClick={() => {
              setModalOptions({ product: product, type: "Stock" })
              setIsModalOpen(true)
            }}
          />
        </div>
      </div>
    </div>
  )
}