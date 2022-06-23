const {Sequelize, Op, model, DataTypes} = require('sequelize');
const db = require('../db/connection');

const Job = db.define('job', {
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
          throw new Error("Description require more character!");
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

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

module.exports = Job