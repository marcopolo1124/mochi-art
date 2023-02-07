import React from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiTwotoneMail} from 'react-icons/ai'
import { FaDeviantart } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer-container'>
      {/* <p>2023 JSM Headphones All rights reserved</p> */}
      <p className='icons'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
        <FaDeviantart/>
        <AiTwotoneMail/>

      </p>
    </div>
  )
}

export default Footer