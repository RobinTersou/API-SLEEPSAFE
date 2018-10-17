module.exports = function (sequelize, DataTypes) {
    const Sinister = sequelize.define('Sinister', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        id_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nb_people : {
          type : DataTypes.DOUBLE,
          allowNull : false
        },
        localisation : {
          type : DataTypes.STRING,
          allowNull : false
        },
        comment : {
          type : DataTypes.STRING,
          allowNull : true
        },
        id_status : {
          type : DataTypes.DOUBLE,
          allowNull: false
        },
        address_city : {
          type : DataTypes.STRING,
          allowNull : false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        urlimg: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    Sinister.associate = _associate
    return Host;
};

// INTERNAL

function _associate(models) {
models.Sinister.belongsTo(models.Host, {
  as : 'host',
  foreignKey : {
    name : "id_host"
  }
});
}
