<template>
    <section>
        <b-table
            :data="users"
            ref="table"
            paginated
            :per-page="perPage"
            :opened-detailed="defaultOpenedDetails"
            :current-page.sync="page"
            aria-next-label="Página seguinte"
            aria-previous-label="Página anterior"
            aria-page-label="Página"
            aria-current-label="Página atual">
            <!-- TODO RESOLVER FORMULA MATEMATICA -->
            <template slot-scope="props">
                <b-table-column field="index" label="Rank" width="40" numeric>
                    {{ props.index + 1 }}
                </b-table-column>

                <b-table-column field="username" label="User">
                    <router-link
                        tag="a"
                        :to="{ name: 'profile', params: {username: props.row.username} }"
                      >{{props.row.username}}</router-link>
                </b-table-column>

                <b-table-column field="registerDate" label="Data de registo" centered>
                    <span class="tag is-primary">
                        {{ props.row.registerDate | moment("calendar") }}
                    </span>
                </b-table-column>

                <b-table-column label="Upvotes" field="upVotes">
                    <b-icon pack="fas"
                        icon="arrow-circle-up" type="is-primary">
                    </b-icon>
                    {{ props.row.upVotes }}
                </b-table-column>
                <b-table-column label="Downvotes" field="downVotes">
                    <b-icon pack="fas"
                        icon="arrow-circle-down" type="is-dark">
                    </b-icon>
                    {{ props.row.downVotes }}
                </b-table-column>
            </template>
        </b-table>
    </section>
</template>

<script>
    import UsersService from "../services/UsersService";
    
    export default {
        data() {
            return {
                users: [],
                total: 0,
                loading: false,
                sortField: 'upVotes',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',
                page: 1,
                perPage: 10
            }
        },
        methods: {
            toggle(row) {
                this.$refs.table.toggleDetails(row)
            }
        },
        async mounted() {
           this.users = (await UsersService.returnUsers("")).data; 
        }
    }
</script>