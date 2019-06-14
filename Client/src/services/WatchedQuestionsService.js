import api from "@/services/api";

export default {
    getWatched(){
        return api().get("/forum/watched");
    },
    
    postWatchedQuestion(questionId) {
        return api().post(`/forum/question/${questionId}/watch`, questionId)
    },

    deleteWatchedQuestion(questionId) {
        return api().delete(`/forum/question/${questionId}/watch`, questionId)
    },

    findWatchedQuestion(questionId){
        return api().get(`/forum/question/${questionId}/watched`, questionId)
    }
}