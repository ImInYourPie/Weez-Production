<template>
  <div class="home">
    <Navbar/>
    <div id="mainHeader" v-if="!token" class="columns is-vcentered">
      <div class="column is-5 is-offset-1 is-hidden-mobile">
        <h1 class="headerTitle title is-3">It's a piece of cake!</h1>
        <h2 class="headerTitle title is-4">Pergunta, responde, e ganha.</h2>
        <h3
          class="headerTitle title is-5"
        >A tua plataforma de questões escolares chegou. Regista-te já!</h3>
      </div>
      <br>
      <div class="column is-5 is-offset-1 is-hidden-tablet has-text-centered">
        <h1 class="headerTitle title is-2">It's a piece of cake!</h1>
      </div>
      <div class="column is-6">
        <br class="is-hidden-mobile">
        <form @submit.prevent="register">
          <div class="column is-10">
            <b-field :type="{ 'is-danger': hasUsernameError }" :message="this.hasUsernameError ">
              <b-input
                v-model="username"
                type="text"
                icon-pack="fas"
                icon="user-circle"
                placeholder="Username"
                name="username"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column is-10">
            <b-field :type="{ 'is-danger': hasEmailError }" :message="this.hasEmailError">
              <b-input
                v-model="email"
                type="email"
                name="email"
                icon-pack="fas"
                icon="at"
                placeholder="Email"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column is-10">
            <b-field
              :type="{ 'is-danger': hasPasswordError, 'is-danger': hasPassConfirmError}"
              :message="this.hasPasswordError"
            >
              <b-input
                v-model="password"
                type="password"
                name="password"
                icon-pack="fas"
                icon="key"
                placeholder="Password"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column is-10">
            <b-field
              :type="{ 'is-danger': hasPassConfirmError }"
              :message="this.hasPassConfirmError"
            >
              <b-input
                v-model="passwordConfirm"
                type="password"
                name="confirmPassword"
                icon-pack="fas"
                icon="key"
                placeholder="Confirmar Password"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column is-4 is-offset-6">
            <button class="button is-primary" @click="register" style="width: 100%">Registar</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="!token" id="informationDiv">
      <div class="container">
        <br>
        <br>
        <div class="columns">
          <div class="column is-3">
            <div class="column has-text-centered">
              <i class="fas fa-question-circle fa-6x"></i>
            </div>
            <div class="column has-text-centered">
              <p
                class="has-text-centered infoPara"
              >Faz perguntas sobre o teu curso, disciplina, e entregas de trabalhos!</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="column has-text-centered">
              <i class="fas fa-graduation-cap fa-6x"></i>
            </div>
            <div class="column has-text-centered">
              <p
                class="has-text-centered infoPara"
              >Para que consigas ter excelentes notas e acabar o teu curso com distinção!</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="column has-text-centered">
              <i class="fas fa-trophy fa-6x"></i>
            </div>
            <div class="column has-text-centered">
              <p
                class="has-text-centered infoPara"
              >Ganha troféus, sobe de nivel, e mostra a tua sabedoria aos teus colegas!</p>
            </div>
          </div>
          <div class="column is-3">
            <div class="column has-text-centered">
              <i class="fas fa-mobile-alt fa-6x"></i>
            </div>
            <div class="column has-text-centered">
              <p
                class="has-text-centered infoPara"
              >Completamente compatível com dispositivos móveis!</p>
            </div>
          </div>
        </div>
      </div>
      <br>
      <br>
    </div>
    <div class="container">
      <!-- <br>
      <p class="title is-2">The Podium</p>
      <Top/>
      <br>-->
      <div>
        <h1 v-for="user in users" :key="user._id">{{ user.username }}</h1>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
// import Top from "@/components/Top.vue";
// import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Navbar,
    // Top,
    Footer
  },
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      hasEmailError: "",
      hasPasswordError: "",
      hasPassConfirmError: "",
      hasUsernameError: ""
    };
  },
  mounted() {
    this.$store.dispatch("getUsers");
  },

  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        });
        console.log(response.data);
      } catch (error) {
        this.hasUsernameError =
          !!error.response.data.hasUsernameError == true
            ? error.response.data.hasUsernameError
            : "";
        this.hasEmailError =
          !!error.response.data.hasEmailError == true
            ? error.response.data.hasEmailError
            : "";
        this.hasPasswordError =
          !!error.response.data.hasPasswordError == true
            ? error.response.data.hasPasswordError
            : "";
        this.hasPassConfirmError =
          !!error.response.data.hasPassConfirmError == true
            ? error.response.data.hasPassConfirmError
            : "";
      }
    }

    // login() {
    //   let user = {
    //     email: this.form.email,
    //     password: this.form.password
    //   };

    //   let loginVerified = this.$store.getters.login(user);
    //   if (loginVerified) {
    //     this.$router.push("/");
    //   } else {
    //     this.hasError = true;
    //   }
    // },

    // getUser() {
    //   for (let i = 0; i < this.users.length; i++) {
    //     if (this.users[i].id == this.token) {
    //       this.currentUser.id = this.users[i].id;
    //       this.currentUser.username = this.users[i].username;
    //       this.currentUser.fullname = this.users[i].fullname;
    //       this.currentUser.profilePic = this.users[i].profilePic;
    //     }
    //   }
    //   return this.currentUser;
    // },

    // validateRegister() {
    //   let nonValide = false;
    //   for (let i = 0; i < this.users.length; i++) {
    //     if (this.registerForm.email == this.users[i].email) {
    //       this.hasEmailError = true;
    //       nonValide = true;
    //     } else if (this.registerForm.username == this.users[i].username) {
    //       this.hasUsernameError = true;
    //       nonValide = true;
    //     }
    //   }
    //   if (this.registerForm.password !== this.registerForm.confirmPassword) {
    //     this.hasPasswordError = true;
    //     nonValide = true;
    //   }
    //   return nonValide;
    // }
  },

  computed: {
    ...mapState(["users", "token"]),
  }
};
</script>
