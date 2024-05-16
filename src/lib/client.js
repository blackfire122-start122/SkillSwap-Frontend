import axios from "axios"

const baseURL = 'http://localhost:8080/'

const client = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    withCredentials: true,
});

export { baseURL, client };