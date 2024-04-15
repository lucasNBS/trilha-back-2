import { GalleryCard } from "src/components/molecules/GalleryCard/galleryCard";
import style from "./gallery.module.css";
import { Product } from "src/types/products";
import { useState } from "react";
import { Button } from "src/components/atoms/Button/button";
import { getProducts } from "src/services/products";

type GalleryProps = {
  previous: string | null
  next: string | null
  initialProducts: Product[]
  maxPage: number
}

export function Gallery({ previous, next, initialProducts, maxPage }: GalleryProps) {
  const [products, setProducts] = useState(initialProducts)
  const [page, setPage] = useState(1)

  const firstIndex = (page - 1) * 5
  const lastIndex = page * 5

  async function getNextPage() {
    setPage(pre => pre + 1)

    if (page + 1 <= Math.ceil(products.length / 5)) return
    
    const data = await getProducts(page + 1)

    setProducts(pre => [...pre, ...data.results])
  }

  return (
    <section className={style['container']}>
      <div className={style['grid-container']}>
        {products.slice(firstIndex, lastIndex).map((product, index) => {
          return (
            <GalleryCard
              key={index}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              quantity_in_stock={product.quantity_in_stock}
              quantity_sold={product.quantity_sold}
            />)
        })}
      </div>
      <div className={style['pagination-container']}>
        {page > 1 && (
          <Button
            isLink={false}
            onClick={() => setPage(pre => pre - 1)}
            text="Previous"
          />
        )}
        {page < maxPage && <Button isLink={false} onClick={() => getNextPage()} text="Next" />}
      </div>
    </section>
  )
}