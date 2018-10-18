module.exports = function (sequelize, DataTypes) {
    const Host = sequelize.define('Host', {

        nb_bed : {
          type : DataTypes.DOUBLE,
          allowNull : false
        },
        distance : {
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
    Host.associate = _associate;
    return Host;
};
// INTERNAL

function _associate(models) {
  models.Host.belongsTo(models.User, {
    as : 'user',
    foreignKey : {
      name : "id_user"
    }
  });

}
