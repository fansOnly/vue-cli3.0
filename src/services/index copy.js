const Sequelize = require('sequelize')

const config = {
    database: 'vueWebsite',
    username: 'root',
    password: 'fansonly@521',
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
}

const options = {
    protocol: 'tcp',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const sequelize = new Sequelize(`${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`, options);

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

export default sequelize;