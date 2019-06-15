<template>
  <div class="questionPage">
    <Navbar/>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-2 is-hidden-mobile" id="menuCol">
          <Menu/>
        </div>
        <div class="column is-7 has-margin-top-5">
          <div class="column is-12">
            <div class="columns">
              <div class="column is-10">
                <h1 class="title is-size-4">{{question.title}}</h1>

                <div class="column is-12">
                  <p>{{question.description}}</p>
                </div>
              </div>

              <div class="column is-hidden-mobile is-2 has-text-right">
                <div class="subtitle" style="font-size:15px">
                  <span>Perguntado por:&nbsp;</span>
                  <router-link
                    tag="a"
                    class="is-size-6"
                    :to="{name: 'profile', params: {username: question.userId.username} }"
                  >{{question.userId.username }}</router-link>
                </div>
                <br>
                <b-tooltip label="Seguir pergunta" position="is-left">
                  <button
                    v-if="token && !isWatched"
                    @click.prevent="watchQuestion"
                    class="button is-primary"
                  >
                    <b-icon pack="fas" icon="eye"></b-icon>
                  </button>
                </b-tooltip>
                <b-tooltip label="Não seguir pergunta" position="is-left">
                  <button
                    v-if="token && isWatched"
                    @click.prevent="deleteWatchedQuestion"
                    class="button is-primary"
                  >
                    <b-icon pack="fas" icon="eye-slash"></b-icon>
                  </button>
                </b-tooltip>
              </div>
            </div>
            <div class="column is-4"></div>
            <div class="column is-6">
              <button class="button buttonIcon" id="btnUp">
                <i id="icon" class="fas fa-arrow-circle-up fa-2x" style="color:#ff303f"></i>
              </button>
              <button class="button buttonIcon" id="btnDown">
                <i id="icon" class="fas fa-arrow-circle-down fa-2x"></i>
              </button>
            </div>
            <hr id="hr">
            <form @submit.prevent="createComment">
              <div class="control" v-if="token">
                <textarea
                  v-model="description"
                  class="textarea"
                  placeholder="Escreve aqui uma resposta..."
                ></textarea>
              </div>
              <div class="control" v-if="!token">
                <textarea
                  class="textarea"
                  placeholder="É nessesário fazer login para comentar"
                  disabled
                ></textarea>
              </div>
              <button
                type="submit"
                v-if="token"
                class="button is-primary is-link has-margin-left-5 has-margin-top-5"
              >Enviar</button>
              <router-link
                tag="button"
                v-if="!token"
                class="button is-primary"
                :to="{ name: 'login' }"
              >Login</router-link>
            </form>
          </div>
          <div class="columns has-margin-left-5">
            <div class="column is-12">
              <div class="columns">
                <!-- <div class="column is-12"><p>{{question.description}}</p></div> -->
                <div class="column">
                  <div class="card">
                    <div class="card-content">
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-48x48">
                            <img
                              src="https://bulma.io/images/placeholders/96x96.png"
                              alt="Placeholder image"
                            >
                          </figure>
                        </div>
                        <div class="media-content">
                          <p class="title is-4">Gajo Fixe</p>
                          <p class="subtitle is-6">@SouDeGaia</p>
                        </div>
                      </div>

                      <div class="content">
                        Ah e tal isto é um comentário fixe e eu sou uma card feita com Bulma
                        <a>@bulmaio</a>.
                        <a href="#">#css</a>
                        <a href="#">#responsive</a>
                        <br>
                        <time datetime="2019-6-6">11:09 PM - 6 June 2019</time>
                      </div>
                    </div>
                  </div>
                  <br>
                  <div class="card">
                    <div class="card-content">
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-48x48">
                            <img
                              src="https://bulma.io/images/placeholders/96x96.png"
                              alt="Placeholder image"
                            >
                          </figure>
                        </div>
                        <div class="media-content">
                          <p class="title is-4">Comentador Genérico</p>
                          <p class="subtitle is-6">@CenasCoiso</p>
                        </div>
                      </div>

                      <div class="content">
                        Olá eu juro que não sou um robô e gosto dessa pergunta mas não sei respondê-la
                        <a>@iotech</a>.
                        <a href="#">#Hashtag</a>
                        <br>
                        <time datetime="2019-6-6">11.24 PM - 8 June 2019</time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4"></div>
          </div>
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
import Footer from "@/components/Footer.vue";
import Menu from "@/components/Menu.vue";
import WatchedTags from "@/components/WatchedTags.vue";
import WatchedQuestions from "@/components/WatchedQuestions.vue";
import RecentlyViewed from "@/components/RecentlyViewed.vue";
import QuestionsService from "../services/QuestionsService";
import RecentlyViewedService from "../services/RecentlyViewedService";
import CommentsService from "../services/CommentsService";
import WatchedQuestionsService from "../services/WatchedQuestionsService";
import { mapState } from "vuex";

export default {
  name: "question",
  components: {
    Navbar,
    Footer,
    Menu,
    WatchedTags,
    WatchedQuestions,
    RecentlyViewed
  },
  data: function() {
    return {
      questionId: this.$route.params.questionId,
      question: null,
      user: {},
      isWatched: false,
      comments: null,
      description: "" // FOR ANSWER CREATION, USING V-MODEL
    };
  },
  async mounted() {
    const questionId = this.$route.params.questionId;
    this.question = (await QuestionsService.getQuestionById(questionId)).data;
    this.user = this.question.userId;

    if (this.token) {
      this.isWatched = (await WatchedQuestionsService.findWatchedQuestion(questionId)).data;
      RecentlyViewedService.postRecentlyViewed({
        questionId: questionId
      });
    }


    
  },
  methods: {
    async createComment() {
      const questionId = this.$route.params.questionId;
      await CommentsService.createComment(questionId, this.description);
      this.$router.go();
    },

    async watchQuestion() {
      const questionId = this.$route.params.questionId;
      await WatchedQuestionsService.postWatchedQuestion(questionId);
      this.isWatched = true;
    },
    async deleteWatchedQuestion() {
      const questionId = this.$route.params.questionId;
      await WatchedQuestionsService.deleteWatchedQuestion(questionId);
      this.isWatched = false;
    },
    async voteQuestionUp() {
      const questionId = this.$route.params.questionId;
    },
    async voteQuestionDown() {
      const questionId = this.$route.params.questionId;
    }
    
  },
  computed: {
    ...mapState(["token"])
  }
};
</script>
