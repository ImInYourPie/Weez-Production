<template>
  <div class="questionPage">
    <Navbar/>
    <div class="container">
      <br>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <router-link :to="{name: 'home'}">Home</router-link>
          </li>
          <li>
            <router-link :to="{name: 'forum'}">Fórum</router-link>
          </li>
          <li class="is-active">
            <router-link :to="{name: 'question-page'}">Pergunta</router-link>
          </li>
        </ul>
      </nav>
      <!-- QUESTION RENDERING -->
      <div id="questionContainer">
        <div class="columns is-mobile">
          <div class="column is-6">
            <p class="title is-5">{{ question.title }}</p>
          </div>
          <div class="column is-6 has-text-right">
            <b-tag class="is-primary" size="is-medium">Feita em {{ question.date }}</b-tag>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-12">
            <p class="subtitle is-6">{{ question.description }}</p>
          </div>
        </div>
        <div class="columns is-vcentered is-mobile">
          <div v-if="token != null" class="column is-6">
            <a @click="addQuestionUpvote" class="button is-success">
              <i class="fas fa-arrow-up"></i>
              &nbsp;{{ question.upvotes }}
            </a>
            &nbsp;
            <a @click="addQuestionDownvote" class="button is-danger">
              <i class="fas fa-arrow-down"></i>
              &nbsp;{{ question.downvotes }}
            </a>
          </div>
          <div v-else class="column is-6">
            <i class="fas fa-arrow-up" style="color:green"></i>
            &nbsp;{{ question.upvotes }}
            &nbsp;
            <i class="fas fa-arrow-down" style="color:red"></i>
            &nbsp;{{ question.downvotes }}
          </div>
          <div class="column is-3 is-offset-3">
            <article id="mediaUser" class="media is-primary">
              <div class="media-left">
                <p class="image is-64x64">
                  <img class="is-rounded" :src="asker.profilePicture">
                </p>
              </div>
              <div class="media-content is-hidden-mobile">
                <div class="content">
                  <p>{{ asker.username }}</p>
                  <p>
                    <!-- &nbsp;{{ asker.trophies.bronze.length }}&nbsp;
                    <i
                      class="fas fa-trophy"
                      style="color:brown"
                    ></i>
                    &nbsp;{{ asker.trophies.silver.length }}&nbsp;
                    <i
                      class="fas fa-trophy"
                      style="color:silver"
                    ></i>
                    &nbsp;{{ asker.trophies.gold.length }}&nbsp;
                    <i
                      class="fas fa-trophy"
                      style="color:gold"
                    ></i>-->
                  </p>
                </div>
              </div>
              <div class="media-right">
                <p>
                  <i class="fas fa-arrow-up"></i>
                  &nbsp;{{ asker.allUpvotes }}
                </p>
                <p>
                  <i class="fas fa-arrow-down"></i>
                  &nbsp;{{ asker.allDownvotes }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <br>
      <!-- COMMENT SECTION -->
      <div id="answerSection">
        <div v-for="answer in answers" :key="answer.id">
          <div v-for="user in users" :key="user.id">
            <article v-if="user.id === answer.userId" class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img class="is-rounded" :src="user.profilePicture">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ user.username }}</strong>
                    <br>
                    {{ answer.comment }}
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item">
                      <span class="icon is-medium">
                        {{ answer.upvotes }}&nbsp;
                        <i class="fas fa-arrow-up"></i>
                      </span>
                    </a>
                    <a class="level-item">
                      <span class="icon is-medium">
                        {{ answer.downvotes }}&nbsp;
                        <i class="fas fa-arrow-down"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
              <div class="media-right"></div>
            </article>
          </div>
          <hr>
        </div>
      </div>
      <br>
      <!-- INPUT COMMENT -->
      <div id="answerInsert" v-if="token != null">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img class="is-rounded" :src="token.profilePicture">
            </p>
          </figure>
          <div class="media-content">
            <form @submit.prevent="onCreateAnswer()">
              <div class="field">
                <p class="control">
                  <textarea
                    v-model="inputAnswer"
                    class="textarea"
                    placeholder="Responde aqui ao teu amiguito..."
                    required
                    minlength
                    maxlength="800"
                  ></textarea>
                </p>
              </div>
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <button type="submit" class="button is-primary">Responder</button>
                  </div>
                </div>
              </nav>
            </form>
          </div>
        </article>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "question",
  components: {
    Navbar,
    Footer
  },
  data: function() {
    return {
      questionId: this.$route.params.questionId,
      question: {},
      answers: [],
      asker: {},
      inputAnswer: "" // FOR ANSWER CREATION, USING V-MODEL
    };
  },
  async mounted() {
    // GETS EVERYTHING NECESSARY FOR PAGE AT VUE MOUNT
  },
  methods: {
    // getQuestion() {
    //   this.question = this.$store.getters.getQuestionById(this.questionId);
    // },
    // getAnswers() {
    //   this.answers = this.$store.getters.getAnswersByQuestionId(
    //     this.questionId
    //   );
    // },
    // getAsker() {
    //   this.asker = this.$store.getters.getUserById(this.question.userId);
    // },

    // // ADD ANSWER
    // onCreateAnswer() {
    //   let newData = {
    //     newAnswer: {
    //       id: this.generateUniqueId,
    //       userId: this.$store.state.token.id,
    //       comment: this.inputAnswer,
    //       upvotes: 0,
    //       downvotes: 0,
    //       date: this.$store.getters.getTodaysDate
    //     },
    //     question: this.question
    //   };
    //   this.$store.dispatch("createAnswer", newData);
    //   this.$toast.open({
    //     message: "Resposta criada!",
    //     type: "is-success"
    //   });
    // },

    // // UPDATE UPVOTES && DOWNVOTES ON QUESTION
    // addQuestionUpvote() {
    //   let upvote = {
    //     amount: 1,
    //     question: this.question
    //   };
    //   this.$store.dispatch("updateQuestionUpvote", upvote);
    // },
    // addQuestionDownvote() {
    //   let downvote = {
    //     amount: 1,
    //     question: this.question
    //   };
    //   this.$store.dispatch("updateQuestionDownvote", downvote);
    // },

    // // UPDATE UPVOTES && DOWNVOTES ON QUESTION
    // // addAnswerUpvote(id) {
    // //   let upvote = {
    // //     amount: 1,
    // //     answer:
    // //   };
    // //   this.$store.dispatch("updateQuestionUpvote", upvote);
    // // },
    // // addAnswerDownvote(id) {
    // //   let downvote = {
    // //     amount: 1,
    // //     answer: this.answers
    // //   };
    // //   this.$store.dispatch("updateQuestionDownvote", downvote);
    // // }
    // generateUniqueId() {
    //   function s4() {
    //     return Math.floor((1 + Math.random()) * 0x10000)
    //       .toString(16)
    //       .substring(1);
    //   }
    //   return (
    //     s4() +
    //     s4() +
    //     "-" +
    //     s4() +
    //     "-" +
    //     s4() +
    //     "-" +
    //     s4() +
    //     "-" +
    //     s4() +
    //     s4() +
    //     s4()
    //   );
    // }
  },
  computed: {
    
  }
};
</script>
