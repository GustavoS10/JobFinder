const {Sequelize, Op, model, DataTypes} = require('sequelize');
const db = require('../db/connection');
const sequelize = new Sequelize("sqlite::memory:");

const Job = sequelize.define("job", {
  title: {
    type: DataTypes.STRING(100),
    validate:{
      allowNull: false,
    }
  },
  description: {
    type: DataTypes.STRING(),
    validate:{
      customValidator(value){
        if(value < 50){
          throw new Error("The RH departament did not write any description, please call for the RH departament");
        }
      },
      allowNull: false,
    }
  },
  salary: {
    type: DataTypes.STRING(6),
    validate:{
      isInt: true,
      allowNull: false,
    }
  },
  company: {
    type: DataTypes.STRING,
    validate:{
      not: ["^[!-@-#-$-%-¨-&-*]"],
      allowNull: false,
    }
  },
  email: {
    type: DataTypes.STRING,
    validate:{
      isEmail: true,
      allowNull: false,
    }
  },
  new_job: {
    type: DataTypes.INTEGER,
    validate:{
      isInt: true,
      allowNull: false,
    }
  }
});

module.exports = Job