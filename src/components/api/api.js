import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8050",  
})

export default api;