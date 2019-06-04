<template>
  <div class="questionPage">
    <Navbar/>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-2" id="menuCol">
          <Menu/>
        </div>
        <div class="column is-10 has-margin-top-5">
          <div class="column is-12">
            <div class="columns">
              <div class="column is-10">
                <h1 class="subtitle is-size-4">{{question.title}}</h1>
              </div>
              <div class="column is-2 has-text-right">
                <router-link :to="{name: 'ask-question'}" class="button is-primary">Perguntar</router-link>
              </div>
            </div>
            <hr>
          </div>
          <div class="columns">
            <div class="column is-8">
              <div class="columns">

              </div>
            </div>
            <div class="column is-4"></div>
          </div>
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
import QuestionsService from "../services/QuestionsService";

export default {
  name: "question",
  components: {
    Navbar,
    Footer,
    Menu
  },
  data: function() {
    return {
      questionId: this.$route.params.questionId,
      question: {},
      user: {},
      inputAnswer: "" // FOR ANSWER CREATION, USING V-MODEL
    };
  },
  async mounted() {
    const questionId = this.$route.params.questionId;
    this.question = (await QuestionsService.getQuestionById(questionId)).data;
    this.user = this.question.userId;
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
  computed: {}
};
</script>
