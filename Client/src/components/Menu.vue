<template>
  <aside class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <li>
        <b-field label="Tags">
            <b-input placeholder="Procurar por tag"></b-input>
        </b-field>
      </li>
      <br>
      <li v-for="tag in tags" :key="tag._id">
        <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark">{{tag.name}}</b-tag>
                </b-taglist>
            </div>
      </li>
    </ul>
  </aside>
</template>


<script>
import api from "../services/api";

  export default {
    data: function() {
      return {
        tags: null
      };
    },
    async mounted() {
      this.tags = (await api().get("forum/tags")).data
    },

    computed: {
    }
  };
</script>
