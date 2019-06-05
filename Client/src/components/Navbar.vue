<template>
  <nav class="navbar is-fixed-top has-shadow">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{name: 'home'}">
        <img src="../assets/Brand.svg" alt>
      </router-link>
      <!-- <a class="navbar-item" href="https://github.com/ImInYourPie/Weez" target="_blank">
        <b-icon pack="fab" icon="github"></b-icon>
      </a>-->
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
        <span class="navbar-item his-hidden-mobile">
          <div class="control has-icons-right">
            <input class="input" style="min-width:400px" type="text" placeholder="Pesquisar...">
            <span class="icon is-small is-right">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </span>
        <router-link class="navbar-item" :to="{name: 'ranking'}">Ranking</router-link>
        <router-link class="navbar-item" :to="{name: 'forum'}">Fórum</router-link>
        <router-link class="navbar-item" v-if="!token" :to="{name: 'login'}">Login</router-link>
        <router-link class="navbar-item" v-if="token" :to="{ name: 'profile', params: {username: user.username} }">
          <img v-bind:src="user.profilePic" v-if="token" id="tokenPic" alt>&nbsp;<span>{{user.username}}</span>
        </router-link>
        <a @click="logout()" v-if="token" class="navbar-item">Logout</a>
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
      hasError: ""
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
    // login() {
    //   axios.post("https://weez-api-iminyourcode.c9users.io/login", {
    //     username: this.username,
    //     password: this.password
    //   }).then((data) => {
    //     this.$store.dispatch("loginUser", data.data);
    //   }).catch((err) => {
    //     if(err) this.hasError = true;
    //   })
    // },
    // DOES LOGOUT ON CLICK
    // logout() {
    //   localStorage.setItem("token", "");
    //   this.$store.state.token = null;
    //   this.$router.push("/");
    // }
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setLoggedUser", null);
    }
  },
  computed: {
    ...mapState(["token", "user"])
  }
};
</script>


