'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.hasMany(models.posts, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.users.hasMany(models.likes, {
        foreignKey: "user_id",
        sourceKey: "id",
      });  
      models.users.hasMany(models.comments, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      // define association here
    }
  }
  users.init(
    {
      userid: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      social: DataTypes.STRING,
      state: DataTypes.STRING,
      nickname: DataTypes.STRING,
      image: DataTypes.TEXT,
      birthdate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};