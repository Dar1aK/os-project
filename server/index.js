// server/index.js

const express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

/** Get files/directories from directory */
app.post("/post", (req, res) => {
  console.log("req*-*", req, "*-*", req.body, req.params);
  const { directory } = req.body;

  fs.readdir(directory, (err, files) => {
    if (err) {
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
          birthtime: stat.birthtime,
          mtime: stat.mtime,
          size: stat.size,
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

/** Change file */
app.post("/save", (req, res) => {
  const { file, content } = req.body;

  try {
    fs.writeFile(file, content, (err, data) => {
      if (err) {
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

/** Create file */
app.post("/add", (req, res) => {
  const { file, content } = req.body;

  try {
    fs.writeFile(file, content, { flag: "a+" }, (err, data) => {
      if (err) {
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

const EMAIL = "borgoth@mordos.com";
const PASSWORD = "12bindthem";

/** Auth */
app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  //mock db

  if (email === EMAIL && password === PASSWORD) {
    return res.json({
      access: true,
      lastName: "Borgoth",
      email: "borgoth@mordos.com",
    });
  }

  return res
    .status(400)
    .json({ access: false, error: "You are not in database" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
