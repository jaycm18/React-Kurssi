import axios from 'axios'

const baseUrl = "https://localhost:7134/api/authentication"

const authenticate = (userForAuth) => {
    console.log("Request payload:", userForAuth); // Log the request payload
    return axios.post(baseUrl, userForAuth)
        .then(response => {
            console.log("Response data:", response.data); // Log the response data
            return response.data
        })
        .catch(error => {
            console.error("Error during authentication:", error.response?.data || error.message); // Log the error
            throw error
        })
}

export default { authenticate }