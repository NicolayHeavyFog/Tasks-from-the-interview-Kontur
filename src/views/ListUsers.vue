<template>
  <div style="width: 100%">
    <ul v-if="users" class="list">
      <li class="card" v-for="(user, index) in users" :key="index">
        <article class="card__user">
          <span><b>Имя:</b> {{ user.name }}</span>
          <span><b>login:</b> {{ user.username }}</span>
          <a class="card__user-link" :href="`mailto: ${user.email}`"
            ><b>Почта:</b> {{ user.email }}</a
          >
          <!-- <div class="card__user-address">
            <span><b>Адресс</b> <br /></span>
            <span><b>Улица</b> - {{ user.address.street }}</span>
            <span><b>Апартаменты</b> - {{ user.address.suite }}</span>
            <span><b>Город</b> - {{ user.address.city }}</span>
            <span><b>Почтовый код</b> - {{ user.address.zipcode }}</span>
            <span
              ><b>Геолокация</b> - {{ user.address.geo.lat }}/{{
                user.address.geo.lng
              }}</span
            >
          </div> -->
          <!-- <span><b>Телефон</b> - {{ user.phone }}</span>
          <span><b>Сайт</b> - {{ user.website }}</span> -->

          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <button>К пользователю {{ user.id }}</button>
          </router-link>
          <!-- <span class="card-user__user-id"></span> -->
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
    const users = ref(null);

    onMounted(async () => {
      users.value = (await api.posts.user()).data;
    });

    return { users };
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
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  &__user {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-address {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &-link {
      text-decoration: none;
      color: black;
    }
  }
}
</style>
