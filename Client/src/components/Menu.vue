<template>
  <aside class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <li><router-link tag="a" :to='{name: "forum" }'>Perguntas</router-link></li>
      <li><router-link tag="a" :to='{name: "forum-tags" }'>Tags</router-link></li>
      <li><router-link tag="a" :to='{name: "forum-users" }'>Utilizadores</router-link></li>
    </ul>
  </aside>
</template>


<script>
import api from "../services/api";

export default {
  data: function() {
    return {
      // tags: null
    };
  },
  // async mounted() {
  //   this.tags = (await api().get("forum/tags")).data;
  // },
};
</script>

<style scoped>
/*.menu {*/
/*  height: 600px;*/
/*}*/
</style>
