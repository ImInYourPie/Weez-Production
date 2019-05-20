<template>
  <div class="questions">
    <Navbar/>
    <div class="container is-fluid">
      <div class="columns">
        <div id="menuCol" class="column is-2">
          <Menu class="is-hidden-mobile"/>
        </div>
        <div class="column is-9">
          <br>
          <nav class="breadcrumb" aria-label="breadcrumbs">
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
          <nav class="level is-mobile">
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
              <!-- <p class="level-item is-hidden-mobile">
                <a v-if="!isOrderedUp" @click="dateUp">
                  Data
                  <span>
                    <i class="fas fa-caret-up"></i>
                  </span>
                </a>
                <a v-if="isOrderedUp" @click="dateDown">
                  Data
                  <span>
                    <i class="fas fa-caret-down"></i>
                  </span>
                </a>
              </p>
              <a class="level-item is-hidden-mobile">
                <a v-if="!isPopularUp" @click="popularityUp">
                  Popularidade
                  <span>
                    <i class="fas fa-caret-up"></i>
                  </span>
                </a>
                <a v-if="isPopularUp" @click="popularityDown">
                  Popularidade
                  <span>
                    <i class="fas fa-caret-down"></i>
                  </span>
                </a>
              </a>-->
              <p class="level-item">
                <router-link :to="{name: 'ask-question'}" class="button is-primary">Nova Pergunta</router-link>
                <!-- <b-tooltip label="Faça login para fazer uma pergunta!">
                  <button v-if="token === null" class="button is-primary" disabled>Nova Pergunta</button>
                </b-tooltip>-->
              </p>
            </div>
          </nav>
          <hr>
          <h1 v-for="question in paginatedQuestions" :key="question._id">{{ question.title }}</h1>
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
      isOrderedUp: false,
      isPopularUp: false,
      search: "",
      pageNumber: 1,
      current: 1,
      perPage: 5
    };
  },

  mounted() {
    this.$store.dispatch("getQuestions");
  },

  methods: {
    // orderUpDate(a, b) {
    //   if (Date.parse(a.date) > Date.parse(b.date)) return 1;
    //   if (Date.parse(a.date) < Date.parse(b.date)) return -1;
    //   else return 0;
    // },
    // orderDownDate(a, b) {
    //   if (Date.parse(a.date) < Date.parse(b.date)) return 1;
    //   if (Date.parse(a.date) > Date.parse(b.date)) return -1;
    //   else return 0;
    // },
    // orderDownPopularity(a, b) {
    //   if (a.answers.length < b.answers.length) return 1;
    //   if (a.answers.length > b.answers.length) return -1;
    //   else return 0;
    // },
    // orderUpPopularity(a, b) {
    //   if (a.answers.length > b.answers.length) return 1;
    //   if (a.answers.length < b.answers.length) return -1;
    //   else return 0;
    // }
  },

  computed: {
    ...mapState(["questions"]),

    // RENDERS DIFFERENT QUESTIONS DEPENDING ON CURRENT PAGE
    paginatedQuestions() {
      let pageNumber = this.current - 1;

      return this.questions.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    },
  }
};
</script>
