export default function (instance) {
  return {
    post(id) {
      return instance.get(`posts/${id || ""}`);
    },
    commentByPost(id) {
      return instance.get(`posts/${id}/comments`);
    },
    user(id) {
      return instance.get(`users/${id || ""}`);
    },
    postsByUser(id) {
      return instance.get(`posts?userId=${id}`);
    },
  };
}
