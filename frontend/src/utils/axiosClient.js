import axios from "axios"

<<<<<<< Updated upstream
const axiosClient =  axios.create({
    baseURL: 'https://codequick-v1.onrender.com',
=======
const axiosClient = axios.create({
    baseURL: '/api',
>>>>>>> Stashed changes
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;
