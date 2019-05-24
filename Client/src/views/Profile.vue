<template>
  <div id="profilePage">
    <Navbar/>
    
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "profile-page",
  components: {
    Navbar,
    Footer
  },
  data: function() {
    return {
      
    };
  },
  computed: {

  }
};
</script>
