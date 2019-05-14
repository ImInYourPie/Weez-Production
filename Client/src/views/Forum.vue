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
                    <input
                      class="input"
                      type="text"
                      placeholder="Procurar..."
                    >
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
              </a>
              <p class="level-item">
                <router-link
                  v-if="token !== null"
                  :to="{name: 'ask-question'}"
                  class="button is-primary"
                >Nova Pergunta</router-link>
                <b-tooltip label="Faça login para fazer uma pergunta!">
                  <button v-if="token === null" class="button is-primary" disabled>Nova Pergunta</button>
                </b-tooltip>
              </p>
            </div>
          </nav>
          <hr>
          <Questions/>
          <br>
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
import Questions from "@/components/Questions.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    Navbar,
    Menu,
    Questions,
    Footer
  },
  data: function() {
    return {
      isOrderedUp: false,
      isPopularUp: false,
      search: "",
      filteredQuestions: this.$store.state.questions,
      pageNumber: 1,
      total: this.$store.state.questions.length,
      perPage: 5
    };
  },

  beforeMount() {
    this.dateDown;
  },

  methods: {
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
    },

    dateDown() {
      this.$store.state.questions.sort(this.orderDownDate);
      this.isOrderedUp = false;
    },

    dateUp() {
      this.$store.state.questions.sort(this.orderUpDate);
      this.isOrderedUp = true;
    },

    popularityUp() {
      this.$store.state.questions.sort(this.orderUpPopularity);
      this.isPopularUp = true;
    },

    popularityDown() {
      this.$store.state.questions.sort(this.orderDownPopularity);
      this.isPopularUp = false;
    },
  },

  computed: {
    token() {
      return this.$store.getters.token;
    },

    questions() {
      return this.$store.getters.questions;
    },
    users() {
      return this.$store.getters.users;
    },
    tags() {
      return this.$store.getters.tags;
    },
    courses() {
      return this.$store.getters.courses;
    },
    classes() {
      return this.$store.getters.classes;
    }
  }
};
</script>
