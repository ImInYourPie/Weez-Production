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
                  <strong>{{questions.length}}</strong> Perguntas
                </p>
                <div class="level-item has-margin-left-10">
                  <div class="field">
                    <p class="control has-icons-right">
                      <input
                        class="input"
                        v-model="search"
                        type="text"
                        placeholder="Procurar Perguntas..."
                        style="min-width:300px;"
                      >
                      <span class="icon is-small is-right">
                        <i class="fas fa-search"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Right side -->
            <div class="level-right">
              <p class="level-item is-hidden-mobile">
                <a @click="orderDownDate">Recentes</a>
              </p>
              <p class="level-item is-hidden-mobile">
                <a @click="orderDownPopularity">Populares</a>
              </p>
            </div>
          </nav>
          <nav class="level is-mobile is-hidden-tablet is-marginless">
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum' }" class="level-item">Perguntas</router-link>
            </p>
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum-tags' }" class="level-item is-active">Tags</router-link>
            </p>
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum-users' }" class="level-item">Users</router-link>
            </p>
          </nav>
          <div class="column is-12 is-hidden-tablet">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  v-model="search"
                  type="text"
                  placeholder="Procurar Perguntas..."
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
          <div class></div>
          <hr>
          <!-- DESKTOP TEMPLATE -->
          <div
            class="columns is-hidden-mobile question-box"
            v-for="question in questions"
            :key="question._id"
          >
            <div class="column is-12">
              <div class="columns is-vcentered">
                <div class="column is-2 has-text-centered">
                  <nav class="level">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="is-size-5">{{question.voteCount}}</p>
                        <p>
                          <b-icon icon="thumbs-up-down" type="is-template"></b-icon>
                        </p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="is-size-5">{{question.comments.length}}</p>
                        <p>
                          <b-icon pack="fas" icon="comments" type="is-template"></b-icon>
                        </p>
                      </div>
                    </div>
                    <!-- <div class="level-item has-text-centered">
                      <div>
                        <p class="is-size-5">{{question.views.length}}</p>
                        <p>
                          <b-icon pack="fas" icon="eye" type="is-template"></b-icon>
                        </p>
                      </div>
                    </div> -->
                  </nav>
                </div>
                <div class="column is-10">
                  <div class="columns">
                    <div class="column is-12">
                      <router-link
                        tag="a"
                        :to="{name: 'question-page', params: {questionId: question._id, questionTitle: question.title}}"
                      >{{question.title}}</router-link>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-6">
                      <a v-for="tag in question.tags" :key="tag" class="has-margin-right-5">
                        <b-tag type="is-template">{{tag}}</b-tag>
                      </a>
                    </div>
                    <div class="column is-6 has-text-right">
                      <p
                        class="is-size-7 is-template"
                      >Baked: {{ question.date | moment("calendar") }}</p>
                      <span class="is-size-6">Baker:&nbsp;</span>
                      <router-link
                        tag="a"
                        class="is-size-6"
                        :to="{name: 'profile', params: {username: question.userId.username} }"
                      >{{question.userId.username }}</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- MOBILE TEMPLATE -->
          <div
            class="columns is-hidden-tablet question-box"
            v-for="(question, index) in questions"
            :key="index"
          >
            <div class="column is-12">
              <router-link
                tag="a"
                :to="{name: 'question-page', params: {questionId: question._id, questionTitle: question.title}}"
              >{{question.title}}</router-link>
            </div>
            <div class="column is-12">
              <a @click.prevent="search = tag.name" v-for="tag in question.tags" :key="tag" class="has-margin-right-5">
                <b-tag type="is-template">{{tag}}</b-tag>
              </a>
            </div>
            <div class="column is-12">
              <span class="is-size-7 is-template">Baked: {{ question.date | moment("calendar") }}</span>
              <span class="is-pulled-right">
                <span class="is-size-6">
                  {{question.voteCount}}
                  <b-icon icon="thumbs-up-down" size="is-small" type="is-template"></b-icon>
                </span>
                &nbsp;
                <span class="is-size-6 is-template">
                  {{question.comments.length}}
                  <b-icon pack="fas" icon="comments" size="is-small" type="is-template"></b-icon>
                </span>
              </span>
            </div>
          </div>
          <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->
          <br>
          <!-- <section>
            <b-pagination
              :total="questions.length"
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
// import { mapState } from "vuex";
import QuestionsService from "../services/QuestionsService";
import _ from "lodash";

export default {
  name: "forum",
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
      isPopular: false,
      isRecent: false,
      search: "",
      pageNumber: 1,
      current: 1,
      perPage: 10,
      questions: [],
      loading: false
      // page: 1
    };
  },

  // async mounted() {
  //   this.loading = true;
  //   this.questions = (await QuestionsService.getQuestions()).data;
  //   this.questions.sort(function(a, b) {
  //     if (Date.parse(a.date) < Date.parse(b.date)) return 1;
  //     if (Date.parse(a.date) > Date.parse(b.date)) return -1;
  //     else return 0;
  //   });
  //   console.table(this.questions);
  //   this.loading = false;
  // },

  methods: {
    // questionScore(question) {
    //   return question.upVotes - question.downVotes;
    // },

    // infiniteHandler($state) {
    //   QuestionsService.getQuestions(this.page).then(({ data }) => {
    //     console.log(data.questions)
    //     if (data.questions.length) {
    //       this.page += 1;
    //       this.questions.push(...data.questions);
    //       $state.loaded();
    //     } else {
    //       $state.complete();
    //     }
    //   });
    // },

    orderDownDate() {
      this.questions.sort(function(a, b) {
        if (Date.parse(a.date) < Date.parse(b.date)) return 1;
        if (Date.parse(a.date) > Date.parse(b.date)) return -1;
        else return 0;
      });
    },
    orderDownPopularity() {
      this.questions.sort(function(a, b) {
        if (Date.parse(a.comments.length) < Date.parse(b.comments.length))
          return 1;
        if (Date.parse(a.comments.length) > Date.parse(b.comments.length))
          return -1;
        else return 0;
      });
    }
  },
  watch: {
    search: _.debounce(async function(value) {
      const route = {
        name: "forum"
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
        this.questions = (await QuestionsService.getQuestions(value)).data;
        this.orderDownDate();
        this.loading = false;
      }
    }
  },

  computed: {
    // ...mapState(["questions"]),

    // returnUserOfQuestion (questionId) {
    //   let user = null;
    //   for (let i = 0; i < this.questions.length; i++) {
    //     if (questionId == this.questions[i]._id){
    //       user = this.questions[i].userId.username;
    //     }
    //   }
    //   console.log(user)
    //   return user;
    // },

    // RENDERS DIFFERENT QUESTIONS DEPENDING ON CURRENT PAGE
    paginatedQuestions() {
      let pageNumber = this.current - 1;

      return this.questions.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    }
  }
};
</script>


