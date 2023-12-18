"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Designation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Task, {
      //   foreignKey: "designation_id",
      // });
    }
  }
  Designation.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Designation",
    },
  );
  return Designation;
};
