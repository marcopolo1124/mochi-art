import { Image } from "types"

const ServerUrl = "http://localhost:3000/api"

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

function patchRequest({url, route, body}: RequestOptions){
    return fetch(
        `${url}${route}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body? JSON.stringify(body): null,
            credentials: 'include'
        }
    )
}

export const getImages = async (orderBy: string, page: number, perPage: number) => {
    try{
        const route = `/images?orderBy=${orderBy}&page=${page}&perPage=${perPage}`
        const imagesRequest = await getRequest({
            url: ServerUrl,
            route
        })
        if (imagesRequest.ok){
            return await imagesRequest.json()
        }
        if (imagesRequest.status === 404) {
            return {images: []}
        }else{
            throw new Error(`gallery status: ${imagesRequest.status}`)
        }
    } catch (error){
        throw new Error(`${error}`)
    }

}

export const getImage = async (fileName: string) => {
    try{
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
    } catch (error){
        throw new Error()
    }
}

export const getStatus = async () => {
    try{
        const statusRequest = await getRequest({
            url: ServerUrl,
            route: '/state'
        })
        if (statusRequest.ok){
            return await statusRequest.json()
        } else{
            throw new Error()
        }
    } catch (error){
        throw new Error()
    }
}

export const toggleCommissionStatus = async () => {
    try{
        const statusRequest = await putRequest({
            url: ServerUrl,
            route: '/state/commission'
        })
        if (statusRequest.ok){
            return await statusRequest.json()
        } else{
            throw new Error()
        }
    } catch (error){
        throw new Error()
    }
}

export const toggleArtTradeStatus = async () => {
    try{
        const statusRequest = await putRequest({
            url: ServerUrl,
            route: '/state/art-trade'
        })
        if (statusRequest.ok){
            return await statusRequest.json()
        } else{
            throw new Error()
        }
    } catch (error){
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
    ).catch((err) => {throw new Error()})
}

export async function loginUser({username, password}: {username:string, password: string}){
    try{
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
    } catch (error){
        throw new Error()
    }
}

export async function getUser(){
    try{
        const userRequest = await getRequest({url: ServerUrl, route: "/admin/user"})
        if (userRequest.ok){
            return await userRequest.json()
        } else {
            throw new Error(`status ${userRequest.status}`)
        }
    } catch (error){
        throw new Error()
    }
}

export async function logout(){
    try{
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
    } catch (error){
        throw new Error()
    }
}

export function uploadImage(data: FormData){
    fetch(
        `${ServerUrl}/images`,
        {
            method: 'POST',
            body: data,
            credentials: 'include'
        }
    ).catch(err => console.log(err))
}

export async function deleteImages(images: Image[]){
    try{
        let success: string[] = []
        images.forEach((image) => {
            const body = {
                fileName: image.file_name
            }
            fetch(
                `${ServerUrl}/images?fileName=${image.file_name}`,
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
    } catch (error){
        throw new Error()
    }
}

export async function getCommissions(status: string | null, page: number, perPage:number, orderBy: string){
    try{
        const commissionsReq = await getRequest({
            url: ServerUrl,
            route: `/commissions?${status?`status=${status}`: ""}&page=${page}&perPage=${perPage}&orderBy=${orderBy}`
        })

        if (commissionsReq.ok){
            return await commissionsReq.json()
        } else{
            throw new Error(`status: ${commissionsReq.status}`)
        }
    } catch (error){
        throw new Error()
    }
}

export async function getCommission(comId: string){
    try{
        const comReq = await getRequest({
            url: ServerUrl,
            route: `/commissions/${comId}`
        })
        if (comReq.ok){
            return await comReq.json()
        } else{
            throw new Error(`status: ${comReq.status}`)
        }
    } catch (error){
        throw new Error()
}
}

export async function updateCommissionStatus(comId: string, status: string){
    try{
        const updateReq = await patchRequest({
            url: ServerUrl,
            route: "/commissions/status",
            body: {
                commission_id: comId,
                status: status
            }
        })
        if (updateReq.ok){
            return {message: "updated"}
        } else {
            throw new Error(`status: ${updateReq.status}`)
        }
    } catch (error){
        throw new Error()
    }
}
