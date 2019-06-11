import api from "@/services/api";

export default {
    getTags () {
        return api().get(`/forum/tags`)
    },
}