import React from 'react'
import Link from 'next/link'

type Image = {
  fileName: string,
  datePosted: string,
  title: string,
  imageDescription: string
}

const Image = (image: Image) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>

        </div>
      </Link>
    </div>
  )
}

export default Product