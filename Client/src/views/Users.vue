<template>
  <div class="questions">
    <Navbar/>
    <div class="container is-fluid">
      <b-loading is-full-page :active.sync="loading" :can-cancel="false">
        <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"></b-icon>
      </b-loading>
      <div class="columns">
        <div id="menuCol" class="column is-2 is-hidden-mobile">
          <Menu/>
        </div>
        <div class="column is-7 main-container">
          <br>
          <!-- <nav class="breadcrumb is-hidden-mobile" aria-label="breadcrumbs">
            <ul>
              <li>
                <router-link :to="{name: 'home'}">Home</router-link>
              </li>
              <li class="is-active">
                <router-link :to="{name: 'forum'}">Fórum</router-link>
              </li>
            </ul>
          </nav>-->
          <!-- Main container -->
          <nav class="level is-hidden-mobile">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item is-hidden-mobile">
                <p class="subtitle is-5">
                  <strong>{{users.length}}</strong> Utilizadores
                </p>
              </div>
              <div class="level-item has-margin-left-10">
                <div class="field">
                  <p class="control has-icons-right">
                    <input
                      class="input"
                      v-model="search"
                      type="text"
                      placeholder="Procurar Utilizadores..."
                      style="min-width:300px;"
                    >
                    <span class="icon is-small is-right">
                      <i class="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </nav>
          <nav class="level is-mobile is-hidden-tablet is-marginless">
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum' }" class="level-item">Perguntas</router-link>
            </p>
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum-tags' }" class="level-item">Tags</router-link>
            </p>
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum-users' }" class="level-item is-active">Users</router-link>
            </p>
          </nav>
          <div class="column is-12 is-hidden-tablet">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  v-model="search"
                  type="text"
                  placeholder="Procurar Utilizadores..."
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
          <hr>
          <div class="columns is-multiline">
            <div v-for="user in users" :key="user.username" class="column is-one-third">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img :src="user.profilePic" alt="Pic">
                      </figure>
                    </div>
                    <div class="media-content">
                      <router-link
                        tag="a"
                        :to="{ name: 'profile', params: {username: user.username} }"
                      >{{user.username}}</router-link>
                      <p class="is-size-7">
                        <strong>Rep:</strong>
                        {{user.experience}}
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <div class="columns is-mobile">
                      <div class="column is-half">
                        <nav class="level is-mobile">
                          <div class="level-item has-text-centered">
                            <div>
                              <b-icon
                                pack="fas"
                                icon="arrow-circle-up"
                                type="is-primary"
                                size="is-small"
                              ></b-icon>
                              <p>{{user.upVotes}}</p>
                            </div>
                          </div>
                          <div class="level-item has-text-centered">
                            <div>
                              <b-icon
                                pack="fas"
                                icon="arrow-circle-down"
                                type="is-dark"
                                size="is-small"
                              ></b-icon>
                              <p>{{user.downVotes}}</p>
                            </div>
                          </div>
                          <div class="level-item has-text-centered">
                            <div>
                              <b-icon
                                pack="fas"
                                icon="trophy"
                                type="is-template"
                                size="is-small"
                              ></b-icon>
                              <p>0</p>
                            </div>
                          </div>
                        </nav>
                      </div>
                      <div class="column is-half">
                        <p class="is-size-7">Membro desde: {{ user.registerDate | moment("calendar") }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <!-- <section>
            <b-pagination
              :total="users.length"
              :current.sync="current"
              order="is-centered"
              size="default"
              rounded
              :per-page="perPage"
            ></b-pagination>
          </section>-->
        </div>
        <div class="column is-3 right-column">
          <WatchedTags class="is-hidden-mobile"/>
          <WatchedQuestions class="is-hidden-mobile has-margin-top-5"/>
          <RecentlyViewed class="is-hidden-mobile has-margin-top-5"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>


<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";
import WatchedTags from "@/components/WatchedTags.vue";
import WatchedQuestions from "@/components/WatchedQuestions.vue";
import RecentlyViewed from "@/components/RecentlyViewed.vue";
import { mapState } from "vuex";
import UsersService from "../services/UsersService";
import _ from "lodash";

export default {
  name: "forum-users",
  components: {
    Navbar,
    Menu,
    Footer,
    WatchedTags,
    WatchedQuestions,
    RecentlyViewed
  },

  data: function() {
    return {
      search: "",
      pageNumber: 1,
      current: 1,
      perPage: 10,
      users: [],
      loading: false
    };
  },

  // async mounted() {
  //   this.loading = true;
  //   this.users = (await UsersService.returnUsers()).data;
  //   this.loading = false;
  // },

  methods: {},

  watch: {
    search: _.debounce(async function(value) {
      const route = {
        name: "forum-users"
      };
      if (this.search !== "") {
        route.query = {
          search: this.search
        };
      }
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.loading = true;
        this.search = value;
        this.users = (await UsersService.returnUsers(value)).data;
        this.loading = false;
      }
    }
  },

  computed: {
    // ...mapState(["questions"]),

    // RENDERS DIFFERENT QUESTIONS DEPENDING ON CURRENT PAGE
    paginatedUsers() {
      let pageNumber = this.current - 1;

      return this.users.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    }
  }
};
</script>


