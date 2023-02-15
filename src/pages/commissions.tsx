import React, {useState, useEffect} from 'react'
import { getStatus } from '@/lib'
import Link from 'next/link'
import { Navbar } from '@/components'



export async function getServerSideProps(){
  const props = await getStatus()
  return {props}
}

type commissionProps = {
  commission_open: boolean,
  art_trade_open: boolean
}

const commissions = ({commission_open, art_trade_open}: commissionProps) => {
    const [commissionStatus, setCommissionStatus] = useState<boolean>(commission_open)
    const [artTradeStatus, setArtTradeStatus] = useState<boolean>(art_trade_open)
  
    useEffect(() => {
      getStatus()
        .then(({commission_open, art_trade_open}: siteStatus) => {
          setCommissionStatus(commission_open)
          setArtTradeStatus(art_trade_open)
        })
    }, [])
  



  return (
    <>
    <Navbar/>
    <div className="layout">
        <main className="article-container">
            <div className="title-container" id="commissions-title">
                <h2>Commissions</h2>
                <p id="commission-status">Commission status: {commissionStatus?
                  <strong id="open">Open</strong>: 
                  <strong id="closed">Closed</strong>}
                </p>
                <Link href="/terms-of-service"><h3>MAKE SURE TO CLICK HERE AND READ THROUGH MY TERMS OF SERVICE BEFORE ORDERING!</h3></Link>
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
                <h3>VTUBER MODEL</h3>
                <h4>The listed price includes:</h4>
                <ul>
                  <li>Full commercial use</li>
                  <li>Ready to rig PSD file of your model</li>
                  <li>3 custom expressions of your choosing</li>
                </ul>
                <h4>Add-ons/extra fee:</h4>
                <ul>
                  <li>Character design: +$200</li>
                  <li>Extra expressions: +$50 each</li>
                  <li>Extra outfits: +$100-200 depending on details</li>
                  <li>Extra arms/pets/hair: +$70</li>
                </ul>
                <h4>Additional information:</h4>
                <ul>
                  <li>Complicated designs may incur an additional fee.</li>
                  <li>Turnaround time is up to 2 months upon full payment. You are required to let me know if there are any specific deadlines to meet.</li>
                  <li>Specific terms and conditions will be discussed and agreed upon in private prior to payment.</li>
                  <li>A design fee will be charged if you do not provide clear references of your character (at least a clean fullbody front view required.)</li>
                </ul>
            </div>
            <hr/>
            <div id="order-button-container">
              <Link href="/order-form"><button id="order-button">Go to order form</button></Link>
            </div>
            
        </main>
        
    </div>
    </>
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
              <th>BUST</th>
              <th>HALFBODY</th>
              <th>FULLBODY</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <th>SKETCH</th>
              <td>$100</td>
              <td>$150</td>
              <td>$200</td>
            </tr>
            <tr>
              <th>COLORED SKETCH</th>
              <td>$150</td>
              <td>$200</td>
              <td>$300</td>
            </tr>
            <tr>
              <th>FULL RENDER</th>
              <td>$200</td>
              <td>$350</td>
              <td>$500</td>
            </tr>
            <tr>
              <th>VTUBER MODEL</th>
              <td>$1200</td>
              <td>$1500</td>
              <td>$2000</td>
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