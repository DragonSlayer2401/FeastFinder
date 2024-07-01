import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://feast-finder2-d0271ea4d475.herokuapp.com/';

export default axios;
