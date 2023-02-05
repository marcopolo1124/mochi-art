import React, {useState, useEffect} from 'react'
import { getStatus, toggleArtTradeStatus, toggleCommissionStatus } from '@/lib'
import Link from 'next/link'

const commissions = () => {
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
        <main className="article-container">
            <div className="title-container" id="commissions-title">
                <h2>Commissions</h2>
                <p id="commission-status">Commission status: {commissionStatus?
                  <strong id="open" onClick={handleCommissionClick}>Open</strong>: 
                  <strong id="closed" onClick={handleCommissionClick}>Closed</strong>}
                </p>
                <Link href="/terms-of-service"><h3>MAKE SURE TO READ THROUGH MY TERMS OF SERVICE BEFORE ORDERING!</h3></Link>
            </div>
            <div className="article-div" id="rates">
                <h3 className="section-title">RATES</h3>
                <RatesTable/>
                <p>* With the exception of VTuber models, all my rates are for personal use only. Please contact me for discussion if you would like to purchase artwork for commercial use.</p>
                <h4>Additional Characters:</h4>
                <ul>
                  <li>+100% of base price</li>
                </ul>
                <h4>Character Design:</h4>
                <ul>
                  <li>+10% of base price</li>
                  <li>Customs include free revisions past the sketch phase, though major changes to the design may incur an additional fee.</li>
                </ul> 
                <h4>Background:</h4>
                <ul>
                <li>The base prices include a simple background (flat/gradient or graphic backgrounds)</li>
                <li>Detailed backgrounds will cost extra depending on complexity</li>
                </ul>
                <h4>Detailed Character/Extra items</h4>
                <ul>
                  <li>up to +$50 depending on complexity</li>
                </ul>
            </div>
        </main>
    </div>
  )
}

export default commissions


function RatesTable () {
  return (
    <div className="table-container">
      <table>
          <thead>
            <tr>
              <th></th>
              <th>Sketch</th>
              <th>Coloured Sketch</th>
              <th>Full Rendered</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <th>BUST</th>
              <td>$100</td>
              <td>$150</td>
              <td>$200</td>
            </tr>
            <tr>
              <th>HALFBODY</th>
              <td>$150</td>
              <td>$200</td>
              <td>$350</td>
            </tr>
            <tr>
              <th>FULLBODY</th>
              <td>$200</td>
              <td>$300</td>
              <td>$500</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}


type siteStatus = {
    commission_open: boolean,
    art_trade_open: boolean
  }