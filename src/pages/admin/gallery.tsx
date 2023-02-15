import { getFeatured, getImages, getUser } from '@/lib'
import { GalleryImageForm, EditGallery } from '@/components'
import { Image } from '@/types'
import React, {useEffect} from 'react'
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
    const featured = await getFeatured()
    const gallery = await getImages("date", 1, 1000)
    const userReq = await getUser()
    const init = userReq.user? true: false
    return {props: {featured, gallery, init}}
  
  }
  