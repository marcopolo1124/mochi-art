import React from 'react'
import {FaDiscord, FaPaintBrush} from 'react-icons/fa'
import {AiFillCheckCircle} from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'


const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div className='hero-banner-title'>
        <h1>MIIYACHI</h1>
        <h2>Artist  //  Hobbyist  //  Digital Art</h2>
        <Image src='/Peupie_Transparent.png' alt="Avatar" height={1000} width={1000} className='hero-banner-image' />


      </div>
      {/* <div className='hero-banner-stats'>
        <p id='commission-status' className='stats'><AiFillCheckCircle className='icons'/>  commissions: open</p>
        <p id='art-trade-status' className='stats'><FaPaintBrush className='icons'/> art trade: closed</p>
        <p id='discord' className='stats'><FaDiscord className='icons'/>  Mochi #7921</p>
      </div> */}
        
    </div>
  )
}

export default HeroBanner