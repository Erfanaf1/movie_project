const BASE_URL = 'http://178.173.144.194:8008/api'

const TEMP_BASE_URL = 'http://moviesapi.ir/api/v1'

async function request(url) {
    const response = await fetch(url)
    if(!response.ok){
        throw new Error(`HTTP error! stauts : ${response.status}`)
    }
    return response.json()
    
}

export async function searchMovies(query ,page = 1) {
    return request(`${TEMP_BASE_URL}/movies?q=${query}&page=${page}`)
}