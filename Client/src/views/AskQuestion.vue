<template>
  <div id="askQuestion">
    <Navbar/>
    <div class="container is-fluid">
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
            <router-link :to="{name: 'ask-question'}">Perguntar</router-link>
          </li>
        </ul>
      </nav>
      <div class="columns">
        <div class="column is-6">
          <form @submit.prevent="createQuestion">
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
              <button type="submit" class="button is-primary">Submeter</button>
            </div>
          </form>
        </div>
        <!--<div class="column is-6">-->
        <!--  <div id="#previewQuestion">-->
        <!--    <div class="columns is-mobile">-->
        <!--      <div class="column is-10">-->
        <!--        <h1 class="subtitle">{{ title }}</h1>-->
        <!--      </div>-->
        <!--      <div class="column is-2" v-if="title !== '' ">-->
        <!--        <b-tag size="is-medium" class="is-primary">{{ getTodaysDate() }}</b-tag>-->
        <!--      </div>-->
        <!--    </div>-->
        <!--    <div class="columns">-->
        <!--      <div class="column is-12">{{ description }}</div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
      </div>
      <br>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import QuestionsService from "../services/QuestionsService"
import TagsService from "../services/TagsService"
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
        returnedTags: []
    };
  },
  async mounted() {
    this.returnedTags = (await TagsService.getTags()).data
    console.log(this.returnedTags)
  },
  methods: {
    
    async createQuestion () {
      try{
        const questionId = (await QuestionsService.createQuestion({
          title: this.title,
          description: this.description,
          tags: this.tags,
          userId: this.user._id
        })).data
        this.router.push({name: "question-page", params: {questionId: questionId}});
        console.log("i ran")
      } catch(error) {
        this.error = "Alguma coisa correu mal!"
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
    },
    // onCreateQuestion() {
    //   let newQuestionData = {
    //     id: this.generateUniqueId,
    //     userId: this.$store.getters.token.id,
    //     title: this.form.title,
    //     classId: this.form.classId,
    //     description: this.form.description,
    //     date: this.$store.getters.getTodaysDate,
    //     tags: this.form.tags
    //   };
    //   this.$store.dispatch("createQuestion", newQuestionData);
    //   this.$toast.open({
    //     message: "Pergunta registada!",
    //     type: "is-success"
    //   });
    //   this.$router.push("forum");
    // }
  },

  computed: {
    ...mapState(["user"])
  }
};
</script>