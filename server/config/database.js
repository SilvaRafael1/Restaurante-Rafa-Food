import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('restaurante_development', 'root', null, {
  host: 'localhost',
  dialect: 'mysql', // ou 'mysql' | 'sqlite' | 'mariadb' | 'mssql'
  logging: false,
});

export default sequelize;
