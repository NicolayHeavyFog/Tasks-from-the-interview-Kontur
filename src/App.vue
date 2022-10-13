<template>
  <body class="page">
    <header class="header">
      <div class="container">
        <router-link :to="{ name: 'posts' }"
          ><button class="header__link">К постам</button></router-link
        >
        <router-link :to="{ name: 'users' }"
          ><button class="header__link">К пользователям</button></router-link
        >
      </div>
    </header>
    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>

    <footer class="footer">
      <div class="container">Footer</div>
    </footer>
  </body>
</template>

<script>
import api from "@/api/index";
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  // name: "App",
  components: {},
  setup() {
    // const api = api;
    const posts = ref(null);

    onMounted(async () => {
      posts.value = await api.posts.post();
    });

    return { posts };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.page {
  background: #fefefe;
  text-align: center;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 1200px;
  padding: 0 15px;
}

.footer,
.header {
  display: flex;
  justify-content: center;
  color: white;
  width: 100%;
  height: 75px;
  background-color: #07237e;
}

.main {
  min-height: calc(100vh - 150px);
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

.header {
  &__link {
    color: black;
    text-decoration: none;
  }
}
</style>
