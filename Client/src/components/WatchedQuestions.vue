<template>
  <div class="watched-questions">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon pack="fas" icon="eye"></b-icon>&nbsp;Perguntas
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p class="is-danger" v-if="!this.$store.state.token">Apenas para utilizadores registados</p>
          <div class="columns is-multiline" v-if="this.$store.state.token">
            <div class="column is-12" v-for="watched in watchedQuestions" :key="watched._id">
              <div class="question-watched">
                <router-link
                  tag="a"
                  :to="{name: 'question-page', params: {questionId: watched.question._id, questionTitle: watched.question.title}}"
                >{{watched.question.title}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import WatchedQuestionsService from "../services/WatchedQuestionsService";
export default {
  data() {
    return {
      watchedQuestions: null
    };
  },
  async mounted() {
    this.watchedQuestions = (await WatchedQuestionsService.getWatched()).data;
    console.log(this.watchedQuestions);
  },
  props: ["question"]
};
</script>

<style lang="scss" scoped>
</style>