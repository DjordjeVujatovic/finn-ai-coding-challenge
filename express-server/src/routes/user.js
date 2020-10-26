import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const router = Router();

// Get Users
router.get('/users', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

// Get auto-generated unique ID
router.get('/id', async (req, res) => {
  const id = uuidv4();
  return res.send(id);
});

// Amount of times attempt to save user to DB failed
let failedUserCreationAttempts = 0;

// Mock DB where user gets saves 50% of the time
export let mockDb = [];

// Mocking 50% chance with coin and 'coinflip' helper function
export const coin = ['heads', 'tails'];

export function coinflip(arr) {
  return _.sample(arr);
}

// Create User
router.post('/users/', async (req, res) => {
  if (coinflip(coin) === 'heads') {
    const user = await req.context.models.User.create({
      username: req.body.username,
    })
      .then(function (user) {
        res.json({
          message: 'Success: User created!',
          User: user,
          failCount: failedUserCreationAttempts,
          status: 'success',
        });
      })
      .catch(function (err) {
        res.json({
          message: 'Failure: Unable to create user.',
        });
      });
    failedUserCreationAttempts = 0;
    return res.send(user);
  } else {
    mockDb.push({ username: req.body.username });

    failedUserCreationAttempts++;

    res.send({ status: 'fail' });
  }
});

export default router;
