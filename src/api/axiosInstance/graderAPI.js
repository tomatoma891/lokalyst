import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://google-grader-node.herokuapp.com',
    headers: {
        //Authorization: `Bearer ${ j }`
    }
})

export default instance
