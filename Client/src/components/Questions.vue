<template>
  <div id="questionsComponent">
    <!-- RENDER ALL QUESTIONS IN QUESTIONS -->
    <section v-for="question in paginatedQuestions" :key="question.id">
      <div class="columns is-mobile">
        <div class="column is-10">
          <router-link
            class="is-6 questionTitles"
            :to="{ name: 'question-page', params: { questionId: question.id } }"
          >{{ question.title }}</router-link>
        </div>
        <template v-for="className in classes">
          <div
            class="column is-2 has-text-right"
            v-if="className.id === question.classId"
            :key="className.id"
          >
            <b-tag class="is-secondary">{{ className.abrebiation }}</b-tag>
          </div>
        </template>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p>
              {{question.upvotes}}
              <i class="fas fa-arrow-up" style="color:green"></i>
            </p>
          </div>
          <div class="level-item">
            <p>
              {{question.downvotes}}
              <i class="fas fa-arrow-down" style="color:red"></i>
            </p>
          </div>
        </div>
      </nav>
      <nav class="level is-mobile">
        <div class="level-left">
          <template v-for="questionTag in question.tags">
              <div class="level-item" :key="questionTag">
                <b-tag>{{ questionTag }}</b-tag>
              </div>
          </template>
        </div>
        <div class="level-right">
          <p>Feita em {{ question.date }}</p>
        </div>
      </nav>

      <hr>
    </section>
    <template>
      <section>
        <b-pagination
          :total="total"
          :current.sync="current"
          order="is-centered"
          size="default"
          rounded
          :per-page="perPage"
        ></b-pagination>
      </section>
    </template>
  </div>
</template>
<!-- -->
<script>
export default {
  data: function() {
    return {
      isOrderedUp: false,
      isPopularUp: false,
      searchText: "",
      filteredQuestions: this.$store.state.questions,
      current: 1,
      total: this.$store.state.questions.length,
      perPage: 5
    };
  },
  mounted(){
    // SORT BY DATE WHEN MOUNT
    this.sortQuestionsRecent();
  },
  methods: {
    // SORTING FUNCTION, BY DATE
    orderUpDate(a, b) {
      if (Date.parse(a.date) < Date.parse(b.date)) return 1;
      if (Date.parse(a.date) > Date.parse(b.date)) return -1;
      else return 0;
    },
    // CALLS SORTING FUNCTION TO SORT QUESTIONS BY DATE
    sortQuestionsRecent() {
      this.filteredQuestions = this.$store.state.questions.sort(this.orderUpDate);
    },
    // searchQuestions() {
    //   return this.paginatedQuestions.filter(question => {
    //     return question.title.toLowerCase().includes(this.search.toLowerCase());
    //   });
    // }
  },

  computed: {
    // RENDERS DIFFERENT QUESTIONS DEPENDING ON CURRENT PAGE
    paginatedQuestions() {
      let pageNumber = this.current - 1;

      return this.filteredQuestions.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
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
