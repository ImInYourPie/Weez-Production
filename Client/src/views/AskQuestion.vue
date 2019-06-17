<template>
  <div id="askQuestion">
    <Navbar/>
    <div class="container is-fluid">
      <br>
      <div class="columns">
        <div class="column is-6">
          <form>
            <b-field label="Título">
              <b-input
                placeholder="Descrição rápida da pergunta..."
                type="text"
                v-model="title"
                maxlength="80"
                required
              ></b-input>
            </b-field>
            <b-field label="Descrição">
              <b-input
                type="textarea"
                v-model="description"
                minlength="10"
                maxlength="800"
                placeholder="Escreve aqui a tua pergunta completa..."
                required
              ></b-input>
            </b-field>
            <b-field label="Tags">
              <b-taginput
                v-model="tags"
                :data="returnedTags"
                autocomplete
                allow-new
                type="is-primary"
                field="name"
                icon="label"
                placeholder="Máximo 5 tags"
                maxlength="20"
                @typing="getFilteredTags"
              ></b-taginput>
            </b-field>
            <div class="column has-text-right">
              <button
                @click.prevent="createQuestion"
                type="submit"
                class="button is-primary"
              >Submeter</button>
            </div>
          </form>
        </div>
        <div class="column is-6">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Perguntas Existentes</p>
            </header>
            <div class="card-content">
              <!--            <b-loading is-full-page="false" :active.sync="loading" :can-cancel="false">-->
              <!--  <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"></b-icon>-->
              <!--</b-loading>-->
              <div class="content">
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <div class="has-text-centered" v-if="!questions">
                      <h1
                        class="subtitle is-size-6"
                      >As perguntas aparecem aqui à medida que insere o titulo</h1>
                    </div>
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
                              </div>-->
                            </nav>
                          </div>
                          <div class="column is-10">
                            <div class="columns">
                              <div class="column is-12">
                                <router-link
                                  tag="a"
                                  target="_blank"
                                  :to="{name: 'question-page', params: {questionId: question._id, questionTitle: question.title}}"
                                >{{question.title}}</router-link>
                              </div>
                            </div>
                            <div class="columns">
                              <div class="column is-6">
                                <a
                                  v-for="tag in question.tags"
                                  :key="tag"
                                  class="has-margin-right-5"
                                >
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import QuestionsService from "../services/QuestionsService";
import TagsService from "../services/TagsService";
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "ask",
  components: {
    Navbar,
    Footer
  },
  data: function() {
    return {
      title: "",
      description: "",
      tags: [],
      error: "",
      filteredTags: [],
      returnedTags: [],
      questions: null,
      loading: false
    };
  },
  async mounted() {
    this.returnedTags = (await TagsService.getTags()).data;
    console.log(this.returnedTags);
  },
  methods: {
    async createQuestion() {
      try {
        const questionId = (await QuestionsService.createQuestion({
          title: this.title,
          description: this.description,
          tags: this.tags,
          userId: this.user._id
        })).data;
        this.$router.push({
          name: "question-page",
          params: { questionId: questionId }
        });
        console.log("i ran");
      } catch (error) {
        this.error = "Alguma coisa correu mal!";
      }
    },

    getFilteredTags(text) {
      this.filteredTags = this.returnedTags.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  },

  watch: {
    title: _.debounce(async function(value) {
      console.log(value);
      this.loading = true;
      if (value)
        this.questions = (await QuestionsService.returnQuestionByTitle(
          value
        )).data;
      else this.questions = null;
      this.loading = false;
    }, 700)
  },

  computed: {
    ...mapState(["user"])
  }
};
</script>