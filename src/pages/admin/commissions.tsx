import { RouteGuard } from '@/components'
import { getCommissions } from '@/lib'
import React, { useEffect, useState } from 'react'

const perPage = 30

const commissions = ({commissions, rowCount}: {commissions: [{}], rowCount: number}) => {
    const [viewStatus, setViewStatus] = useState<string>("pending")
    const [viewCommissions, setViewCommissions] = useState(commissions)
    const [pageCount, setPageCount] = useState<number>(Math.ceil(rowCount / perPage))
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        getCommissions(viewStatus, page , perPage, "date_of_purchase")
            .then((value) => {
                setViewCommissions(value.commissions)
                setPageCount(Math.ceil(value.rowCount) / perPage)
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

                    </div>
                </div>
            </div>
        </RouteGuard>
    )
}

export async function getServerSideProps(){
    const props = await getCommissions("pending", 1 , perPage, "date_of_purchase")
    return {props}
}

export default commissions