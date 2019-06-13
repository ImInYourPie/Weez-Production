<template>
  <div id="ranking">
    <Navbar/>
    <div class="container is-fluid">
      <br>
      <div class=" columns is-multiline">
        <div class="column is-half">
          <h1 class="title">Top Users</h1>
          <TopUsers/>
        </div>
        <div class="column is-half">
          
        </div>
      </div>
    </div>
    <br>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import TopUsers from "@/components/TopUsers.vue";
// import TopQuestions from "@/components/TopQuestions.vue";

export default {
  name: "ranking",
  components: {
    Navbar,
    Footer,
    TopUsers
    // TopQuestions
  }
};
</script>
