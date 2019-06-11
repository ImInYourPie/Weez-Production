import api from "@/services/api";

export default {
    getQuestions () {
        return api().get("forum")
    },

    getQuestionById(questionId) {
        return api().get(`forum/question/${questionId}`)
    },
    
    createQuestion (question) {
        return api().post("forum/ask", question)
    }
}