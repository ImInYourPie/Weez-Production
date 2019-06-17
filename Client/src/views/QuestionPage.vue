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
                <!--<h1 class="title is-size-4">{{question.title}}</h1>-->
                <div class="column is-12">
                  <p>{{question.description}}</p>
                </div>
              </div>

              <div class="column is-2 has-text-right">
                <div class="subtitle" style="font-size:15px">
                  <span>Perguntado por:&nbsp;</span>
                  <router-link
                    tag="a"
                    v-model= "username"
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
              <button  @click.prevent="upVoteQuestion" class="button is-rounded" id="btnUp">
                <i id="icon" 
                class="fas fa-arrow-circle-up fa-2x"></i>
              </button>
              <span class="has-margin-right-10 is-size-5">&nbsp;{{question.upVotes.length}}</span>
              <button @click.prevent="downVoteQuestion" class="button is-rounded" id="btnDown" >
                <i id="icon" class="fas fa-arrow-circle-down fa-2x"></i>
              </button>
              <span class="is-size-5">&nbsp;{{question.downVotes.length}}</span>
            </div>
            <!--<div> Total: {{question.upVotes.length - question.downVotes.length}}</div>-->
            <hr id="hr">
            <form @submit.prevent="createComment">
              <div class="control" v-if="token">
                <textarea
                  v-model="description"
                  class="textarea"
                  placeholder="Escreve aqui uma resposta..."
                ></textarea>
                <b-loading :is-full-page="isFullPage" :active.sync="loading" :can-cancel="false"></b-loading>
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
          <br>
          <div class="columns has-margin-left-5">
            <div class="column is-12">
              <div class="columns is-multiline">
                <div v-if="!comments.length" class="column is-full has-text-centered box no-comments">
                    <p class="is-size-5">Sé o primeiro a responder!</p>
                  </div>
                <!-- <div class="column is-12"><p>{{question.description}}</p></div> -->
                <div class="column is-full" v-for="comment in comments" :key="comment._id">
                  <div class="card">
                    <div class="card-content">
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-48x48">
                            <img
                              :src="comment.user.profilePic"
                              alt="Placeholder image"
                            >
                          </figure>
                        </div>
                        <div class="media-content">
                          <p class="title is-4">{{comment.user.username}}</p>
                        </div>
                      </div>

                      <div class="content">
                         {{comment.description}}
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
    <br>
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
        description: "", // FOR ANSWER CREATION, USING V-MODEL
        loading: false, 
        isFullPage: false
      };
    },
    async mounted() {
      const questionId = this.$route.params.questionId;
      this.question = (await QuestionsService.getQuestionById(questionId)).data;
      this.comments = (await QuestionsService.getComments(questionId)).data;
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
        this.loading = true;
        const questionId = this.$route.params.questionId;
        await CommentsService.createComment(questionId, this.description);
        this.description = "";
        this.question = (await QuestionsService.getQuestionById(questionId)).data;
        this.comments = (await QuestionsService.getComments(questionId)).data;
        this.loading = false;
        
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
      async upVoteQuestion() {
        const questionId = this.$route.params.questionId;
        await QuestionsService.upVoteQuestion(questionId);
        this.question = (await QuestionsService.getQuestionById(questionId)).data;
        this.comments = (await QuestionsService.getComments(questionId)).data;
        
      },
      async downVoteQuestion() {
        const questionId = this.$route.params.questionId;
        await QuestionsService.downVoteQuestion(questionId);
        this.question = (await QuestionsService.getQuestionById(questionId)).data;
        this.comments = (await QuestionsService.getComments(questionId)).data;
      }

    },
    computed: {
      ...mapState(["token", "user"])
    }
  };
</script>