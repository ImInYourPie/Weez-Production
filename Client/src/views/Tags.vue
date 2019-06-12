<template>
  <div class="questions">
    <Navbar/>
    <div class="container is-fluid">
      <b-loading is-full-page :active.sync="loading" :can-cancel="false">
        <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin"></b-icon>
      </b-loading>
      <div class="columns">
        <div id="menuCol" class="column is-2 is-hidden-mobile">
          <Menu/>
        </div>
        <div class="column is-7 main-container">
          <br>
          <!-- <nav class="breadcrumb is-hidden-mobile" aria-label="breadcrumbs">
            <ul>
              <li>
                <router-link :to="{name: 'home'}">Home</router-link>
              </li>
              <li class="is-active">
                <router-link :to="{name: 'forum'}">Fórum</router-link>
              </li>
            </ul>
          </nav>-->
          <!-- Main container -->
          <nav class="level is-hidden-mobile">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item is-hidden-mobile">
                <p class="subtitle is-5">
                  <strong>{{tags.length}}</strong> Tags
                </p>
              </div>
              <div class="level-item has-margin-left-10">
                <div class="field">
                  <p class="control has-icons-right">
                    <input class="input" v-model="search" type="text" placeholder="Procurar Tags..." style="min-width:300px;">
                    <span class="icon is-small is-right">
                      <i class="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <!-- Right side -->
          </nav>
          <nav class="level is-mobile is-hidden-tablet is-marginless">
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum' }" class="level-item">Perguntas</router-link>
            </p>
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum-tags' }" class="level-item is-active">Tags</router-link>
            </p>
            <p class="level-item has-text-centered">
              <router-link tag="a" :to="{name: 'forum-users' }" class="level-item">Users</router-link>
            </p>
          </nav>
          <div class="column is-12 is-hidden-tablet">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" v-model="search" type="text" placeholder="Procurar Tags...">
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
          <hr>
          <div class="columns is-multiline is-mobile">
            <div class="column is-3" v-for="tag in tags" :key="tag._id">
              <b-taglist attached size="is-medium">
                    <b-tag type="is-primary" size="is-medium">{{tag.name}}</b-tag>
                    <b-tag type="is-template" size="is-medium"><a>Seguir</a></b-tag>
                    <!-- <b-tag type="is-template" size="is-medium" v-if="isWatched(tag)"><a>Não Seguir</a></b-tag> -->
                </b-taglist>
            </div>
          </div>
          <br>
          <!-- <section>
            <b-pagination
              :total="tags.length"
              :current.sync="current"
              order="is-centered"
              size="default"
              rounded
              :per-page="perPage"
            ></b-pagination>
          </section> -->
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>


<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
import TagsService from "../services/TagsService";

export default {
  name: "forum",
  components: {
    Navbar,
    Menu,
    Footer
  },

  data: function() {
    return {
      search: "",
      pageNumber: 1,
      current: 1,
      perPage: 10,
      tags: [],
      loading: false
    };
  },

  // async mounted() {
  //   this.loading = true;
  //   this.tags = (await TagsService.getTags()).data;
  //   this.loading = false;
  // },

  methods: {
  
  },
  watch: {
    search: _.debounce(async function(value) {
      const route = {
        name: "forum-tags"
      };
      if (this.search !== "") {
        route.query = {
          search: this.search
        };
      }
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.loading = true;
        this.search = value;
        this.tags = (await TagsService.getTags(value)).data;
        this.loading = false;
      }
    }
  },

  computed: {
    // ...mapState(["questions"]),

    // RENDERS DIFFERENT QUESTIONS DEPENDING ON CURRENT PAGE
    paginatedQuestions() {
      let pageNumber = this.current - 1;

      return this.questions.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    }
  }
};
</script>


