import express, { json } from 'express';

import { getDatabase } from './database'
import { Config } from './config';
import Logger from './logger';
import { UserController } from './controllers';

(async () => {
  Config.validate();
  const app = express();
  const sequelize = getDatabase();

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const userController = new UserController();

  app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
  });

  app.use(json())
  app.use(userController.path, userController.router());


  app.listen(Config.env.PORT, Config.env.HOST, () => {
    Logger.info(`Server running at http://${Config.env.HOST}:${Config.env.PORT}`);
  });
})();