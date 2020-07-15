const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Pdf = require('../models/Pdf');

const connection = new Sequelize(dbConfig);

Pdf.init(connection);

module.exports = connection;