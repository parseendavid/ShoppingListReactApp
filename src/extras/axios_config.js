import axios from 'axios';

// const BASE_URL = "https://shopping-list-api-2017.herokuapp.com";
const BASE_URL = "http://localhost:5000";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosConfig;