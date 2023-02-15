import { RouteGuard } from '@/components'
import { getCommissions } from '@/lib'
import React, { useEffect, useState } from 'react'
import { CommissionType } from '@/types'
import Link from 'next/link'

const perPage = 7

const Commissions = ({commissions, rowCount}: {commissions: CommissionType[], rowCount: number}) => {
    const [viewStatus, setViewStatus] = useState<string>("pending")
    const [viewCommissions, setViewCommissions] = useState(commissions)
    const [pageCount, setPageCount] = useState<number>(Math.ceil(rowCount / perPage))
    const [page, setPage] = useState<number | undefined>(1)

    useEffect(() => {
        if(!page){
            return
        }
        getCommissions(viewStatus, page , perPage, "date_of_purchase")
            .then((value) => {
                setViewCommissions(value.commissions)
                setPageCount(Math.ceil(value.rowCount / perPage) )
            })
    }, [viewStatus, page])

    return (
        <RouteGuard>
            <div className='layout'>
                <div className='home'>
                    <div className="main-container">
                        <h2>Commissions</h2>
                        <label htmlFor="status">Get status</label>
                        <select id="com-status" name="status" value={viewStatus} onChange={(e) => {setViewStatus(e.target.value)}}>
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                            <option value="completed">Completed</option>
                        </select>
                        <CommissionTable commissions={viewCommissions}/>

                    </div>
                    <span className="page-count"><input type="number" value={page} max={pageCount} min={1} onChange={({target}) => {setPage(parseInt(target.value))}}/>/{pageCount}</span>
                </div>
            </div>
        </RouteGuard>
    )
}

function CommissionTable ({commissions}: {commissions: CommissionType[]}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Scope</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>From</th>
                    <th>Email</th>
                    <th>Com. date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {commissions.map(commission => 
                <TableRow
                    commission={commission}
                    key={commission.id}
                />)}
            </tbody>
        </table>
    )
}

function TableRow({commission}: {commission: CommissionType}) {
    const {id, character_name, scope, com_type, details, name, email, date_of_purchase, commission_status} = commission
    const shortenString = (str: string, len: number) =>{
        return str.length > len? str.slice(0, len - 3) + "..." : str
    }
    
    return (
        
        <tr className='tr-link'>
            <td className="com"><Link href={`/admin/commission/${id}`} className="table-link">{shortenString(character_name, 20)}</Link></td>
            <td className="com"><Link href={`/admin/commission/${id}`} className="table-link">{scope}</Link></td>
            <td className="com"><Link href={`/admin/commission/${id}`} className="table-link">{com_type}</Link></td>
            <td className="com"><Link href={`/admin/commission/${id}`} className="table-link">{shortenString(details, 20)}</Link></td>
            <td className="com"><Link href={`/admin/commission/${id}`} className="table-link">{shortenString(name, 20)}</Link></td>
            <td className="com"><Link href={`/admin/commission/${id}`} className="table-link">{shortenString(email, 20)}</Link></td>
            <td className="com"><Link href={`/admin/commission/${id}`} className="table-link">{new Date(date_of_purchase).toLocaleString()}</Link></td>
            <td className="com"><Link href={`/admin/commission/${id}`} className="table-link">{commission_status}</Link></td>
        </tr>
        
    )
}

export async function getServerSideProps(){
    const props = await getCommissions("pending", 1 , perPage, "date_of_purchase")
    return {props}
}

export default Commissions

