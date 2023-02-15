import Link from 'next/link'
import React, {useState} from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiTwotoneMail} from 'react-icons/ai'
import { FaDeviantart, FaDiscord } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer-container'>
      {/* <p>2023 JSM Headphones All rights reserved</p> */}
      <div className="footer-detail">
        <div className='flex-container'>
          <p>You can find me on any of my social medias or by messaging me on Discord at Mochi#7921.</p>
          <hr/>
          <p className='icons'>
            <Link href=""><AiFillInstagram/></Link>
            <Link href=""><AiOutlineTwitter/></Link>
            <Link href=""><FaDeviantart/></Link>
            <Link href=""><FaDiscord/></Link>
            <Link href=""><AiTwotoneMail/></Link>

          </p>
        </div> 
      </div>
    </div>
  )
}

function ContactForm () {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  return (
    <div className='contact-form'>
    <form>
        <input
            name='name'
            className="contact-input"
            id='contact-name'
            type={"text"}
            onChange={(e) => {setName(e.target.value)}}
            placeholder="Name"
            value={name}
            required
      />
      <input
          name='email'
          id='contact-email'
          className="contact-input"
          type={"email"}
          onChange={(e) => {setEmail(e.target.value)}}
          placeholder="Email"
          value={email}
          required
      />
      <textarea 
        name='message'
        placeholder="Message"
        id='contact-message'
        className="contact-input"
        onChange={(e) => {setMessage(e.target.value)}}
        required
        value={message}
        rows={7}
      />

      <input type={"submit"} value="SUBMIT"/>
    </form>

  </div>
  )
}

export default Footer