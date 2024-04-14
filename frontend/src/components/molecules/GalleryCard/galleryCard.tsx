import Image from "next/image";
import { Button } from "src/components/atoms/Button/button";
import style from "./galleryCard.module.css"
import { Product } from "src/types/products";

type GalleryCardProps = Omit<Product, "id" | "description">

export function GalleryCard({
  title,
  image,
  price,
  quantity_in_stock,
  quantity_sold,
}: GalleryCardProps) {
  return (
    <div className={style['container']}>
      <div className={style['image-container']}>
        <Image
          className={style['image']}
          src={image}
          alt="Product image"
          width={200}
          height={200}
        />
      </div>
      <div className={style['data-container']}>
        <h3 className={style['title']}>{title}</h3>
        <div className={style['info-container']}>
          <span className={style['info']}><strong>Price: </strong>{price} R$</span>
          <span className={style['info']}><strong>Stock: </strong>{quantity_in_stock}</span>
          <span className={style['info']}><strong>Sold: </strong>{quantity_sold}</span>
        </div>
        <div className={style['actions-container']}>
          <Button text="Detail" />
          <Button text="Edit" />
          <Button text="Delete" />
          <Button text="Sell" />
          <Button text="Stock" />
        </div>
      </div>
    </div>
  )
}