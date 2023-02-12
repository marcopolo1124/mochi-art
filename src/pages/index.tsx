import { getFeatured, getImages } from '@/lib'
import { Image } from '@/types'
import React from 'react'
import { HeroBanner, Gallery, Featured, Navbar } from '../components'

type homeProps = {
  featured: {images: Image[]}
  gallery: {images: Image[]}
}

const Home = ({featured, gallery}: homeProps) => {
  return (
    <>
    <Navbar/>
    <div className="layout">
      <div className="home">
          <HeroBanner/>
          <main className='main-container'>
          <Featured images={gallery.images}/>
          {/* <Gallery images={gallery.images}/> */}
          </main>
      </div>
    </div>

    </>

  )
}

export async function getServerSideProps() {
  const featured = await getFeatured()
  const gallery = await getImages("date", 1, 1000)
  return {props: {featured, gallery}}

}




export default Home