module.exports = (sequelize, DataTypes) => {
    const Ranking = sequelize.define('Ranking', {
        ranking_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        challenge_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        club_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    }, {
        tableName: 'rankings',
        timestamps: false,
    });

    return Ranking;
}
