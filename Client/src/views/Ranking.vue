<template>
  <div id="ranking">
    <Navbar/>
    <div class="container is-fluid">
      <br>
      <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link :to="{name: 'home'}">Home</router-link>
        </li>
        <li class="is-active">
          <router-link :to="{name: 'ranking'}">Ranking</router-link>
        </li>
      </ul>
    </nav>
      <Top/>
    </div>
    <br>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Top from "@/components/Top.vue";
export default {
  name: "ranking",
  components: {
    Navbar,
    Top,
    Footer
  }
};
</script>
