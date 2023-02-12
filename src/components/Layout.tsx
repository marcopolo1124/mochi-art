import React, {ReactElement, useState, useEffect} from 'react'
import Head from 'next/head'
import Navbar from './NavBar'
import Footer from './Footer'

type LayoutProps = {
  children: ReactElement,
}


const Layout = (props: LayoutProps) => {
  const {children} = props


  return (
    <div>
      <Head>
        <title>Miiyachi art store</title>
      </Head>
      {children}
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout