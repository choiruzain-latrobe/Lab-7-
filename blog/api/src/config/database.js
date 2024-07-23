const config = {
    database: process.env.NODE_ENV + '_db',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    host: process.env.MYSQL_REMOTE_HOST,
    port: process.env.MYSQL_REMOTE_PORT,
    dialect: 'mysql'
};

module.exports = config;