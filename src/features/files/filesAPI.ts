export const getDirList = (directory: string) => {
  return fetch("/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ directory }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.message;
    });
};

export const openFile = (file: string) => {
  return fetch("/open", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file }),
  }).then((res) => {
    return res.json();
  });
};

export const saveFile = (body: { file: string; content: string }) => {
  return fetch("/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.message;
    })
    .catch(console.log);
};
