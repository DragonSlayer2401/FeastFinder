import axios from 'axios';

axios.defaults.withCredentials = true;

if (import.meta.env.NODE_ENV === "production") {
    axios.defaults.baseURL = 'https://feast-finder2-d0271ea4d475.herokuapp.com/';
} else {
    axios.defaults.baseURL = 'http://localhost:4000';
}


export default axios;
