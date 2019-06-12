import api from "@/services/api";

export default {
    returnUsers(search) {
        return api().get("forum/users", {
            params: {
                search: search
            }
        });
    },
}