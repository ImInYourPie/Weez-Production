import axios from "axios";

export default () => {
    return axios.create({
        baseURL: "https://weez-api-iminyourcode.c9users.io/" // C9 URL
        // baseURL: "http://localhost:3000/"
    })
}