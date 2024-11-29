import axios from 'axios';

//const baseUrl = 'https://localhost:7134/api/products';
const baseUrl = 'https://northwindrestapijmo.azurewebsites.net/api/products'

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.get(baseUrl, config);
    return request.then(response => response.data);
};

const create = newProduct => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.post(baseUrl, newProduct, config);
};

const remove = id => {
    const config = {
        headers: { Authorization: token },
    };
    return axios.delete(`${baseUrl}/${id}`, config);
};

const update = (id, updatedProduct) => {
    const config = {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
    };
    return axios.put(`${baseUrl}/${id}`, updatedProduct, config);
};

export default { getAll, create, remove, update, setToken };