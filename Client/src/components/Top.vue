<template>
  <div id="top">
    <div class="tile is-ancestor">
      <!-- GRAND CHAMPION TILE == FIRST PLACE BY UPVOTES -->
      <div class="tile is-parent is-6">
        <div class="tile is-child has-text-centered box champTile">
          <p class="title">Grand Champion</p>
          <img class="champPicture" :src="sortTop[0].profilePicture" alt>
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle">{{ sortTop[0].username }}</p>
              </div>
            </div>
            <div class="level-right" v-for="course in courses" :key="course.id">
              <div class="level-item" v-if="course.id == sortTop[0].courseId">
                <p class="subtitle">{{ course.abrebiation }}</p>
              </div>
            </div>
          </nav>
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle">{{ sortTop[0].allUpvotes }}</p>
                <i class="fas fa-arrow-up"></i>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                &nbsp;{{ sortTop[0].trophies.bronze.length }}&nbsp;
                <i
                  class="fas fa-trophy"
                  style="color:brown"
                ></i>
                &nbsp;{{ sortTop[0].trophies.silver.length }}&nbsp;
                <i
                  class="fas fa-trophy"
                  style="color:silver"
                ></i>
                &nbsp;{{ sortTop[0].trophies.gold.length }}&nbsp;
                <i
                  class="fas fa-trophy"
                  style="color:gold"
                ></i>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="tile is-6 is-vertical is-parent">
        <!-- RUNNER UP TILE == SECOND PLACE BY UPVOTES -->
        <div class="tile is-child box runnersTile">
          <p class="title">Runner Up</p>
          <div class="columns is-mobile">
            <div class="column is-3">
              <img class="runnersPic" :src="sortTop[1].profilePicture" alt>
            </div>
            <div class="column is-9">
              <div class="columns">
                <div class="column is-8">
                  <p class="subtitle">{{ sortTop[1].username }}</p>
                </div>
                <div class="column is-4" v-for="course in courses" :key="course.id">
                  <div v-if="course.id == sortTop[1].courseId">
                    <p class="subtitle">{{ course.abrebiation }}</p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6">
                  <p class="subtitle">
                    {{ sortTop[1].allUpvotes }}
                    <i class="fas fa-arrow-up"></i>
                  </p>
                </div>
                <div class="column is-6">
                  &nbsp;{{ sortTop[1].trophies.bronze.length }}&nbsp;
                  <i
                    class="fas fa-trophy"
                    style="color:brown"
                  ></i>
                  &nbsp;{{ sortTop[1].trophies.silver.length }}&nbsp;
                  <i
                    class="fas fa-trophy"
                    style="color:silver"
                  ></i>
                  &nbsp;{{ sortTop[1].trophies.gold.length }}&nbsp;
                  <i
                    class="fas fa-trophy"
                    style="color:gold"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ON THE HUNT TILE == THIRD PLACE BY UPVOTES -->
        <div class="tile is-child box runnersTile">
          <p class="title">On the Hunt</p>
          <div class="columns is-mobile">
            <div class="column is-3">
              <img class="runnersPic" :src="sortTop[2].profilePicture" alt>
            </div>
            <div class="column is-9">
              <div class="columns">
                <div class="column is-8">
                  <p class="subtitle">{{ sortTop[2].username }}</p>
                </div>
                <div class="column is-4" v-for="course in courses" :key="course.id">
                  <div v-if="course.id == sortTop[2].courseId">
                    <p class="subtitle">{{ course.abrebiation }}</p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6">
                  <p class="subtitle">
                    {{ sortTop[2].allUpvotes }}
                    <i class="fas fa-arrow-up"></i>
                  </p>
                </div>
                <div class="column is-6">
                  &nbsp;{{ sortTop[2].trophies.bronze.length }}&nbsp;
                  <i
                    class="fas fa-trophy"
                    style="color:brown"
                  ></i>
                  &nbsp;{{ sortTop[2].trophies.silver.length }}&nbsp;
                  <i
                    class="fas fa-trophy"
                    style="color:silver"
                  ></i>
                  &nbsp;{{ sortTop[2].trophies.gold.length }}&nbsp;
                  <i
                    class="fas fa-trophy"
                    style="color:gold"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      sortedTop: []
    };
  },

  methods: {
    // SORT BY UPVOTES
    sorting(a, b) {
      if (a.allUpvotes < b.allUpvotes) return 1;
      if (a.allUpvotes > b.allUpvotes) return -1;
      else return 0;
    }
  },

  computed: {
    // SORT USERS BY NUMBER OF UPVOTES, TO RENDER PODIUM
    sortTop() {
      console.log("i ran");
      return this.$store.state.users.sort(this.sorting);
    },
    users() {
      return this.$store.getters.users;
    },
    courses() {
      return this.$store.getters.courses;
    }
  }
};
</script>