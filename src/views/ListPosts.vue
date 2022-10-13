<template>
  <div>
    <!-- "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" -->
    <ul v-if="posts" class="list">
      <li class="card" v-for="(post, index) in posts" :key="index">
        <article class="card__post">
          <h2 class="card__post-title">{{ post.title }}</h2>
          <p class="card__post-text">{{ post.body }}</p>

          <div class="card__link-group">
            <router-link :to="{ name: 'user', params: { id: post.userId } }">
              <button>К пользователю {{ post.userId }}</button>
            </router-link>

            <router-link :to="{ name: 'post', params: { id: post.id } }"
              ><button>К комментариям</button></router-link
            >
          </div>
        </article>
      </li>
    </ul>
    <div class="spinner" v-else></div>
  </div>
</template>

<script>
import api from "@/api/index";
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  setup() {
    const posts = ref(null);

    onMounted(async () => {
      posts.value = (await api.posts.post()).data;
    });

    return { posts };
  },
});
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  margin: 0;
  padding: 0;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  list-style-type: none;
}

.card {
  background-color: #ffffff;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  &__post {
    display: flex;
    flex-direction: column;
    padding: 15px;
    height: 100%;

    &-title {
      font-size: 18px;
      margin: 0;
    }

    &-text {
      margin: 0 0 10px 0;
    }
  }

  &__link-group {
    display: inline-flex;
    align-self: flex-end;
    justify-content: space-around;
    width: 100%;
    margin-top: auto;
  }
}
</style>
