import api from "@/services/api";

export default {
    getUserForProfile (username) {
        return api().get(`/profile/user/${username}`)
    },
}