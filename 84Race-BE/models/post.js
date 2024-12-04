module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        post_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        post_img: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },
    {
        tableName: 'posts',
        timestamps: false,
    });
    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };

    return Post;
}   