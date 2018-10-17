module.exports = function (sequelize, DataTypes) {
    const Host = sequelize.define('Host', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nb_bed : {
          type : DataTypes.DOUBLE,
          allowNull : false
        },
        distance : {
          type : DataTypes.DOUBLE,
          allowNull : false
        },
        address_number : {
          type : DataTypes.DOUBLE,
          allowNull : false
        },
        address_name : {
          type : DataTypes.STRING,
          allowNull: false
        },
        address_zipcode : {
          type : DataTypes.STRING,
          allowNull : false
        },
        address_city : {
          type : DataTypes.STRING,
          allowNull : false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    return Host;
};

// INTERNAL

function _associate(models) {

}
