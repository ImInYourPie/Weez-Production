<template>
  <div id="ranking">
    <Navbar/>
    <div class="container is-fluid">
      <br>
    
    </div>
    <br>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "ranking",
  components: {
    Navbar,
    Footer
  }
};
</script>
