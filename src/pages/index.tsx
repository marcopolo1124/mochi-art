import { getImages} from '@/lib'
import { Image } from 'types'
import React from 'react'
import { HeroBanner, Featured, Navbar } from '../components'
import db from '@/lib/db'

type homeProps = {
  featured: {images: Image[]}
  gallery: {images: Image[]}
  error: null | string
}

const Home = ({featured, gallery, error}: homeProps) => {
  
  console.log(featured, gallery)
  return (
    <>
    <Navbar/>
    <div className="layout">
      <div className="home">
          <HeroBanner/>
          <main className='main-container'>
          {gallery !== null? <Featured images={gallery.images}/>: <p>Cannot load featured</p>}
          {/* <Gallery images={gallery.images}/> */}
          </main>
      </div>
    </div>

    </>

  )
}

export async function getServerSideProps() {
  try{
    const gallery = await getImages("date", 1, 1000)
    return {props: {gallery}}
  } catch(error){
    console.log(error)
    return {props: {gallery: null, error: `${error}`}}
  }
}

export default Home