const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL

if (!ServerUrl){
    throw new Error()
}

type getOptions = {
    url: string,
    route: string
}

function getRequest({url, route}: getOptions){
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
export const getImages = async (orderBy: string, page: number, perPage: number) => {
    const imagesRequest = await getRequest({
        url: ServerUrl,
        route: `/images?orderBy=${orderBy}&page=${page}&perPage=${perPage}`
    })
    if (imagesRequest.ok){
        return await imagesRequest.json()
    } else{
        throw new Error()
    }
}