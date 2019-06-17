import api from "@/services/api";

export default {
    createComment (questionId, description) {
        return api().post(`/forum/question/${questionId}/comment`, {description: description})
    },
    getComments (questionId) {
        return api().post(`/forum/question/${questionId}`)
    },
    upVoteComment(questionId, commentId){
        return api().post(`/forum/question/${questionId}/comment/${commentId}/vote`, { voteType: "up"} )
    },
    downVoteComment(questionId, commentId){
        return api().post(`/forum/question/${questionId}/comment/${commentId}/vote`, { voteType: "down"} )
    }
}