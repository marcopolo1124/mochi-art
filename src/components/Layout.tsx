import React, {ReactElement, useState, useEffect} from 'react'
import Head from 'next/head'
import Navbar from './NavBar'
import Footer from './Footer'
import { getStatus, toggleArtTradeStatus, toggleCommissionStatus } from '@/lib'

type LayoutProps = {
  children: ReactElement,
}

type siteStatus = {
  commission_open: boolean,
  art_trade_open: boolean
}

const Layout = (props: LayoutProps) => {
  const {children} = props
  const [commissionStatus, setCommissionStatus] = useState<boolean>(false)
  const [artTradeStatus, setArtTradeStatus] = useState<boolean>(false)

  useEffect(() => {
    getStatus()
      .then(({commission_open, art_trade_open}: siteStatus) => {
        setCommissionStatus(commission_open)
        setArtTradeStatus(art_trade_open)
      })
  }, [])

  const handleCommissionClick = () => {
    setCommissionStatus(prev => !prev)
    toggleCommissionStatus()
  }

  const handleArtTradeClick = () => {
    setArtTradeStatus(prev => !prev)
    toggleArtTradeStatus()
  }

  return (
    <div>
      <Head>
        <title>Miiyachi art store</title>
      </Head>
      
      <Navbar />
      <div className='status-bar-container'>
        <div className={`status-bar ${commissionStatus? 'open': 'close'}`} onClick={handleCommissionClick}>commissions status: {commissionStatus? 'open': 'close'}</div>
        <div className={`status-bar ${artTradeStatus? 'open': 'close'}`} onClick={handleArtTradeClick}>art trade status: {artTradeStatus? 'open': 'close'}</div>
      </div>
      
      <div className='layout'>
        <main className='main-container'>
          {children}
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
      

    </div>
  )
}

export default Layout