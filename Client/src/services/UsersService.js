import api from "@/services/api";

export default {
    returnUsers () {
        return api().get("forum/users");
    },
}