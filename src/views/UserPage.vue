<template>
  <div style="width: 100%">
    <div class="profile" v-if="user">
      <span><b>Имя:</b> {{ user.name }}</span>
      <span><b>login:</b> {{ user.username }}</span>
      <a class="profile-link" :href="`mailto: ${user.email}`"
        ><b>Почта:</b> {{ user.email }}</a
      >
      <div class="profile__address">
        <span><b>Адрес:</b></span>
        <span><b>Улица</b> - {{ user.address.street }}</span>
        <span><b>Апартаменты</b> - {{ user.address.suite }}</span>
        <span><b>Город</b> - {{ user.address.city }}</span>
        <span><b>Почтовый код</b> - {{ user.address.zipcode }}</span>
        <span
          ><b>Геолокация</b> - {{ user.address.geo.lat }}/{{
            user.address.geo.lng
          }}</span
        >
      </div>
      <div class="profile__company">
        <b>Компания:</b>
        <span> <b>Название компании</b> - {{ user.company.name }}</span>
        <span> <b>Ключевая фраза</b> - {{ user.company.catchPhrase }}</span>
        <span> <b>bs</b> - {{ user.company.bs }}</span>
        <span> <b>Телефон</b> - {{ user.phone }}</span>
        <span> <b>Сайт</b> - {{ user.website }}</span>
      </div>
      <!-- {{ user }} -->

      Посты пользователя:
      <ul>
        <li v-for="(post, index) of postsUser" :key="index">
          <router-link :to="{ name: 'post', params: { id: post.id } }"
            >Пост {{ post.id }}</router-link
          >
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
    const user = ref(null);
    const postsUser = ref(null);
    const $route = useRoute();

    onMounted(() => {
      Promise.all([
        api.posts.user(+$route.params.id),
        api.posts.postsByUser(+$route.params.id),
      ]).then(([u, pU]) => {
        user.value = u.data;
        postsUser.value = pU.data;
      });
    });

    return { user, postsUser };
  },
});
</script>

<style lang="scss">
.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__address {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  &__company {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
