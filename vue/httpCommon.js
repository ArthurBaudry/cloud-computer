var axios = require('axios');

const HTTP = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com/',
    headers: {
        Authorization: 'Bearer {token}'
    }
})