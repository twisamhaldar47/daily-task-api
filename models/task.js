"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.User);
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Project, {
        foreignKey: "project_id",
      });
      this.belongsTo(models.Designation, {
        foreignKey: "designation_id",
      });
      this.belongsTo(models.Status, {
        foreignKey: "status_id",
      });
    }
  }
  Task.init(
    {
      user_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER,
      designation_id: DataTypes.INTEGER,
      task_details: DataTypes.STRING,
      start_date: DataTypes.DATE,
      estimate_hours: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      hour_taken: DataTypes.INTEGER,
      end_date: DataTypes.DATE,
      comments: DataTypes.STRING,
      attachment_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Task",
    },
  );
  return Task;
};
