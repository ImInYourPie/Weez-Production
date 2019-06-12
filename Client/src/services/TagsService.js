import api from "@/services/api";

export default {
    getTags(search) {
        return api().get(`/forum/tags`, {
            params: {
                search: search
            }
        })
    },
}