module.exports = (sequelize, DataTypes) => {

const Challenge = sequelize.define('challenge', {
  challenge_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  club_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  challenge_type: {
    type: DataTypes.ENUM('individual', 'club'),
    allowNull: false
  },
  rules: {
    type: DataTypes.JSON,
    allowNull: true
  },
  goal_distance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  goal_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true
  }
    }, {
        tableName: 'challenges',
        timestamps: false,
    });
    Challenge.associate = (models) => {
      Challenge.hasMany(models.ChallengeParticipant, { foreignKey: 'challenge_id' });
      Challenge.belongsTo(models.Club, { foreignKey: 'club_id' });  
    };
  
    return Challenge;
};

