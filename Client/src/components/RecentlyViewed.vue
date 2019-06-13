<template>
  <div class="recently-viewed">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon pack="fas" icon="history"></b-icon>&nbsp;Histórico
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p class="is-danger" v-if="!this.$store.state.token">Apenas para utilizadores registados</p>
          <div class="columns is-multiline" v-if="this.$store.state.token">
            <div class="column is-12" v-for="view in viewed" :key="view._id">
              <div class="question-viewed">
                <router-link
                  tag="a"
                  :to="{name: 'question-page', params: {questionId: view._id, questionTitle: view.title}}"
                >{{view.question.title}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RecentlyViewedService from "../services/RecentlyViewedService";

export default {
  data() {
    return {
      viewed: []
    };
  },
  async mounted() {
    if (this.$store.state.token) {
      this.viewed = (await RecentlyViewedService.getViewed()).data;
      console.log(this.viewed);
    }
  }
};
</script>

<style lang="scss" scoped>
.question-viewed{
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 10px;
}
</style>