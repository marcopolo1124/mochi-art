import { getFeatured, getImages, getHome } from '@/lib'
import { Image } from '@/types'
import React from 'react'
import { HeroBanner, Featured, Navbar } from '../components'

type homeProps = {
  featured: {images: Image[]}
  gallery: {images: Image[]}
  error: null | string
}

const Home = ({featured, gallery, error}: homeProps) => {
  getHome()
  if (error){
    console.log(error)
  }
  return (
    <>
    <Navbar/>
    <div className="layout">
      <div className="home">
          <HeroBanner/>
          <main className='main-container'>
          {featured !== null? <Featured images={gallery.images}/>: <p>Cannot load featured</p>}
          {/* <Gallery images={gallery.images}/> */}
          </main>
      </div>
    </div>

    </>

  )
}

export async function getServerSideProps() {
  try{
    const featured = await getFeatured()
    const gallery = await getImages("date", 1, 1000)
    return {props: {featured, gallery}}
  } catch(error){
    console.log(error)
    return {props: {featured: null, gallery: null, error: `${error}`}}
  }
}

export default Home