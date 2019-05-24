<template>
  <nav class="navbar is-fixed-top has-shadow">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{name: 'home'}">
        <img src="../assets/Brand.svg" alt>
      </router-link>
      <a class="navbar-item" href="https://github.com/ImInYourPie/Weez" target="_blank">
        <b-icon pack="fab" icon="github"></b-icon>
      </a>
      <!-- BURGER -->
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarContent"
        @click="isOpen = !isOpen"
        v-bind:class="{'is-active': isOpen}"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarContent" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
      <div class="navbar-end">
        <router-link class="navbar-item" :to="{name: 'ranking'}">Ranking</router-link>
        <router-link class="navbar-item" :to="{name: 'forum'}">Fórum</router-link>
        <!--<router-link class="navbar-item" v-if="token !== null" :to="{ name: 'profile' }">-->
        <!--  <img v-bind:src="token.profilePicture" id="tokenPic" alt>-->
        <!--  &nbsp;{{ token.trophies.bronze.length }}&nbsp;-->
        <!--  <i-->
        <!--    class="fas fa-trophy"-->
        <!--    style="color:brown"-->
        <!--  ></i>-->
        <!--  &nbsp;{{ token.trophies.silver.length }}&nbsp;-->
        <!--  <i-->
        <!--    class="fas fa-trophy"-->
        <!--    style="color:silver"-->
        <!--  ></i>-->
        <!--  &nbsp;{{ token.trophies.gold.length }}&nbsp;-->
        <!--  <i-->
        <!--    class="fas fa-trophy"-->
        <!--    style="color:gold"-->
        <!--  ></i>-->
        <!--</router-link>-->
        <b-dropdown class="navbar-slot" v-if="token === null" position="is-bottom-left">
          <a class="navbar-item" slot="trigger">
            <a class="navbar-item">
              Login
              <i class="fas fa-caret-down"></i>
            </a>
          </a>

          <b-dropdown-item custom paddingless>
            <form v-on:submit.prevent="login" action>
              <div class="modal-card" style="width:300px;">
                <section class="modal-card-body">
                  <b-field label="Username" :type="{ 'is-danger': hasError }">
                    <b-input
                      v-model="username"
                      type="text"
                      icon-pack="fas"
                      icon="user"
                      placeholder
                      required
                    ></b-input>
                  </b-field>

                  <b-field
                    label="Password"
                    :type="{ 'is-danger': hasError }"
                    :message="{ 'Credenciais incorretas!': hasError }"
                  >
                    <b-input
                      v-model="password"
                      type="password"
                      icon-pack="fas"
                      icon="key"
                      placeholder
                      required
                    ></b-input>
                  </b-field>

                  <!-- <b-checkbox id="rememberCheck">Lembrar-me</b-checkbox> -->
                </section>
                <footer class="modal-card-foot">
                  <button @click="login()" class="button">Login</button>
                </footer>
              </div>
            </form>
          </b-dropdown-item>
        </b-dropdown>
        <a v-if="token !== null" @click="logout()" class="navbar-item">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      isOpen: false,
      username: "",
      password: "",
      hasError: false
    };
  },
  methods: {
    // LOGIN ON VALIDE INPUTS
    // login() {
    //   let user = {
    //     email: this.form.email,
    //     password: this.form.password
    //   };

    //   let loginVerified = this.$store.getters.login(user);
    //   if (loginVerified) {
    //     this.$router.go("/");
    //   } else {
    //     this.hasError = true;
    //   }
    // },
    login() {
      axios.post("https://weez-api-iminyourcode.c9users.io/login", {
        username: this.username,
        password: this.password
      }).then((data) => {
        this.$store.dispatch("loginUser", data.data);
      }).catch((err) => {
        if(err) this.hasError = true;
      })
    },
    // DOES LOGOUT ON CLICK
    // logout() {
    //   localStorage.setItem("token", "");
    //   this.$store.state.token = null;
    //   this.$router.push("/");
    // }
  },
  computed: {
    url() {
      return this.$store.getters.url;
    },
    
    token() {
      return this.$store.getters.token;
    },
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>


