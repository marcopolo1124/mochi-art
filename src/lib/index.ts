import { Image } from "@/types"

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL ? process.env.NEXT_PUBLIC_SERVER_URL: ""

if (!ServerUrl){
    throw new Error()
}

type RequestOptions = {
    url: string,
    route: string
    body?: {}
}

function getRequest({url, route}: RequestOptions){
    return fetch(
        `${url}${route}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
    )
}

function postRequest({url, route, body}: RequestOptions){
    return fetch(
        `${url}${route}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }
    )
}

function putRequest({url, route, body}: RequestOptions){
    return fetch(
        `${url}${route}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body? JSON.stringify(body): null,
            credentials: 'include'
        }
    )
}


export const getImages = async (orderBy: string, page: number, perPage: number) => {
    const route = `/images?orderBy=${orderBy}&page=${page}&perPage=${perPage}`
    const imagesRequest = await getRequest({
        url: ServerUrl,
        route
    })
    if (imagesRequest.ok){
        return await imagesRequest.json()
    } else{
        throw new Error()
    }
}

export const getImage = async (fileName: string) => {
    const route = `/images/${fileName}`
    const imageRequest = await getRequest({
        url: ServerUrl,
        route
    })
    if (imageRequest.ok){
        return await imageRequest.json()
    } else{
        throw new Error()
    }
}


export const getFeatured = async () => {
    const imagesRequest = await getRequest({
        url: ServerUrl,
        route: `/images/featured`
    })
    if (imagesRequest.ok){
        return await imagesRequest.json()
    } else{
        throw new Error()
    }
}

export const getStatus = async () => {
    const statusRequest = await getRequest({
        url: ServerUrl,
        route: '/state'
    })
    if (statusRequest.ok){
        return await statusRequest.json()
    } else{
        throw new Error()
    }
}

export const toggleCommissionStatus = async () => {
    const statusRequest = await putRequest({
        url: ServerUrl,
        route: '/state/commission'
    })
    if (statusRequest.ok){
        return await statusRequest.json()
    } else{
        throw new Error()
    }
}

export const toggleArtTradeStatus = async () => {
    const statusRequest = await putRequest({
        url: ServerUrl,
        route: '/state/art-trade'
    })
    if (statusRequest.ok){
        return await statusRequest.json()
    } else{
        throw new Error()
    }
}

export function postCommission(data: FormData){
    fetch(
        `${ServerUrl}/commissions/upload`,
        {
            method: 'POST',
            body: data,
            credentials: 'include'
        }
    ) 
}

export async function loginUser({username, password}: {username:string, password: string}){
    if (!username || !password) {
        throw new Error('missing credentials')
    }
    const loginRequest = await postRequest(
        {
            url: ServerUrl,
            route:'/admin/login',
            body: {username, password}
        }
    )
    if (loginRequest.status === 404){
        return 400
    }
    if (loginRequest.ok){
        return 200
    } else {
        throw new Error(`status: ${loginRequest.status}`)
    }
}

export async function getUser(){
    const userRequest = await getRequest({url: ServerUrl, route: "/admin/user"})
    if (userRequest.ok){
        return await userRequest.json()
    } else {
        throw new Error(`status ${userRequest.status}`)
    }
}

export async function logout(){
    const logoutRequest = await fetch(
        `${ServerUrl}/admin/logout`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
    )
    if (logoutRequest.ok){
        return {message: 'ok'}
    } else{
        throw new Error(`status: ${logoutRequest.status}`)
    }
}

export async function uploadImage(data: FormData){
    fetch(
        `${ServerUrl}/images/upload`,
        {
            method: 'POST',
            body: data,
            credentials: 'include'
        }
    ) 
}

export async function deleteImages(images: Image[]){
    let success: string[] = []
    images.forEach((image) => {
        const body = {
            fileName: image.file_name
        }
        fetch(
            `${ServerUrl}/images/delete?fileName=${image.file_name}`,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        
        ).then(
            async (value) => {
                if (value.ok){
                    success.push(image.file_name)
                }
            }
        )
    })
    return {message: `Deleted ${success}`}
}

export async function getCommissions(status: string | null, page: number, perPage:number, orderBy: string){
    const commissionReq = await getRequest({
        url: ServerUrl,
        route: `/commissions?${status?`status=${status}`: ""}&page=${page}&perPage=${perPage}&orderBy=${orderBy}`
    })

    if (commissionReq.ok){
        return await commissionReq.json()
    } else{
        throw new Error(`status: ${commissionReq.status}`)
    }
}