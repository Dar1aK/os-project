import React from "react";

import { useAppSelector, useAppDispatch } from "../../../../app/hooks";

import { sortTable, selectSort } from "../../filesSlice";
import { ListFilesType, SortNames } from "../../types";

import styles from "./TableFiles.module.css";

type TableFilesProps = {
  list: ListFilesType[];
  onClick: (name: string) => void;
};

const TableFiles = ({ list, onClick }: TableFilesProps) => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(selectSort);

  const prepareSize = (size: number) => {
    if (size < 1024 * 1024) {
      return Math.ceil(size / 1024) + "Kb";
    } else {
      return Math.ceil(size / (1024 * 1024)) + "Mb";
    }
  };

  const handleSort = (name: SortNames) => {
    let type = sort.type;
    if (sort.name === name) {
      type = sort.type === "asc" ? "desc" : "asc";
    }
    dispatch(sortTable({ name, type }));
  };

  return list?.length > 0 ? (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <span
              className={`${styles.head} ${
                sort.name === "name" && styles["head--active"]
              } ${sort.type === "desc" && styles["head--desc"]}`}
              onClick={() => handleSort("name")}
            >
              Name
            </span>
          </th>
          <th>
            <span
              className={`${styles.head} ${
                sort.name === "birthtime" && styles["head--active"]
              } ${sort.type === "desc" && styles["head--desc"]}`}
              onClick={() => handleSort("birthtime")}
            >
              Create date
            </span>
          </th>
          <th>
            <span
              className={`${styles.head} ${
                sort.name === "mtime" && styles["head--active"]
              } ${sort.type === "desc" && styles["head--desc"]}`}
              onClick={() => handleSort("mtime")}
            >
              Last modified date
            </span>
          </th>
          <th>
            <span
              className={`${styles.head} ${
                sort.name === "size" && styles["head--active"]
              } ${sort.type === "desc" && styles["head--desc"]}`}
              onClick={() => handleSort("size")}
            >
              Size
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map(({ name, birthtime, mtime, size }) => (
          <tr
            key={name}
            onClick={() => onClick(name)}
            className={styles.listLink}
          >
            <td>{name}</td>
            <td>{birthtime && new Date(birthtime).toLocaleString()}</td>
            <td>{mtime && new Date(mtime).toLocaleString()}</td>
            <td>{size > 0 ? prepareSize(size) : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
};

export default TableFiles;
