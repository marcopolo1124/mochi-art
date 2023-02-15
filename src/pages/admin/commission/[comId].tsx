import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { getCommission } from '@/lib'
import { CommissionType } from '@/types'
import {GetServerSidePropsContext} from 'next'
import Image from 'next/image'
import { RouteGuard } from '@/components'

const Commission = ({commission, images}: {commission: CommissionType, images: any}) => {
  const {id, character_name, scope, com_type, details, name, email, date_of_purchase, commission_status} = commission
  const router = useRouter()
  const {comId} = router.query
  const [viewStatus, setViewStatus] = useState(commission_status) 
  
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
            <option value="">All</option>
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
  const {commission, images} = await getCommission(comId)
  return {props: {commission, images}}
}

type ComImageType = {commission_id: string, file_name: string}

const References = ({images}: {images: ComImageType[]}) => {
  console.log(images)
  return (
      <>
      <div className="products-heading">
          <h2>References</h2>
      </div>

      <div className='products-container'>
          {images?.map( image => <ComImage image={image}/>)}
      </div>
      </>
  )
}

const ComImage = ({image}: {image: ComImageType}) => {
  const {file_name} = image
  console.log(image)
  const src = `${process.env.NEXT_PUBLIC_SERVER_URL}/static-commission/${file_name}`
  console.log(src)
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