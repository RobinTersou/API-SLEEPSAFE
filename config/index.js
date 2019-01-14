module.exports = {
    secret: 'my-super-secret',
    bdd : {
        host : 'localhost',
        dialect : 'mysql',
        dbname : 'sleepsafe',
        user : 'root',
        password : '',
        port : 3306
    },
    status : [
        "waiting",
        "Hosted",
        "Ended"
    ],
    nb_sinister : 2
}
