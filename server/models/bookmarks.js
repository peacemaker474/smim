'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
      // define association here
      models.bookmarks.belongsTo(models.users, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      models.bookmarks.belongsTo(models.posts, {
        foreignKey: 'post_id',
        sourceKey: 'id',
      });
    }
  }
  bookmarks.init({

  }, {
    sequelize,
    modelName: 'bookmarks',
  });
  return bookmarks;
};