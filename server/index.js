// server/index.js

const express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

/** Get files/directories from directory */
app.post("/post", (req, res) => {
  console.log("Connected to React");

  console.log("req*-*", req, "*-*", req.body, req.params);
  const { directory } = req.body;

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log(err, err);
      res.status(400).json({ error: "Permission error" });
    } else {
      files = files.map((file) => {
        let stat;
        try {
          stat = fs.statSync(directory + "/" + file);
        } catch (e) {
          stat = {};
        }
        return {
          name: file,
          stat,
        };
      });
      console.log(files);
      res.json({ message: files });
    }
  });
});

/** Open file for edit */
app.post("/open", (req, res) => {
  const { file } = req.body;

  try {
    if (fs.lstatSync(file).isFile()) {
      console.log("file exists");
      fs.readFile(file, "utf8", function (err, data) {
        // Display the file content
        console.log(data);
        if (err) {
          console.log(err);
          res
            .status(400)
            .json({ error: "Sorry, this is error. Try again later!" });
        } else {
          res.json({ message: data, type: "file" });
        }
      });
    } else {
      console.log("directory");
      res.json({ type: "directory" });
    }
  } catch (err) {
    res.status(400).json({ error: "Sorry, this is error. Try again later!" });
  }
});

/** Change or create file */
app.post("/save", (req, res) => {
  const { file, content } = req.body;

  try {
    fs.writeFile(file, content, { flag: "a+" }, (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .json({ error: "Error of writting. Try again later!" });
      }
      return res.json({ message: data });
    });
  } catch (err) {
    res.status(400).json({ error: "Sorry, this is error. Try again later!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
