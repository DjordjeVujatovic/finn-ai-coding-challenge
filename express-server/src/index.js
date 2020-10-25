import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import models, { sequelize } from './models';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use(cors());

app.use('/', routes.user);

sequelize.sync().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});
