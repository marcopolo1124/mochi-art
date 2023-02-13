import { AdminNav, RouteGuard } from '@/components'
import { getStatus, getUser, logout, uploadImage } from '@/lib'
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
                        <div>
                            <GalleryImageForm/>
                        </div>
                    </div>
                </div>
            </>
        </RouteGuard>
    )
}

function GalleryImageForm (){
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [image, setImage] = useState<File[]>([])

    return (
        <form className='admin-section' onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('image', image[0])
            uploadImage(formData)
            setTitle("")
            setDescription("")
            setImage([])
        }}>
            <h2>Upload image to Gallery</h2>
            <label htmlFor='title'>Title:</label>
            <input
                name='title'
                id='title'
                type={"text"}
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
                required
            />
            <label htmlFor='description'>Description:</label>
            <textarea name='description' onChange={(e) => {setDescription(e.target.value)}} value={description}/>

            <div className='file-upload'>
                <label htmlFor='image' className='upload-label'>Upload image</label>
                <input type="file" id="image" name="image" onChange={(e) => {setImage(e.target.files?[e.target.files[0]]: [])}} required/>
                <p>{image?.[0]?.name}</p>
            </div>

            <input type="submit" value="UPLOAD"/>


        </form>
    )
}

export default admin

export async function getServerSideProps(){
    const props = await getStatus()
    return {props}
  }


