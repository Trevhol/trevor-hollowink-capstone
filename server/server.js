const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const { uuid } = require("uuidv4");
const { allUsers, usersId } = require("./routes/users");
const { response } = require("express");
const app = express();
app.use(express.json());

const filename = (req, file, cb) => {
  const extension = file.mimetype.split("/")[1];
  cb(null, `${Date.now()}-${uuid()}.${extension}`);
};

const destination = (req, file, cb) => {
  cb(null, "./public/uploads/student");
};

const teacherDestination = (req, file, cb) => {
  cb(null, "./public/uploads/teacher");
};

const storage = multer.diskStorage({ filename, destination });
const teacherStorage = multer.diskStorage({
  filename,
  destination: teacherDestination,
});
const upload = multer({ storage });
const teacherUpload = multer({ storage: teacherStorage });

app.use(express.static("public"));
app.use(cors());

app.get("/users/:id", (req, res) => {
  console.log("users", req.params.id);
  usersId(req, res);
  // res.json({ ok: true });
});

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.get("/users", allUsers);

app.get("/uploads", (req, res) => {
  const files = fs.readdirSync("./public/uploads/student");

  res.json({ files });
});

app.get("/uploads/:id", (req, res) => {
  const username = req.params.id;
  const { users } = require("./model/data.json");
  const user = users.filter((u) => u.username === username);

  if (user.length === 0) {
    res.status(403).send("You must be logged in to see uploads.");
  }

  res.json({ files: user[0].uploads });
});

app.get("/teacher-uploads", (req, res) => {
  const files = fs.readdirSync("./public/uploads/teacher");

  res.json({ files });
});

app.post("/upload/:id", upload.single("file"), async (req, res) => {
  const username = req.params.id;
  const filename = req.file.filename;

  const { users } = require("./model/data.json");

  const user = users.filter((u) => u.username === username);

  if (users.length === 0) {
    res.status(403).send("You must be logged in to upload a file.");
  }

  try {
    const newUsers = users.map((u) => {
      if (u.username === username) {
        return {
          ...u,
          uploads: [filename, ...u.uploads],
        };
      }

      return u;
    });

    await fs.writeFileSync(
      "./model/data.json",
      JSON.stringify({ users: newUsers })
    );

    res.json(filename);
  } catch (e) {
    console.log("failed saving upload to db:", e);
    res.status(500).send("Failed saving upload to database.");
  }
});

app.post("/teacher-upload", teacherUpload.single("file"), (req, res) => {
  res.send("Success");
});

app.get("/download/:id", (req, res) => {
  const path = `./public/uploads/student/${req.params.id}`;
  res.download(path);
});

app.get("/assignment-download/:id", (req, res) => {
  const path = `./public/uploads/teacher/${req.params.id}`;
  res.download(path);
});

// checks user/pass of user in model/data
app.post("/login", (req, res) => {
  const { username, password } = JSON.parse(req.body.body);
  const { users } = require("./model/data.json");

  const user = users.filter((u) => u.username === username);

  if (user.length > 0 && user[0].password === password) {
    res.send("Success");
  } else {
    res.status(403).send("Error");
  }
});

// push a new user to ./model/data
app.post("/register", async (req, res) => {
  const { username, password } = JSON.parse(req.body.body);
  const { users } = require("./model/data.json");

  const user = users.filter((u) => u.username === username);

  if (user.length > 0) {
    res.status(500).send("User already exists");
  } else {
    try {
      const newUser = {
        userId: users.length,
        username,
        password,
        uploads: [],
      };

      const newUsers = [...users, newUser];

      fs.writeFileSync(
        "./model/data.json",
        JSON.stringify({ users: newUsers })
      );

      res.status(200).send("Success");
    } catch (e) {
      res.status(500).send("Error");
    }
  }
});

app.listen(5000);
