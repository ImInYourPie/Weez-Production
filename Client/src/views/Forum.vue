<template>
  <div class="questions">
    <Navbar/>
    <div class="container is-fluid">
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
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <input class="input" type="text" placeholder="Procurar...">
                  </p>
                  <p class="control">
                    <button class="button is-primary">
                      <i class="fas fa-search"></i>
                    </button>
                  </p>
                </div>
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
            class="column questionBox is-hidden-mobile"
            v-for="question in paginatedQuestions"
            :key="question._id"
          >
            <div class="columns">
              <div class="column is-9">
                <div class="columns">
                  <div class="column is-12">
                    <router-link
                      class="is-6 questionTitle"
                      :to="{ name: 'question-page', params: { questionId: question._id } }"
                    >{{ question.title }}</router-link>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-8">
                    <a class="tag is-primary has-margin-right-5">tag</a>
                    <a class="tag is-primary">tag</a>
                  </div>
                </div>
              </div>
              <div class="column is-3"></div>
            </div>
          </div>
          <!-- MOBILE TEMPLATE -->
          <div
            class="column questionBox is-hidden-tablet"
            v-for="question in paginatedQuestions"
            :key="question._id"
          >
            <div class="columns">
              <div class="column is-12">
                <router-link
                  class="is-6 questionTitles"
                  :to="{ name: 'question-page', params: { questionId: question._id } }"
                >{{ question.title }}</router-link>
              </div>
            </div>
            <div class="columns">
              <div class="column is-8">
                <a class="tag is-primary">Tag</a>
              </div>
            </div>
          </div>
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
// import Questions from "@/components/Questions.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Navbar,
    Menu,
    Footer
  },
  data: function() {
    return {
      isPopular: false,
      isRecent: false,
      search: "",
      pageNumber: 1,
      current: 1,
      perPage: 5,
      questions: []
    };
  },

  async mounted() {
    this.questions = await 
  },

  methods: {
    //   orderUpDate(a, b) {
    //     if (Date.parse(a.date) > Date.parse(b.date)) return 1;
    //     if (Date.parse(a.date) < Date.parse(b.date)) return -1;
    //     else return 0;
    //   },
    //   orderDownDate(a, b) {
    //     if (Date.parse(a.date) < Date.parse(b.date)) return 1;
    //     if (Date.parse(a.date) > Date.parse(b.date)) return -1;
    //     else return 0;
    //   },
    //   orderDownPopularity(a, b) {
    //     if (a.answers.length < b.answers.length) return 1;
    //     if (a.answers.length > b.answers.length) return -1;
    //     else return 0;
    //   },
    //   orderUpPopularity(a, b) {
    //     if (a.answers.length > b.answers.length) return 1;
    //     if (a.answers.length < b.answers.length) return -1;
    //     else return 0;
    //   }
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
