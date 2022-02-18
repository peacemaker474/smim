'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post_tags.belongsTo(models.posts, {
        foreignKey: "post_id",
        sourceKey: "id",
      });
      models.post_tags.belongsTo(models.tags, {
        foreignKey: "tag_id",
        sourceKey: "id",
      });
    }
  }
  post_tags.init({
    // 연관관계로 자동 생성
  }
    ,
    {
      sequelize,
      modelName: "post_tags",
    }
  );
  return post_tags;
};