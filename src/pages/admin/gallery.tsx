import { getFeatured, getImages } from '@/lib'
import { EditGallery } from '@/components'
import { Image } from '@/types'
import React from 'react'
import {RouteGuard} from '@/components'


const gallery = ({gallery}: {gallery: {images: Image[]}}) => {
    return (
        <RouteGuard>
            <div className="layout">
                <div className='home'>
                    {/* <GalleryImageForm/> */}
                    <EditGallery images={gallery.images}/>
                </div>
            </div>
        </RouteGuard>
  )
}

export default gallery

export async function getServerSideProps() {
    try{
        const gallery = await getImages("date", 1, 1000)
        return {props: {gallery}}
    }catch(err){
        return {props: {gallery: []}}
    }

  
  }
  