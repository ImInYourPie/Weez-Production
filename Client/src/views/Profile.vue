<template>
  <div id="profilePage">
    <Navbar/>
    <div class="container has-margin-top-20">
      <template>
        <section>
          <b-tabs v-model="activeTab">
            <b-tab-item label="Perfil" icon-pack="fas" icon="user">
              <div class="columns has-margin-top-20">
                <div class="column is-one-third is-hidden-mobile">
                  <div class="column has-text-centered is-flex is-horizontal-center">
                    <figure class="image is-square profile-pic">
                      <img class :src="user.profilePic" alt>
                    </figure>
                  </div>
                  <div class="column">
                    <p class="title">{{user.username}}</p>
                  </div>
                </div>
                <div class="column is-hidden-tablet">
                  <article class="media">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img :src="user.profilePic">
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <p class="subtitle"><strong>{{user.username}}</strong></p>
                        <progress class="progress is-danger" :value="user.experience"></progress>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </b-tab-item>

            <b-tab-item label="Atividade" icon-pack="fas" icon="chart-line"></b-tab-item>

            <b-tab-item label="Editar Perfil" icon-pack="fas" icon="edit"></b-tab-item>
          </b-tabs>
        </section>
      </template>
    </div>
    <Footer/>
  </div>
</template>

    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";

export default {
  name: "profile-page",
  components: {
    Navbar,
    Footer
  },
  data: function() {
    return {
      activeTab: 0
    };
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
  height: 100%;
  width: 100%;
}
</style>
