import api from "@/services/api";

export default {
    getQuestions(search) {
        return api().get("forum", {
            params: {
                search: search
            }
        })
    },
    
    getQuestionById(questionId) {
        return api().get(`forum/question/${questionId}`)
    },
    
    getComments(questionId) {
        return api().get(`forum/question/${questionId}/comments`)
    },

    createQuestion(question) {
        return api().post("forum/ask", question)
    },
    
    returnQuestionByTitle(questionTitle) {
        return api().post("forum/ask/wizard", {
            title: questionTitle
        });
    },

    upVoteQuestion(questionId) {
        
        return api().post(`forum/question/${questionId}/upVote`, { voteType: "up"})
    },

    downVoteQuestion(questionId) {
        return api().post(`forum/question/${questionId}/downVote`, { voteType: "down" })
    }
}
