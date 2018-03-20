<template>
  <div id="onewish">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <the-footer @changePath='changePath' :path='path'></the-footer>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    path() {
      return this.$store.getters.path;
    }
  },
  methods: {
    changePath(path) {
      this.$store.commit("changePath", path);
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
#onewish {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 768px;
  margin: 0 auto;
}
</style>
