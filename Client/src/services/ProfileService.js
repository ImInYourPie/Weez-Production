import api from "@/services/api";

export default {
    getUserForProfile (username) {
        return api().get(`/profile/user/${username}`)
    },
    updatePic(username, url){
        return api().put(`/profile/user/${username}/profile-pic`, {url: url})
    }
}