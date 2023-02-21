import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getImage } from '@/lib'
import { Image as ImageType } from '@/types'
import Image from 'next/image'
import { Navbar } from '@/components'
import pool from '@/lib/db/pool'
import { GetServerSidePropsContext } from 'next'

const apiRoute = process.env.NEXT_PUBLIC_SERVER_URL?process.env.NEXT_PUBLIC_SERVER_URL: ""
const ImageDetail = ({image}: ImageProp) => {


  return (
    <>
    <Navbar/>
    <div className="layout">
        <main className="image-page-container">
            {image? <ImageContainer image={image}/>: <h2>404</h2>}
        </main>   
    </div>
    </>
  )
}

type ImageProp = {image: ImageType}

function ImageContainer({image}: ImageProp){
    const {file_name, image_description, title, date_posted} = image
    const dateString = new Date(date_posted).toLocaleDateString()
    const parseDetail = (string: String) => string.split('\n').map((line, index) => <p key={`${line}${index}`}>{line}</p>)
    const src = `${apiRoute}/static/images_gallery/${file_name}`
    return (
        <div>
            <div className="image-container">
                <Image
                    alt={title}
                    className="main-image"
                    src={src}
                    height={500}
                    width={1400}
                />
            </div>
            <div className='layout'>
            <div className="image-detail-container">
                <h2>{title}</h2>
                <p id="date-posted">{dateString}</p>
                <div className="image-description">
                    {parseDetail(image_description)}
                </div>
            </div>
            </div>

        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    try{
        const {fileName} = context.query
        const images = await pool.query(
            'SELECT * FROM site.gallery_images WHERE file_name=$1',
            [fileName]
        )
        if (images.rows.length > 0){
            return({props: {image: images.rows[0]}})
        } else{
            return({props: {image: null}})
        }
    } catch (err){
        console.log(err)
    }
}

export default ImageDetail