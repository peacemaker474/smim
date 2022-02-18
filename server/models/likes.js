'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.likes.belongsTo(models.users, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.likes.belongsTo(models.posts, {
        foreignKey: "target_id",
        sourceKey: "id",
      });
      models.likes.belongsTo(models.comments, {
        foreignKey: "target_id",
        sourceKey: "id",
      });
    }
  }
  likes.init(
    {
      target_type: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};