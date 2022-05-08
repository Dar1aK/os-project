export type ListFilesType = {
  name: string;
  birthtime: string;
  mtime: string;
  size: number;
};

export type SortNames = "name" | "birthtime" | "mtime" | "size";

export type SortTypes = "asc" | "desc";
