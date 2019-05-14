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
            <router-link :to="{name: 'ask-question'}">Nova Pergunta</router-link>
          </li>
        </ul>
      </nav>
      <div class="columns">
        <div class="column is-6">
          <form @submit.prevent="onCreateQuestion()">
            <b-field label="Título">
              <b-input
                placeholder="Descrição rápida da pergunta..."
                type="text"
                v-model="form.title"
                maxlength="80"
                required
              ></b-input>
            </b-field>
            <b-field label="Disciplina">
              <b-select
                placeholder="Seleciona uma disciplina..."
                v-model="form.classId"
                required
                expanded
              >
                <option
                  v-for="option in classes"
                  :value="option.id"
                  :key="option.id"
                >{{ option.name }}</option>
              </b-select>
            </b-field>
            <b-field label="Descrição">
              <b-input
                type="textarea"
                v-model="form.description"
                minlength="10"
                maxlength="800"
                placeholder="Escreve aqui a tua pergunta completa..."
                required
              ></b-input>
            </b-field>
            <b-field label="Tags">
              <b-taginput
                v-model="form.tags"
                :data="tags"
                autocomplete
                allow-new
                type="is-primary"
                field="name"
                icon="label"
                placeholder="Máximo 5 tags"
                maxlength="5"
                @typing="getFilteredTags"
              ></b-taginput>
            </b-field>
            <div class="column has-text-right">
              <button type="submit" class="button is-primary">Submeter</button>
            </div>
          </form>
        </div>
        <div class="column is-6">
          <div id="#previewQuestion">
            <div class="columns is-mobile">
              <div class="column is-10">
                <h1 class="subtitle">{{ form.title }}</h1>
              </div>
              <div class="column is-2" v-if="form.title !== '' ">
                <b-tag size="is-medium" class="is-primary">{{ getTodaysDate() }}</b-tag>
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">{{ form.description }}</div>
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

export default {
  name: "home",
  components: {
    Navbar,
    Footer
  },
  data: function() {
    return {
      form: {
        title: "",
        classId: null,
        description: "",
        tags: []
      }
    };
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.tags.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },
    getTodaysDate() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      today = dd + "-" + mm + "-" + yyyy;
      return today;
    },
    generateUniqueId() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    },
    onCreateQuestion() {
      let newQuestionData = {
        id: this.generateUniqueId,
        userId: this.$store.getters.token.id,
        title: this.form.title,
        classId: this.form.classId,
        description: this.form.description,
        date: this.$store.getters.getTodaysDate,
        tags: this.form.tags
      };
      this.$store.dispatch("createQuestion", newQuestionData);
      this.$toast.open({
        message: "Pergunta registada!",
        type: "is-success"
      });
      this.$router.push("forum");
    }
  },

  computed: {
    classes() {
      return this.$store.getters.classes;
    },
    tags() {
      return this.$store.getters.tags;
    },
    questions() {
      return this.$store.getters.questions;
    }
  }
};
</script>