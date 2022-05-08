import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Wrapper from "../../components/Wrapper";
import WithClose from "../../hocs/Close";

import styles from "./files.module.css";

const Add = () => {
  const [dir, setDir] = useState("./");
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [openChangeFile, setOpenFile] = useState("");
  const [openCreateFile, setCreateFile] = useState(false);
  const [createFileName, setFileName] = useState("");

  useEffect(() => {
    fetch("/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ directory: dir }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data.message);
        console.log(data.message);
      });
  }, [dir, openCreateFile]);

  const handleClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    name: string
  ) => {
    switch (e.detail) {
      case 1:
        console.log("click");
        handleEdit(name);
        break;
      case 2:
        console.log("double click");

        break;
      case 3:
        console.log("triple click");
        break;
      default:
        return;
    }
  };

  const checkSlash = (value: string) => {
    if (value[value.length - 1] !== "/") {
      return `${value}/`;
    }
    return value;
  };

  const handleEdit = (name: string) => {
    const path = `${checkSlash(dir)}${name}`;
    fetch("/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: path }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.type === "directory") {
          setDir(path);
        } else {
          setText(data.message);
          setOpenFile(path);
          console.log(data.message);
        }
      });
  };

  const handleSave = (file: string) => {
    fetch("/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file, content: text }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        setText("");
        setOpenFile("");
        setCreateFile(false);
      })
      .catch(console.log);
  };

  const handleAdd = (file: string) => {
    const path = `${checkSlash(dir)}${file}`;
    fetch("/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: path, content: text }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        setText("");
        setFileName("");
        setOpenFile("");
        setCreateFile(false);
      })
      .catch(console.log);
  };

  const handleBack = () => {
    const arr = dir.split("/");
    arr.pop();
    setDir((arr.length > 0 && arr.join("/")) || "/");
  };

  const prepareSize = (size: number) => {
    if (size < 1024 * 1024) {
      return Math.ceil(size / 1024) + "Kb";
    } else {
      return Math.ceil(size / (1024 * 1024)) + "Mb";
    }
  };

  return (
    <Wrapper>
      <Input
        type="text"
        name="dir"
        value={dir}
        onChange={(e) => setDir(e.target.value)}
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

      {list?.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Create date</th>
              <th>Last modified date</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {list?.map(({ name, stat: { birthtime, mtime, size } }) => (
              <tr
                key={name}
                onClick={() => handleEdit(name)}
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
      )}

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
