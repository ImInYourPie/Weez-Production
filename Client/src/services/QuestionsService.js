import api from "@/services/api";

export default {
    getQuestions () {
        return api().get("forum")
    }
}