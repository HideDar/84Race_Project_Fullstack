module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      user_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      role: {
          type: DataTypes.ENUM('user', 'admin'),
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
      },
      full_name: {
          type: DataTypes.STRING,
      },
      profile_image: {
          type: DataTypes.STRING,
      },
  }, {
      tableName: 'users',
      timestamps: false,
  });

  User.associate = (models) => {
      User.hasMany(models.Address, {
          foreignKey: 'user_id',
          as: 'addresses',
      });
      User.hasMany(models.Ranking, {
          foreignKey: 'user_id',
          as: 'rankings',
      });
      User.belongsToMany(models.Challenge, {
          foreignKey: 'user_id',
          through: models.ChallengeParticipant,
          otherKey: 'challenge_id',
          onDelete: 'CASCADE',
      });
      User.belongsToMany(models.Club, {
          foreignKey: 'user_id',
          through: models.UserClub,
          otherKey: 'club_id',
          as: 'clubs',
          onDelete: 'CASCADE',
      });
      // Corrected relation
      User.hasMany(models.UserClub, {
          foreignKey: 'user_id',
          as: 'UserClubs',
      });
  };

  return User;
};
