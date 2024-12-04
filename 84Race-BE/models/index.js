const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.js');


const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    port: dbConfig.development.port
  }
);

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Challenge = require('./challenge')(sequelize, DataTypes);
db.Address = require('./address')(sequelize, DataTypes);
db.Post = require('./post')(sequelize, DataTypes);
db.Ranking = require('./ranking')(sequelize, DataTypes);
db.ChallengeParticipant = require('./challengeParticipants')(sequelize, DataTypes);
db.Club = require('./club')(sequelize, DataTypes);
db.UserClub = require('./userClub')(sequelize, DataTypes);

Object.values(db).forEach(model => {
  if (model.associate) {
      model.associate(db);
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the MySQL database');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
