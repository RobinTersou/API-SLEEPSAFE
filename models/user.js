module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id : {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        id_phone : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstname : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull : false
        },
        phone_number : {
            type: DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    User.associate = _associate;
    return User;
}

// INTERNAL

function _associate(models) {
    
}