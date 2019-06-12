<template>
  <div id="profilePage">
    <Navbar/>
    <div class="container has-margin-top-20">
      <div class="column is-12 has-text-centered" v-if="error">
        <h1 class="is-size-3 is-primary">{{error}}</h1>
      </div>
      <template>
        <section v-if="!error">
          <b-tabs v-model="activeTab">
            <b-tab-item label="Perfil" icon-pack="fas" icon="user">
              <div class="columns has-margin-top-20">
                <div class="column is-3 is-hidden-mobile">
                  <div class="column has-text-centered is-flex is-horizontal-center">
                    <figure class="image profile-pic">
                      <img class :src="profileUser.profilePic" alt>
                    </figure>
                  </div>
                  <div class="column">
                    <span class="subtitle">
                      <strong>{{profileUser.username}}</strong>
                    </span>
                    <p>
                      Reputação:
                      <strong>{{profileUser.reputation}}</strong>
                      <progress class="progress is-danger" :value="profileUser.experience"></progress>
                    </p>
                  </div>
                </div>
                <dvi class="column is-9">
                  <div class="columns is-multiline">
                    <div class="column is-full">
                      <h1 class="title">Bio</h1>
                      <div class="box">
                        <p>{{profileUser.bio}}</p>
                      </div>
                    </div>
                  </div>
                </dvi>
                <div class="column is-hidden-tablet">
                  <article class="media">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img :src="profileUser.profilePic">
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <span class="subtitle">
                          <strong>{{profileUser.username}}</strong>
                        </span>
                        <p>
                          Reputação:
                          <strong>{{profileUser.reputation}}</strong>
                          <progress class="progress is-danger" :value="profileUser.experience"></progress>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </b-tab-item>

            <b-tab-item label="Atividade" icon-pack="fas" icon="chart-line"></b-tab-item>

            <b-tab-item
              v-if="user.username == this.$route.params.username"
              label="Editar Perfil"
              icon-pack="fas"
              icon="edit"
            ></b-tab-item>
          </b-tabs>
        </section>
      </template>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ProfileService from "../services/ProfileService";
import { mapState } from "vuex";

export default {
  name: "profile-page",
  components: {
    Navbar,
    Footer
  },
  data: function() {
    return {
      activeTab: 0,
      profileUser: false,
      questions: [],
      tags: [],
      error: false
    };
  },
  async mounted() {
    const username = this.$route.params.username;
    console.log(username);
    try {
      const response = await ProfileService.getUserForProfile(username);
      this.profileUser = response.data;
    } catch (error) {
      this.error = error.response.data.error;
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style lang="scss">
.is-horizontal-center {
  justify-content: center;
}

.profile-pic {
  // height: 256px;
  // width: 256px;
  height: 100%;
  width: 100%;
}
</style>
