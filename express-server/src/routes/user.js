import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const router = Router();

const userSaved = ["failure", "success"];

function randomChance(arr) {
  return _.sample(arr);
}

// Get Users
router.get("/users", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

// Get auto-generated unique ID
router.get("/id", async (req, res) => {
  const id = uuidv4();
  return res.send(id);
});

// Get User
router.get("/users/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

// Amount of times attempt to save user to DB failed
let failCount = 0;

// Create User
router.post("/users/", async (req, res) => {
  const userSavedResult = randomChance(userSaved);

  if (userSavedResult === "success") {
    const user = await req.context.models.User.create({
      username: req.body.username,
    })
      .then(function (user) {
        res.json({
          Message: "Success: User created!",
          User: user,
          FailCount: failCount,
        });
      })
      .catch(function (err) {
        res.json({
          Message: "Failure: Unable to create user.",
        });
      });
    failCount = 0;
    return res.send(user);
  } else {
    failCount++;
    return res.send("Error");
  }
});

export default router;
