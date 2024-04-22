import { GalleryCard } from "src/components/molecules/GalleryCard/galleryCard";
import style from "./gallery.module.css";
import { Product } from "src/types/products";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "src/components/atoms/Button/button";
import { getProducts } from "src/services/client/products";
import { ModalOptionsType } from "src/pages";
import { Loading } from "src/components/atoms/Loading/loading";

type GalleryProps = {
  initialProducts: Product[]
  maxPage: number
  setModalOptions: Dispatch<SetStateAction<ModalOptionsType>>
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export function Gallery({
  initialProducts,
  maxPage,
  setModalOptions,
  setIsModalOpen
}: GalleryProps) {
  const [products, setProducts] = useState(initialProducts)
  const [page, setPage] = useState(1)

  const firstIndex = (page - 1) * 5
  const lastIndex = page * 5

  async function getNextPage() {
    setPage(pre => pre + 1)

    if (page + 1 <= Math.ceil(products.length / 5)) return
    
    const data = await getProducts(page + 1)

    if (data.results) {
      setProducts(pre => [...pre, ...data.results])
    }
  }

  const productsToShow = products.slice(firstIndex, lastIndex)

  return (
    <section className={style['container']}>
      <div className={style['grid-container']}>
        {productsToShow.length > 0 ? productsToShow.map((product, index) => {
          return (
            <GalleryCard
              key={product.id}
              product={product}
              setProducts={setProducts}
              setModalOptions={setModalOptions}
              setIsModalOpen={setIsModalOpen}
            />)
        }) : <Loading />}
      </div>
      <div className={style['pagination-container']}>
        {page > 1 && (
          <Button
            isLink={false}
            onClick={() => setPage(pre => pre - 1)}
            text="Previous"
          />
        )}
        {page < maxPage && <Button isLink={false} onClick={getNextPage} text="Next" />}
      </div>
    </section>
  )
}