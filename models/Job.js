const {Sequelize, Op, model, DataTypes} = require('sequelize');
const db = require('../db/connection');
const sequelize = new Sequelize("sqlite::memory:");

const Job = db.define("job", {
  title: {
    type: Sequelize.STRING(100),
    validate:{
      allowNull: false,
    }
  },
  description: {
    type: Sequelize.STRING(),
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
    type: Sequelize.STRING(6),
    validate:{
      isInt: true,
      allowNull: false,
    }
  },
  company: {
    type: Sequelize.STRING,
    validate:{
      not: ["^[!-@-#-$-%-¨-&-*]"],
      allowNull: false,
    }
  },
  email: {
    type: Sequelize.STRING,
    validate:{
      isEmail: true,
      allowNull: false,
    }
  },
  new_job: {
    type: Sequelize.INTEGER,
    validate:{
      isInt: true,
      allowNull: false,
    }
  }
});

module.exports = Job