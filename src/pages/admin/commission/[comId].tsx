import React, {useState, useEffect} from 'react'
import { getCommission, updateCommissionStatus } from '@/lib'
import { CommissionType } from '@/types'
import {GetServerSidePropsContext} from 'next'
import Image from 'next/image'
import { RouteGuard } from '@/components'
import pool from '@/lib/db/pool'
const apiRoute = process.env.NEXT_PUBLIC_SERVER_URL?process.env.NEXT_PUBLIC_SERVER_URL: ""

const Commission = ({commission, images}: {commission: CommissionType, images: any}) => {
  const {id, character_name, scope, com_type, details, name, email, date_of_purchase, commission_status} = commission
  const [viewStatus, setViewStatus] = useState(commission_status)

  useEffect(() =>{
    updateCommissionStatus(id, viewStatus)
  }, [viewStatus, id])
  
  return (
    <RouteGuard>
    <div className='layout'>
      <div className='main-container'>
        <div className='products-heading'>
          <h2>{character_name}</h2>
          <h3>By {name}</h3>
          <h3>Contact back on {email}</h3>
          <h4>{new Date(date_of_purchase).toLocaleString()}</h4>
        </div>
        <label htmlFor="status"><strong>Status:</strong></label>
        <select id="com-status" name="status" value={viewStatus} onChange={(e) => {setViewStatus(e.target.value)}}>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
        </select>
        <p><strong>Scope:</strong> {scope}</p>
        <p><strong>Type:</strong> {com_type}</p>
        <p><strong>Details:</strong> {details}</p>
        <References images={images}/>
      </div>
    </div>
    </RouteGuard>
  )
}

export default Commission

export async function getServerSideProps(context: GetServerSidePropsContext){
  const comId = context.params?.comId
  const com: CommissionType = {
    id: "",
    character_name: "",
    scope: "",
    com_type: "",
    details: "",
    name: "",
    email: "",
    date_of_purchase: "",
    commission_status: ""}

  if (typeof(comId) !== "string"){
    return {props: {commission: com, images: null}}
  }

  try{
    const images = pool.query(
        'SELECT * FROM commissions.commission_images WHERE commission_id=$1',
        [comId]
    )

    const commission = await pool.query(
        'SELECT * FROM commissions.commissions WHERE id=$1',
        [comId]
    )

    if (commission.rows.length > 0){
        return ({props: {
            commission: JSON.parse(JSON.stringify(commission.rows[0])),
            images: (await images).rows
        }})
    } else{
        return( {props: {
            commission: null,
            images: []
        }})
    }
  }catch (err){
      console.log(err)
      return( {props: {
        commission: null,
        images: []
    }})
  }
}

type ComImageType = {commission_id: string, file_name: string}

const References = ({images}: {images: ComImageType[]}) => {
  return (
      <>
      <div className="products-heading">
          <h2>References</h2>
      </div>

      <div className='products-container'>
          {images?.map( image => <ComImage key={image.file_name} image={image}/>)}
      </div>
      </>
  )
}

const ComImage = ({image}: {image: ComImageType}) => {
  const {file_name} = image
  const src = `${apiRoute}/static/commission_gallery/${file_name}`
  return (
    <div className="product-card">
        <Image 
          src={src}
          className="product-image"
          height={300}
          width={300}
          alt="reference image"
        />
    </div>
  )
}