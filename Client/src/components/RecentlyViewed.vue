<template>
  <div class="recently-viewed">
      <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon pack="fas" icon="history"></b-icon>&nbsp;Histórico
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p class="is-danger" v-if="!this.$store.state.token">Apenas para utilizadores registados</p>
          <div class="columns is-multiline" v-if="this.$store.state.token">
            <div class="column is-one"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  
};
</script>

<style lang="scss" scoped>
</style>