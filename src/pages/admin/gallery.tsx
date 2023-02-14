import { getFeatured, getImages } from '@/lib'
import { GalleryImageForm } from '@/components'
import { Image } from '@/types'
import React from 'react'
import {RouteGuard} from '@/components'


const gallery = ({gallery}: {gallery: {images: Image[]}}) => {
    return (
        <RouteGuard>
            <>
                <GalleryImageForm/>
            </>
        </RouteGuard>
  )
}

export default gallery

export async function getServerSideProps() {
    const featured = await getFeatured()
    const gallery = await getImages("date", 1, 1000)
    return {props: {featured, gallery}}
  
  }
  