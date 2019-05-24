import axios from "axios";

export default () => {
    return axios.create({
        baseURL: "https://weez-api-iminyourcode.c9users.io/"
    })
}