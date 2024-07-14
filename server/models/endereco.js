'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Endereco extends Model {}

Endereco.init({
  endereco: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id"
    }
  }
}, {
  sequelize,
  modelName: 'Endereco',
});
  
export default Endereco;