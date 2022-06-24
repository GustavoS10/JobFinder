const Sequelize = require('sequelize');
const db = require('../db/connection');

const Job = db.define('job', {
  title: {
    type: Sequelize.STRING(100)
  },
  description: {
    type: Sequelize.STRING()
  },
  salary: {
    type: Sequelize.STRING(6)
  },
  company: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  new_job: {
    type: Sequelize.INTEGER
  }
});
module.exports = Job