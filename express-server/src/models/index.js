import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';
import user from './user';

// Initialize connection to postgres DB
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  null,
  {
    dialect: 'postgres',
  },
);

// DB models
const models = {
  User: user(sequelize, DataTypes),
};

// Check for connection to DB
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export { sequelize };

export default models;
