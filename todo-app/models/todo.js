"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static async overdue() {
      return this.findAll({
        where: { dueDate: { [Op.lt]: new Date() }, completed: false },
      });
    }
    static async dueToday() {
      return this.findAll({
        where: { dueDate: { [Op.eq]: new Date() }, completed: false },
      });
    }
    static async dueLater() {
      return this.findAll({
        where: { dueDate: { [Op.gt]: new Date() }, completed: false },
      });
    }
    static async CompletedItems() {
      return this.findAll({ where: { completed: true } });
    }
    static async remove(id) {
      return this.destroy({ where: { id } });
    }
    setCompletionStatus(status) {
      return this.update({ completed: status });
    }

    static deleteAll() {
      this.destroy({ where: {} });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

// const formattedDate = d => {
//   return d.toISOString().split("T")[0]
// }
