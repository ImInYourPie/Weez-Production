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
                  <strong>{{questions.length}}</strong> perguntas
                </p>
              </div>
            </div>
            <!-- Right side -->
            <div class="level-right">
              <p class="level-item is-hidden-mobile">
                <a>Recentes</a>
              </p>
              <p class="level-item is-hidden-mobile">
                <a>Populares</a>
              </p>
              <p class="level-item">
                <router-link :to="{name: 'ask-question'}" class="button is-primary">Perguntar</router-link>
                <!-- <b-tooltip label="Faça login para fazer uma pergunta!">
                  <button v-if="token === null" class="button is-primary" disabled>Nova Pergunta</button>
                </b-tooltip>-->
              </p>
            </div>
          </nav>
          <nav class="level is-mobile is-hidden-tablet is-marginless">
            <a class="level-item">Tags</a>
            <a class="level-item">Recentes</a>
            <a class="level-item">Populares</a>
            <p class="level-item">
              <router-link :to="{name: 'ask-question'}" class="button is-primary">Perguntar</router-link>
            </p>
          </nav>
          <div class="column is-12 is-hidden-tablet">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Procurar...">
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
          <hr>
          <!-- DESKTOP TEMPLATE -->
          <div
            class="columns is-hidden-mobile question-box"
            v-for="question in paginatedQuestions"
            :key="question._id"
          >
            <div class="column is-12">
              <div class="columns is-vcentered">
                <div class="column is-2 has-text-centered">
                  <nav class="level">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="is-size-5">{{questionScore(question)}}</p>
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
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="is-size-5">{{question.views.length}}</p>
                        <p>
                          <b-icon pack="fas" icon="eye" type="is-template"></b-icon>
                        </p>
                      </div>
                    </div>
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
                      <span
                        class="is-size-7"
                        type="is-template"
                      >Pergunta feita: {{ question.date | moment("calendar") }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
          <!-- MOBILE TEMPLATE -->

          <br>
          <section>
            <b-pagination
              :total="questions.length"
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
      isPopular: false,
      isRecent: false,
      search: "",
      pageNumber: 1,
      current: 1,
      perPage: 10,
      questions: [],
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
    questionScore(question) {
      return question.upVotes - question.downVotes;
    },

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


