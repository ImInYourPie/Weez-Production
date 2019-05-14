<template>
  <aside class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <li>
        <h1 href="">Tag</h1>
      </li>
      <li>
        <router-link tag="a" class="" :to="{name: 'tags'}">Tags</router-link>
      </li>
    </ul>
  </aside>
</template>


<script>
export default {
  data: function() {
    return {};
  },

  computed: {
    tags() {
      return this.$store.getters.tags;
    },
    courses() {
      return this.$store.getters.courses;
    },
    classes() {
      return this.$store.getters.classes;
    }
  }
};
</script>

