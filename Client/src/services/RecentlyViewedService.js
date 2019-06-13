import api from "@/services/api";

export default {
    getViewed(){
        return api().get("/forum/recently-viewed")
    },
    
    postRecentlyViewed(questionId) {
        return api().post(`/forum/recently-viewed`, questionId)
    },
}