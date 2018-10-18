const config = require('../config');

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
    Status.initialize = _initialize
    return Status;
};

// INTERNAL

function _associate(models) {

}

function _initialize(models) {
    models.Status.count()
        .then( (count) => {
            if( count == 0 ) {
                createStatus(models);
            }
        })
}

function createStatus(models) {
    var status = config.status;
    for ( item in status ) {
        models.Status.create({
            libelle : status[item] 
        })
    }
}
