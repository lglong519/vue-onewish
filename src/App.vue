<template>
  <div id="onewish">
    <audio :src="url" id='audio' preload="auto"></audio>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <the-footer @changePath='changePath' :path='path'></the-footer>
  </div>
</template>

<script>
import Funs from "./utils/funs";
export default {
  name: "App",
  computed: {
    path() {
      return this.$store.getters.path;
    },
    url() {
      return this.$store.getters.url;
    }
  },
  methods: {
    changePath(path) {
      this.$store.commit("SET_PATH", path);
    }
  },
  beforeCreate() {
    console.log("  app", "beforeCreates");
  },
  created() {
    console.log("  app", "created");
  },
  beforeMount() {
    console.log("  app", "beforeMount");
  },
  mounted() {
    console.log("  app", "mounted");
    this.$store.commit("SET_AUDIO", document.getElementById("audio"));
    Funs.setAudioEvent(this);
  },
  beforeUpdate() {
    console.log("  app", "beforeUpdate");
  },
  updated() {
    console.log("  app", "updated");
    this.changePath(this.$router.history.current.path.replace("/", ""));
  },
  beforeDestroy() {
    console.log("app", "beforeDestroy");
  }
};
</script>

<style>
html,
body,
#onewish {
  height: 100%;
}
#onewish {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
}
</style>
