<template>
  <aside class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <li>
        <b-field label="Tags">
            <b-input placeholder="Procurar por tag" rounded></b-input>
        </b-field>
      </li>
      <br>
      <li v-for="tag in tags" :key="tag">
        <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark">{{tag}}</b-tag>
                    <b-tag type="is-success">12</b-tag>
                </b-taglist>
            </div>
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
