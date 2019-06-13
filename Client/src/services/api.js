import axios from "axios";
import store from '../store'

export default () => {
    return axios.create({
        // baseURL: "https://weez-api-iminyourcode.c9users.io/" // C9 URL
        baseURL: "http://localhost:3000/",
        headers: {
            Authorization: `Bearer ${store.state.token}`
          }
    })
}