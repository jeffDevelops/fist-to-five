'use strict';
module.exports = (sequelize, DataTypes) => {
  var Prompt = sequelize.define('Prompt', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
    prompt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cohort: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    promptedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fists: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ones: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    twos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    threes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fours: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fives: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    promptCreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});
  Prompt.associate = function(models) {
    // associations can be defined here
  };
  return Prompt;
};