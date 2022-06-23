const {Sequelize, Op, model, DataTypes} = require('sequelize');
const db = require('../db/connection');

const Job = db.define('job', {
  title: {
    type: DataTypes.STRING(100),
  },
  description: {
    type: DataTypes.STRING(),
    validate:{
      customValidator(value){
        if(value < 50){
          throw new Error("Description require more character!");
        }
      }
    }
  },
  salary: {
    type: DataTypes.STRING(6),
    validate:{
      isInt: true,
    }
  },
  company: {
    type: DataTypes.STRING,
    validate:{
      not: ["^[!-@-#-$-%-¨-&-*]"],
    }
  },
  email: {
    type: DataTypes.STRING,
    validate:{
      isEmail: true,
    }
  },
  new_job: {
    type: DataTypes.INTEGER,
    validate:{
      isInt: true,
    }
  }
});

module.exports = Job