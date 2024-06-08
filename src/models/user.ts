import { Sequelize, DataTypes } from "sequelize";
import { getDatabase } from "../database";

const sequelize = getDatabase();

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
    }
});

export { User };