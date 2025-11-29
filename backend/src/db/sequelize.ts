import { Sequelize } from "sequelize-typescript";
import config from "config";
import User from "../models/User";
import Vacation from "../models/Vacation";
import Like from "../models/Like";
import Role from "../models/Role";

const sequelize = new Sequelize({
    ...config.get("db"),
    dialect: "mysql",
    models: [User, Vacation, Like, Role],
});

export default sequelize;
