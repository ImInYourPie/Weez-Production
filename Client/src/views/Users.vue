<template>
  <div class="questions">
    <Navbar/>
    <div class="container is-fluid">
      <!--<b-loading is-full-page :active.sync="loading" :can-cancel="false">-->
      <!--  <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"></b-icon>-->
      <!--</b-loading>-->
      <div class="columns">
        <div id="menuCol" class="column is-2 is-hidden-mobile">
          <Menu/>
        </div>
        <div class="column is-8">
          <br>
          <nav class="breadcrumb is-hidden-mobile" aria-label="breadcrumbs">
            <ul>
              <li>
                <router-link :to="{name: 'home'}">Home</router-link>
              </li>
              <li class="is-active">
                <router-link :to="{name: 'forum'}">Fórum</router-link>
              </li>
            </ul>
          </nav>
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
                  <div class="field has-addons">
                    <p class="control">
                      <input class="input" type="text" placeholder="" style="min-width:300px;">
                    </p>
                    <p class="control">
                      <button class="button is-primary">
                        <b-icon pack="fas" icon="search" size="is-small"></b-icon>
                      </button>
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
                <input class="input" type="text" placeholder="Procurar utilizador">
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
          <hr>

          <br>
          <section>
            <b-pagination
              :total="users.length"
              :current.sync="current"
              order="is-centered"
              size="default"
              rounded
              :per-page="perPage"
            ></b-pagination>
          </section>
        </div>
      </div>
      <template></template>
    </div>
    <Footer/>
  </div>
</template>


<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Menu from "@/components/Menu.vue";
import QuestionPanel from "@/components/QuestionPanel.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { mapState } from "vuex";
import QuestionsService from "../services/QuestionsService";

export default {
  name: "forum",
  components: {
    Navbar,
    Menu,
    Footer,
    QuestionPanel
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

  async mounted() {
    this.loading = true;
    this.questions = (await QuestionsService.getQuestions()).data;
    this.questions.sort(function(a, b) {
      if (Date.parse(a.date) < Date.parse(b.date)) return 1;
      if (Date.parse(a.date) > Date.parse(b.date)) return -1;
      else return 0;
    });
    this.loading = false;
  },

  methods: {
    // questionScore(question) {
    //   return question.upVotes - question.downVotes;
    // },

    orderUpDate(a, b) {
      if (Date.parse(a.date) > Date.parse(b.date)) return 1;
      if (Date.parse(a.date) < Date.parse(b.date)) return -1;
      else return 0;
    },
    orderDownDate(a, b) {
      if (Date.parse(a.date) < Date.parse(b.date)) return 1;
      if (Date.parse(a.date) > Date.parse(b.date)) return -1;
      else return 0;
    },
    orderDownPopularity(a, b) {
      if (a.answers.length < b.answers.length) return 1;
      if (a.answers.length > b.answers.length) return -1;
      else return 0;
    },
    orderUpPopularity(a, b) {
      if (a.answers.length > b.answers.length) return 1;
      if (a.answers.length < b.answers.length) return -1;
      else return 0;
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


