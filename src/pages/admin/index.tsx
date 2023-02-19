import { RouteGuard } from '@/components'
import { getStatus, getUser } from '@/lib'
import React, {useState} from 'react'
import { toggleCommissionStatus, toggleArtTradeStatus } from '@/lib'

const Admin = ({commission_open, art_trade_open, init}: {commission_open: boolean, art_trade_open: boolean, init: boolean}) => {
    const [commissionState, setCommissionState] = useState<boolean>(commission_open)
    const [artTradeState, setArtTradeState] = useState<boolean>(art_trade_open)

    return (
        <RouteGuard>
            <div className="admin-layout">
                <div className='admin-container'>
                    <div className='admin-section' id="commission-state">
                        <h2>Set commission state</h2>
                        <input
                            type="checkbox"
                            checked={commissionState}
                            onChange={() => {
                                toggleCommissionStatus();
                                setCommissionState(prev => !prev)
                            }}
                        />
                        <label>Commission open</label>
                    </div>
                    <div className="admin-section" id="commission-state">
                        <h2>Set art trade state</h2>
                        <input
                            type="checkbox"
                            checked={artTradeState}
                            onChange={() => {
                                toggleArtTradeStatus();
                                setArtTradeState(prev => !prev)
                            }}
                        />
                        <label>Art trade open</label>
                    </div>
                </div>
            </div>
        </RouteGuard>
    )
}

export default Admin

export async function getServerSideProps(){
    const status = await getStatus()
    const userReq = await getUser()
    const init = userReq.user? true: false
    return {props: {...status, init: init}}
  }


