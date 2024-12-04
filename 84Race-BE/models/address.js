module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('address', {
        address_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'address',
        timestamps: false,
    });
    Address.associate = (models) => {
        // Một địa chỉ thuộc về một user
        Address.belongsTo(models.User, {
          foreignKey: 'user_id', // khóa ngoại trong bảng User
          as: 'user', // alias để sử dụng khi truy vấn
        });
      };

    return Address;     
}