<template>
  <div id="profilePage">
    <Navbar/>
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <br>
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <router-link :to="{name: 'home'}">Home</router-link>
              </li>
              <li class="is-active">
                <router-link :to="{name: 'profile'}">Perfil</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure id class="image">
                <img :src="token.profilePicture" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{token.username}}</p>
                  <nav class="level is-mobile">
                    <div class="level-left" v-for="course in courses" :key="course.id">
                      <div class="level-item" v-if="course.id == token.courseId">
                        <p class="subtitle is-6">{{course.abrebiation}}</p>
                      </div>
                    </div>
                    <div class="level-left">
                      <div class="level-item">
                        &nbsp;{{ token.trophies.bronze.length }}&nbsp;
                        <i
                          class="fas fa-trophy"
                          style="color:brown"
                        ></i>
                        &nbsp;{{ token.trophies.silver.length }}&nbsp;
                        <i
                          class="fas fa-trophy"
                          style="color:silver"
                        ></i>
                        &nbsp;{{ token.trophies.gold.length }}&nbsp;
                        <i
                          class="fas fa-trophy"
                          style="color:gold"
                        ></i>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">
                <i class="fas fa-camera fa-1x"></i>
              </a>
              <a class="card-footer-item">
                <i class="fas fa-edit fa-1x"></i>
              </a>
            </footer>
          </div>
        </div>
        <div class="column is-8">
          <div class="columns">
            <div class="column is-12">
              <p class="title is-4">Conquistas</p>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <template>
                <b-tabs type="is-boxed">
                  <b-tab-item
                    @click="selectedTab = 'bronze'"
                    label="Bronze"
                    icon-pack="fas"
                    icon="trophy"
                  >
                    <div>
                      <template>
                        <template v-for="bronzeTrophy in bronze">
                          <nav
                            class="level is-mobile successTrophy"
                            :key="bronzeTrophy.description"
                          >
                            <div class="level-left">
                              <div class="level-item">
                                <i class="fas fa-trophy" style="color:brown"></i>
                              </div>
                              <div class="level-item">
                                <h1 class="subtitle is-5">{{ bronzeTrophy.description }}</h1>
                              </div>
                            </div>
                            <div>
                              <div class="level-right">
                                <div class="level-item">
                                  <i class="fas fa-check" style="color:black"></i>
                                </div>
                              </div>
                            </div>
                          </nav>
                        </template>
                      </template>
                    </div>
                  </b-tab-item>
                  <b-tab-item label="Prata" icon-pack="fas" icon="trophy">
                    <div>
                      <template>
                        <template v-for="silverTrophy in silver">
                          <nav
                            class="level is-mobile successTrophy"
                            :key="silverTrophy.description"
                          >
                            <div class="level-left">
                              <div class="level-item">
                                <i class="fas fa-trophy" style="color:silver"></i>
                              </div>
                              <div class="level-item">
                                <h1 class="subtitle is-5">{{ silverTrophy.description }}</h1>
                              </div>
                            </div>
                            <div>
                              <div class="level-right">
                                <div class="level-item">
                                  <i class="fas fa-check" style="color:black"></i>
                                </div>
                              </div>
                            </div>
                          </nav>
                        </template>
                      </template>
                    </div>
                  </b-tab-item>
                  <b-tab-item label="Ouro" icon-pack="fas" icon="trophy">
                    <div>
                      <template>
                        <template v-for="goldTrophy in gold">
                          <nav
                            class="level is-mobile successTrophy"
                            :key="goldTrophy.description"
                          >
                            <div class="level-left">
                              <div class="level-item">
                                <i class="fas fa-trophy" style="color:gold"></i>
                              </div>
                              <div class="level-item">
                                <h1 class="subtitle is-5">{{ goldTrophy.description }}</h1>
                              </div>
                            </div>
                            <div>
                              <div class="level-right">
                                <div class="level-item">
                                  <i class="fas fa-check" style="color:black"></i>
                                </div>
                              </div>
                            </div>
                          </nav>
                        </template>
                      </template>
                    </div>
                  </b-tab-item>
                </b-tabs>
              </template>
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
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "profile-page",
  components: {
    Navbar,
    Footer
  },
  data: function() {
    return {
      selectedTab: "bronze"
    };
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
    error() {
      return this.$store.getters.error;
    },
    courses() {
      return this.$store.getters.courses;
    },
    bronze() {
      return this.$store.getters.bronze;
    },
    silver() {
      return this.$store.getters.silver;
    },
    gold() {
      return this.$store.getters.gold;
    }
  }
};
</script>
