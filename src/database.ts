import { Sequelize, Options } from 'sequelize';
import { Config } from './config';

export function getDatabase(): Sequelize {
    const options: Options = {
        username: Config.env.DATABASE_USER,
        password: Config.env.DATABASE_PASSWORD,
        database: Config.env.DATABASE_DATABASE,
        host: Config.env.DATABASE_HOST,
        port: Number(Config.env.DATABASE_PORT),
        dialect: 'postgres'
    }

    return new Sequelize(options);
}