import e, { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import users from "../models/mockDb";

const router = Router();

const databases = ["json_db", "postgres_db"];

function shuffleDbs(arr) {
  return _.sample(arr);
}
// Get Users
router.get("/users", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

// Get auto-generated unique ID
router.get("/id", async (req, res) => {
  console.log(users);
  const id = uuidv4();
  return res.send(id);
});

// Get User
router.get("/users/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

// Create User
router.post("/users/", async (req, res) => {
  const db = shuffleDbs(databases);
  if (db === "postgres_db") {
    const user = await req.context.models.User.create({
      username: req.body.username,
    })
      .then(function (user) {
        res.json({
          Message: "Success: User created!",
          User: user,
        });
      })
      .catch(function (err) {
        res.json({
          Message: "Failure: Unable to create user.",
        });
      });
    return res.send(user);
  } else {
    const id = uuidv4();
    const user = {
      id,
      username: req.body.username,
    };

    users.push(user);
  }
});

export default router;
