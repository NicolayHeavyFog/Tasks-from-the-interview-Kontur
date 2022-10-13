<template>
  <div>
    <div class="post" v-if="post && postComments">
      <!-- {{ post }} -->
      <h1>Заголовок: {{ post.title }}</h1>
      <p>Текст поста: {{ post.body }}</p>
      <!-- {{ postComments }} -->
      <span>Комментарии:</span>
      <ul class="post__list">
        <li
          class="post__item"
          v-for="(comment, index) of postComments"
          :key="index"
        >
          <h2 class="post__item-title">Пользователь: {{ comment.email }}</h2>
          <p class="post__item-text">Пишет: {{ comment.name }}</p>
        </li>
      </ul>
    </div>
    <div class="spinner" v-else></div>
  </div>
</template>

<script>
import api from "@/api/index";
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const post = ref(null);
    const postComments = ref(null);
    const $route = useRoute();

    onMounted(() => {
      Promise.all([
        api.posts.post(+$route.params.id),
        api.posts.commentByPost(+$route.params.id),
      ]).then(([p, pC]) => {
        post.value = p.data;
        postComments.value = pC.data;
      });
    });

    return { post, postComments };
  },
});
</script>

<style lang="scss">
.post {
  &__list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15);
    border-radius: 10px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &-title {
      font-size: 18px;
      margin: 0 0 10px 0;
    }

    &-text {
      padding-left: 40px;
      margin: 0;
    }
  }
}
</style>
