<template>
  <div id="onewish">
    <router-view/>
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
