import { getImages} from '@/lib'
import { Image } from '@/types'
import React from 'react'
import pool from '@/lib/db/pool'
import { HeroBanner, Featured, Navbar } from '../components'

type homeProps = {
  gallery: Image[]
}

const Home = ({gallery}: homeProps) => {
  
  return (
    <>
    <Navbar/>
    <div className="layout">
      <div className="home">
          <HeroBanner/>
          <main className='main-container'>
          {gallery !== null? <Featured images={gallery}/>: <p>Cannot load featured</p>}
          {/* <Gallery images={gallery.images}/> */}
          </main>
      </div>
    </div>

    </>

  )
}


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

export default Home