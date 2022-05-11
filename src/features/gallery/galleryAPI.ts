export const getPhotos = () => {
  return fetch("https://jsonplaceholder.typicode.com/photos").then(
    async (res) => {
      const resolve = await res.json();
      return resolve;
    }
  );
};

export const getComments = (id: string) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/photos/${id}/comments?postId=1`
  ).then(async (res) => {
    const resolve = await res.json();
    return resolve;
  });
};
