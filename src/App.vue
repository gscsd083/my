<template>
  <div id="app">
    <!-- <router-view /> -->
    <router-view v-if="!showMicroApp" />
    <WujieVue v-else width="100%" height="100%" name="bigscreen" :url="url" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      url: 'http://127.0.0.1:5173/big-screen'
    }
  },
  computed: {
    showMicroApp() {
      return this.$route.path === '/big-screen'
    }
  }
}
</script>
