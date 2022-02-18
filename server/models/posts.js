'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.posts.hasMany(models.comments, {
        foreignKey: 'post_id',
        sourceKey: 'id'
      });
      models.posts.hasMany(models.post_tags, {
        foreignKey: 'post_id',
        sourceKey: 'id',
      });
      models.posts.hasMany(models.likes, {
        foreignKey: 'target_id',
        sourceKey: 'id',
      });
      models.posts.belongsTo(models.users, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
    }
  }
  posts.init(
    {
      title: DataTypes.STRING,
      textcontent: DataTypes.TEXT,
      view: DataTypes.INTEGER,
      targetage: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'posts',
    }
  );
  return posts;
};
