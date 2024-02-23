// Discover Node environment (default to development)
const nodeEnv = process.env.NODE_ENV || 'development';

// Put database configuration properties into an object
const config = {
    database: nodeEnv + '_db',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    host: process.env.MYSQL_REMOTE_HOST,
    port: process.env.MYSQL_REMOTE_PORT,
    dialect: 'mysql'
};
module.exports = config;