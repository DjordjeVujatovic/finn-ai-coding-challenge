import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import axios from 'axios';
import _ from 'lodash';

const app = express();
app.set('view engine', 'pug');

app.use(cors());

app.listen(4000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!!`),
);

async function createUser() {
  const username = await axios
    .get('http://localhost:3000/id/')
    .then(function (response) {
      return response.data;
    });

  return axios
    .post('http://localhost:3000/users/', {
      username: await username,
    })
    .then(function (response) {
      // If the POST requst response returns a failed status,
      // recursively call self until user is succesfully saved
      if (response.data.status === 'fail') {
        return createUser();
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

app.get('/', async (req, res) => {
  let user = await createUser();

  res.render('index', {
    message: user && user.data.message,
    username: user && user.data.User.username,
    failCount: user && user.data.failCount,
  });
});
