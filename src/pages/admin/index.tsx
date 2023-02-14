import { AdminNav, RouteGuard } from '@/components'
import { getStatus, getUser, logout, uploadImage } from '@/lib'
import React, {useState, useEffect} from 'react'
import { toggleCommissionStatus, toggleArtTradeStatus } from '@/lib'

const admin = ({commission_open, art_trade_open}: {commission_open: boolean, art_trade_open: boolean}) => {
    const [commissionState, setCommissionState] = useState<boolean>(commission_open)
    const [artTradeState, setArtTradeState] = useState<boolean>(art_trade_open)


    return (
        <RouteGuard>
            <>
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
            </>
        </RouteGuard>
    )
}

export default admin

export async function getServerSideProps(){
    const props = await getStatus()
    return {props}
  }


