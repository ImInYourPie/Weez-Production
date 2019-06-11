<template>
  <div class="questionPage">
    <Navbar/>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-2 is-hidden-mobile" id="menuCol">
          <Menu/>
        </div>
        <div class="column is-10 has-margin-top-5">
          <div class="column is-12">
            <div class="columns">
              <div class="column is-10">
                <!-- <h1 class="subtitle is-size-4">{{question.title}}</h1> -->
                 <h1 class="title is-size-4">{{question.title}}</h1>
                 
                 <div class="column is-12"><p>{{question.description}}</p></div>
                  
              </div>
               
              <div class="column is-hidden-mobile is-2 has-text-right">
                <div class= "subtitle" style="font-size:15px"><p>Criado por: Nome do Utilizador</p></div>
                <br>
                <router-link :to="{name: 'ask-question'}" class="button is-primary">Perguntar</router-link>
              </div>
            </div>
            <div class="column is-4"></div>
            <div class="column is-6">
                 <i id= "icon" class="fas fa-arrow-circle-up fa-2x" style="color:#ff303f" ></i>
                 <i class="fas fa-arrow-circle-down fa-2x"></i>
                 </div>
            <hr id="hr">
            <textarea id="box" class="textarea has-margin-left-5" placeholder="Escreve aqui o teu comentário..."></textarea>
            <button class="button is-primary is-link has-margin-left-5 has-margin-top-5">Enviar</button>
          </div>
          <div class="columns has-margin-left-5">
            <div class="column is-8">
              <div class="columns">
               <!-- <div class="column is-12"><p>{{question.description}}</p></div> -->
  <div class="column"> 
              <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">Gajo Fixe</p>
        <p class="subtitle is-6">@SouDeGaia</p>
      </div>
    </div>

    <div class="content">
      Ah e tal isto é um comentário fixe e eu sou uma card feita com Bulma <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
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
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">Comentador Genérico</p>
        <p class="subtitle is-6">@CenasCoiso</p>
      </div>
    </div>

    <div class="content">
      Olá eu juro que não sou um robô e gosto dessa pergunta mas não sei respondê-la  <a>@iotech</a>.
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
