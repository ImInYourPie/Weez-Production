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

    createQuestion(question) {
        return api().post("forum/ask", question)
    }
}