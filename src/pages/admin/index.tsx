import { AdminNav, RouteGuard } from '@/components'
import { getStatus, getUser, logout } from '@/lib'
import React, {useState, useEffect} from 'react'
import { toggleCommissionStatus, toggleArtTradeStatus } from '@/lib'

const admin = ({commission_open, art_trade_open}: {commission_open: boolean, art_trade_open: boolean}) => {
    const [auth, setAuth] = useState<boolean>(false)
    const [commissionState, setCommissionState] = useState<boolean>(commission_open)
    const [artTradeState, setArtTradeState] = useState<boolean>(art_trade_open)
    useEffect(()=>{
        getUser()
            .then((value) => {
                console.log(value)
                if (value.user?.username){
                    setAuth(true)
                }
            })
    }, [])
    
    const setAuthToTrue = () => {
        setAuth(true)
    }
    const setAuthToFalse = () =>{
        setAuth(false)
    }

    return (
        <RouteGuard auth={auth} setAuth={setAuthToTrue}>
            <>
                <AdminNav handleLogout={() => {logout(); setAuthToFalse()}}/>
                <div className="main-container">
                    <div className='admin-section' id="commission-state">
                        <h2>Set commission state</h2>
                        <input
                            type="checkbox"
                            checked={commissionState}
                            onClick={() => {
                                toggleCommissionStatus();
                                setCommissionState(prev => !prev)
                            }}
                        />
                        <p>Commission open</p>
                    </div>
                    <div className="admin-section" id="commission-state">
                        <h2>Set art trade state</h2>
                        <input
                            type="checkbox"
                            checked={artTradeState}
                            onClick={() => {
                                toggleArtTradeStatus();
                                setArtTradeState(prev => !prev)
                            }}
                        />
                        <p>Art trade open</p>
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
