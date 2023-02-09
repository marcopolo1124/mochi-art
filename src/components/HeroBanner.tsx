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
        <Link href="/commissions"><div id="hero-banner-button">Order a commission now!</div></Link>


      </div>
    </div>
  )
}

export default HeroBanner