const {Sequelize, Op, model, DataTypes} = require('sequelize');
const db = require('../db/connection');
const sequelize = new Sequelize("sqlite::memory:");

const Job = db.define("job", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  salary: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  new_job: {
    type: DataTypes.INTEGER
  }
});

(async () => {
  await sequelize.sync({ force: true });
  // Codifique aqui
  title:{
    validate:{
      allowNull: false
    }
  }
  description:{
    validate:{
      customValidator(value){
        if(value < 50){
          throw new Error("The RH departament did not write any description, please call for the RH departament");
        }
      }
      allowNull: false
    }
  }
  salary:{
    validate:{
      isInt: true
    }
  }
  company:{
    validate:{
      not: ["^[!-@-#-$-%-¨-&-*]"]
    }
  }
  email:{
    validate:{
      isEmail: true
    }
  }
  new_job:{
    validate:{
      isInt: trues
    }
  }
})();

module.exports = Job