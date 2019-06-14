import api from "@/services/api";

export default {
    createComment (questionId, description) {
        return api().post(`/forum/question/${questionId}/comment`, {description: description})
    }
}