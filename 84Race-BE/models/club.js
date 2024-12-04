module.exports = (sequelize, DataTypes) => {
    const Club = sequelize.define('Club', {
        club_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        logo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },
    }, {
        tableName: 'clubs',
        timestamps: false,
    });

    Club.associate = (models) => {
        // Quan hệ N-N với User qua bảng trung gian UserClub
        Club.belongsToMany(models.User, {
          foreignKey: 'club_id',
          through: models.UserClub,
          otherKey: 'user_id',
          as: 'users',
          onDelete: 'CASCADE',
        });
        Club.hasMany(models.UserClub, {
            foreignKey: 'club_id',
            as: 'UserClubs',
        });
    };
    return Club;
}