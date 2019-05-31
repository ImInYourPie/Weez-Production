<template>
  <div>
    <div class="column is-12 has-text-centered">
      <router-link :to="{name: 'home'}">
        <img src="../assets/Brand.png" id alt="weez">
      </router-link>
    </div>
    <hr>
    <form @submit.prevent="login">
      <div class="column is-4 is-offset-4">
        <b-field
          label="Username"
          :type="{ 'is-danger': hasUsernameError }"
          :message="this.hasUsernameError"
        >
          <b-input v-model="username" size="is-medium" type="text" placeholder="Username"></b-input>
        </b-field>
      </div>
      <div class="column is-4 is-offset-4">
        <b-field
          label="Password"
          :type="{ 'is-danger': hasPasswordError }"
          :message="this.hasPasswordError"
        >
          <b-input v-model="password" size="is-medium" type="password" placeholder="Password"></b-input>
        </b-field>
      </div>
      <div class="column is-4 is-offset-4">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <a>Não te lembras da password?</a>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item" style="width:100%">
              <button @click.prevent="login" class="button is-primary" style="width:100%">Login</button>
            </div>
          </div>
        </nav>
      </div>
    </form>
    <div class="column is-4 is-offset-4">
      <hr>
    </div>
    <div class="column is-4 is-offset-4 has-text-centered">
      <h1 class="subtitle has-text-weight-bold is-size-6">Não tens conta? Regista-te já!</h1>
    </div>
    <div class="column is-4 is-offset-4">
      <router-link :to="{name: 'home' }">
        <button class="button is-secondary" style="width:100%">Registar-se no Weez</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "login",
  data: () => {
    return {
      username: "",
      password: "",
      hasUsernameError: "",
      hasPasswordError: "",
      error: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        });
        console.log;
        console.log(response.data.token);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setLoggedUser", response.data.user);
        this.$router.push({ name: "home" });
      } catch (error) {
        this.hasUsernameError =
          !!error.response.data.hasUsernameError == true
            ? error.response.data.hasUsernameError
            : "";
        this.hasPasswordError =
          !!error.response.data.hasPasswordError == true
            ? error.response.data.hasPasswordError
            : "";
        this.error =
          !!error.response.data.error == true ? error.response.data.error : "";
      }
    }
  }
};
</script>



