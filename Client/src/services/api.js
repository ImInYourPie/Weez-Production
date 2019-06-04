import axios from "axios";

export default () => {
    return axios.create({
        baseURL: "http://weez-api-iminyourcode.c9users.io/"
    })
}