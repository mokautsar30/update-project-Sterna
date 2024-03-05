'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }
  }
  UserProfile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: DataTypes.STRING,
    imgProfile: DataTypes.STRING,
    subscription: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};