export type Photos = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type Comments = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
