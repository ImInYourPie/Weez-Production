<template>
  <div class="home">
    <Navbar/>
    <div id="mainHeader" v-if="token === null" class="columns is-vcentered">
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
        <br>
        <form @submit.prevent="onCreateUser()">
          <div class="column is-10">
            <b-field
              :type="{ 'is-danger': hasUsernameError }"
              :message="{ 'Este nome de utilizador não está disponivel!': hasUsernameError }"
            >
              <b-input
                v-model="registerForm.username"
                type="text"
                icon-pack="fas"
                icon="user-circle"
                placeholder="Username"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column is-10">
            <b-field
              :type="{ 'is-danger': hasEmailError }"
              :message="{ 'Este email já se encontra registado!': hasEmailError }"
            >
              <b-input
                v-model="registerForm.email"
                type="email"
                icon-pack="fas"
                icon="at"
                placeholder="Email"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column is-10">
            <b-field>
              <b-input
                v-model="registerForm.profilePicture"
                type="url"
                icon-pack="fas"
                icon="camera"
                placeholder="Link de foto"
                required
              ></b-input>
            </b-field>
          </div>

          <div class="column is-10">
            <b-field :type="{ 'is-danger': hasPasswordError }">
              <b-input
                v-model="registerForm.password"
                type="password"
                icon-pack="fas"
                icon="key"
                placeholder="Password"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column is-10">
            <b-field
              :type="{ 'is-danger': hasPasswordError }"
              :message="{ 'As passwords não coincidem!': hasPasswordError }"
            >
              <b-input
                v-model="registerForm.confirmPassword"
                type="password"
                icon-pack="fas"
                icon="key"
                placeholder="Confirmar Password"
                required
              ></b-input>
            </b-field>
          </div>

          <div class="column is-4 is-offset-6">
            <button class="button is-primary" type="submit" style="width: 100%">Registar</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="token === null" id="informationDiv">
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
      <br>
      <p class="title is-2">The Podium</p>
      <Top/>
      <br>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Top from "@/components/Top.vue";

export default {
  name: "home",
  components: {
    Navbar,
    Top,
    Footer
  },
  data: function() {
    return {
      users: this.$store.state.users,
      registerForm: {
        username: "",
        userType: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: "",
        institutionId: null
      },
      hasEmailError: false,
      hasPasswordError: false,
      hasUsernameError: false,
      currentUser: {
        id: null,
        username: "",
        fullname: "",
        profilePic: ""
      }
    };
  },
  beforeMount() {
    this.getUser();
  },
  methods: {
    login() {
      let user = {
        email: this.form.email,
        password: this.form.password
      };

      let loginVerified = this.$store.getters.login(user);
      if (loginVerified) {
        this.$router.push("/");
      } else {
        this.hasError = true;
      }
    },

    getUser() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == this.token) {
          this.currentUser.id = this.users[i].id;
          this.currentUser.username = this.users[i].username;
          this.currentUser.fullname = this.users[i].fullname;
          this.currentUser.profilePic = this.users[i].profilePic;
        }
      }
      return this.currentUser;
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

    onCreateUser() {
      if (!this.validateRegister()) {
        let newUserData = {
          id: this.generateUniqueId,
          username: this.registerForm.username,
          email: this.registerForm.email,
          password: this.registerForm.password,
          profilePicture: this.registerForm.profilePicture,
          registerDate: this.$store.getters.getTodaysDate
        };
        this.$store.dispatch("createUser", newUserData);
        let tempLogin = this.registerForm.email
        this.$store.dispatch("loginOnCreate", tempLogin)
        this.$router.push("profile")
      }
    },

    validateRegister() {
      let nonValide = false;
      for (let i = 0; i < this.users.length; i++) {
        if (this.registerForm.email == this.users[i].email) {
          this.hasEmailError = true;
          nonValide = true;
        } else if (this.registerForm.username == this.users[i].username) {
          this.hasUsernameError = true;
          nonValide = true;
        }
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.hasPasswordError = true;
        nonValide = true;
      }
      return nonValide;
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },

    error() {
      return this.$store.getters.error;
    }
  }
};
</script>
