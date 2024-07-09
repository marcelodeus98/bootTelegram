const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('Fica', 'USER_DB', 'PASSWORD_DB', {
    host: 'localhost',
    port:3306,
    dialect: 'mysql',
    timezone: '-03:00',
});

// CONNECT DATABASE 
sequelize.authenticate().then(() => {
    console.log('Connect with database, sucess!');
}).catch(() => {
    console.log('Error: Database not connect!');
});

module.exports = sequelize;