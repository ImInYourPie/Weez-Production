<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
    };
  },
  beforeMount() {
    if (localStorage.token) {
      this.$store.commit("fillCurrentUser", JSON.parse(localStorage.token))
      }
    }
  };
</script>


<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #ff303f;
$primary-invert: findColorInvert($primary);
$secondary: #cc2632;
$secondary-invert: findColorInvert($secondary);
$danger: #7f181f;
$danger-invert: findColorInvert($danger);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "secondary": (
    $secondary,
    $secondary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Font
$family-sans-serif: Helvetica, Arial, Sans-Serif;
$family-primary: $family-sans-serif;

// FOOTER
// $footer-background-color: $black;

// CSS

html,
body {
  overflow-x: hidden;
}

// .navbar{
//   -webkit-box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.05);
//   -moz-box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.05);
//   box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.05);
// };

#mainHeader {
  background-image: url("../src/assets/background.svg");
  color: $white;
}

.infoPara {
  color: $black;
}

.headerTitle {
  color: $white !important;
}

#informationDiv {
  color: $primary;
}

.eachQuestion:hover .questionTitle {
  color: $primary;
}

#tokenPic {
  height: 30px;
  width: 30px;
  border-radius: 50%;
};

#pictureDiv{
  background-color: whitesmoke;
};
#profilePicture{
  height: 368px;
  width: 368px;
  border-radius: 20%;
};

.menu {
  height: 100%;
}

#menuCol{
  border-right: 1px solid $primary;
  background-color: whitesmoke;
}

.successTrophy{
  background-color: whitesmoke;
  border-radius: 10px;
};
#previewQeestion{
  background-color: whitesmoke;
}

.nonSuccessTrophy{
  background-color: whitesmoke;
  border-radius: 10px;
};

.champPicture{
  border-radius: 20%;
  height: 368px;
  width: 368px;
};
.champTile{
  background-color: whitesmoke !important;
};
.runnersTile{
  background-color: whitesmoke !important;
};

.runnersPic{
  height: 128px;
  width: 128px;
  border-radius: 20%;
};

#questionContainer{
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 10px;
};

#mediaUser{
  background-color: $white;
  padding: 10px;
  border-radius: 10px;
};

.container{
  padding: 10px;
}



// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>


