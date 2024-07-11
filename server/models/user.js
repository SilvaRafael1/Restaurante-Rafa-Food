'use strict';
import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database.js";

class User extends Model { }

User.init({
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: "user"
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;