const Sequelize = require('sequelize');
// Load our database configuration
const dbConfig = require('../config/database');
// Connect Sequelize to the database
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig);
// Load all of our model definitions
const models = {
    Post: sequelize.import(require.resolve('./post'))
};
// Store the database connection
models.database = sequelize;
// Export our model definitions
module.exports = models;
