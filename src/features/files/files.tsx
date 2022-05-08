import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Button from "../../components/Button";
import Input from "../../components/Input";
import TableFiles from "./components/TableFiles";
import Textarea from "../../components/Textarea";
import Wrapper from "../../components/Wrapper";
import WithClose from "../../hocs/Close";
import { ListFilesType } from "./types";
import {
  getDirAsync,
  selectFiles,
  saveFileAsync,
  changeDirectory,
  clearDirectory,
  openFileAsync,
} from "./filesSlice";

import styles from "./files.module.css";

const Add = () => {
  const dispatch = useAppDispatch();
  const { list: files, currentDir } = useAppSelector(selectFiles);
  const [text, setText] = useState("");
  const [openChangeFile, setOpenFile] = useState("");
  const [openCreateFile, setCreateFile] = useState(false);
  const [createFileName, setFileName] = useState("");

  useEffect(() => {
    dispatch(getDirAsync(currentDir));
  }, [currentDir, openCreateFile]);

  const checkSlash = (value: string) => {
    if (value[value.length - 1] !== "/") {
      return `${value}/`;
    }
    return value;
  };

  const handleEdit = (name: string) => {
    const path = `${checkSlash(currentDir)}${name}`;
    dispatch(openFileAsync(path)).then(({ payload }) => {
      if (payload.type === "directory") {
        dispatch(changeDirectory(path));
      } else {
        setText(payload.message);
        setOpenFile(path);
        console.log(payload.message);
      }
      console.log("edit", payload);
    });
  };

  const handleSave = (file: string) => {
    const body = { file, content: text };
    console.log("changes", body);
    dispatch(saveFileAsync(body))
      .then(() => {
        setText("");
        setOpenFile("");
        setCreateFile(false);
      })
      .catch(console.log);
  };

  const handleAdd = (file: string) => {
    const path = `${checkSlash(currentDir)}${file}`;
    const body = { file: path, content: text };
    dispatch(saveFileAsync(body))
      .then(() => {
        setText("");
        setFileName("");
        setOpenFile("");
        setCreateFile(false);
      })
      .catch(console.log);
  };

  const handleBack = () => {
    const arr = currentDir.split("/");
    arr.pop();
    dispatch(changeDirectory((arr.length > 0 && arr.join("/")) || "/"));
  };

  return (
    <Wrapper>
      <Input
        type="text"
        name="dir"
        value={currentDir}
        onChange={(e) => dispatch(changeDirectory(e.target.value))}
      />
      <div>
        <a onClick={handleBack}>Back</a>
      </div>
      <div>
        <Button
          type="submit"
          onClick={() => {
            setOpenFile("");
            setText("");
            setCreateFile(true);
          }}
          value="Create new .txt file"
        />
      </div>

      <TableFiles list={files} onClick={handleEdit} />

      {openChangeFile && (
        <>
          <Textarea
            name="change"
            id=""
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
          />
          <Button
            type="submit"
            onClick={() => handleSave(openChangeFile)}
            value="Save changes"
          />

          <Button
            type="submit"
            onClick={() => {
              setText("");
              setOpenFile("");
            }}
            value="Close without saving"
          />
        </>
      )}

      {openCreateFile && (
        <>
          <Input
            type="text"
            placeholder="New file's name"
            value={createFileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Textarea
            name=""
            id=""
            placeholder="Content"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="submit"
            onClick={() => handleAdd(createFileName)}
            value="Create file"
          />

          <Button
            type="submit"
            onClick={() => {
              setFileName("");
              setText("");
              setCreateFile(false);
            }}
            value="Close without saving"
          />
        </>
      )}
    </Wrapper>
  );
};

export default WithClose(Add);
