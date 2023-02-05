import React from 'react'
import Navbar from './NavBar'
import {FaDiscord, FaPaintBrush} from 'react-icons/fa'
import {AiFillCheckCircle} from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'


const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      
      <div className='hero-banner-title'>
        
        <h1>MIIYACHI</h1>
        <h3 id="hero-banner-subtext">Artist  //  Hobbyist  //  Digital Art</h3>
        {/* <Image src='/Peupie_Transparent.png' alt="Avatar" height={1000} width={1000} className='hero-banner-image' /> */}


      </div>
    </div>
  )
}

export default HeroBanner