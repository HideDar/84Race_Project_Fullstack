module.exports = (sequelize, DataTypes) => {
    const UserClub = sequelize.define('UserClub', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role: {
            type: DataTypes.ENUM('member', 'admin'),
            allowNull: false,
        },
        joined_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            defaultValue: 'pending',
        },
    }, {
        tableName: 'user_club',
        timestamps: false,
    });
    UserClub.associate = (models) => {
        UserClub.belongsTo(models.User, { foreignKey: 'user_id', as: 'members' });
        UserClub.belongsTo(models.Club, { foreignKey: 'club_id' });
    };

    return UserClub;
};
