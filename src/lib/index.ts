const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL

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