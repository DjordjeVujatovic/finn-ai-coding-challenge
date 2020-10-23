import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import e from "express";

const app = express();
app.set("view engine", "pug");

app.use(cors());

app.listen(4000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!!`)
);

app.get("/", async (req, res) => {
  const randomUsername = uuidv4();

  function createUser() {
    return axios
      .post("http://localhost:3000/users/", {
        username: randomUsername,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const user = await createUser();
  console.log(user, "USERRRRRR");
  if (user.data === "Error") {
    createUser();
  } else {
    res.render("index", {
      message: user.data.Message,
      username: user.data.User.username,
      failCount: user.data.FailCount,
    });
  }
});
