// challengeParticipants.js
module.exports = (sequelize, DataTypes) => {
    const ChallengeParticipant = sequelize.define('ChallengeParticipant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        challenge_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        join_at: {
            type: DataTypes.DATE, // Đổi từ TIMESTAMP sang DATE nếu gặp lỗi
            defaultValue: DataTypes.NOW // Sử dụng cho trường hợp này
        },
        total_distance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        total_time: {
            type: DataTypes.TIME,
            allowNull: true
        },
        average_speed: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        tableName: 'challenge_participants',
        timestamps: false,
    });

    ChallengeParticipant.associate = (models) => {
        ChallengeParticipant.belongsTo(models.Challenge, { foreignKey: 'challenge_id' });
        ChallengeParticipant.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };

    return ChallengeParticipant;
};
