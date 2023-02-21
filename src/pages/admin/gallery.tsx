import { getImages } from '@/lib'
import { EditGallery } from '@/components'
import { Image } from '@/types'
import React from 'react'
import {RouteGuard} from '@/components'
import pool from '@/lib/db/pool'


const Gallery = ({gallery}: {gallery: Image[]}) => {
    return (
        <RouteGuard>
            <div className="layout">
                <div className='home'>
                    {/* <GalleryImageForm/> */}
                    <EditGallery images={gallery}/>
                </div>
            </div>
        </RouteGuard>
  )
}

export default Gallery

export async function getServerSideProps() {
    try{
      const gallery = await pool.query(
        'SELECT * FROM site.gallery_images'
      )
      return {props: {gallery: JSON.parse(JSON.stringify(gallery.rows))}}
    } catch(error){
      console.log(error)
      return {props: {gallery: null}}
    }
  }
  