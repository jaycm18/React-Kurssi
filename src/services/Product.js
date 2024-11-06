import axios from "axios"

const baseUrl = "https://localhost:7134/api/products"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newProduct => {
    return axios.post(baseUrl, newProduct)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedProduct) => {
    return axios.put(`${baseUrl}/${id}`, updatedProduct, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export default { getAll, create, remove, update }