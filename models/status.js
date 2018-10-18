module.exports = function (sequelize, DataTypes) {
    const Status = sequelize.define('Status', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        libelle : {
            type : DataTypes.STRING,
            allowNull : false
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });
    return Status;
};

// INTERNAL

function _associate(models) {

}
