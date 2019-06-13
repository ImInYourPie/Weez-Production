import api from "@/services/api";

export default {
    getUserForProfile (username) {
        return api().get(`/profile/user/${username}`)
    },
    updatePic(username, file){
        return api().put(`/profile/user/${username}/profile-pic`, {file: file})
    }
}