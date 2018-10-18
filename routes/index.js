const RouteManager = function() {};

RouteManager.attach = function(app) {
    app.use('/user', require('./user'));
    app.use('/host', require('./host'));
    app.use('/sinister', require('./sinister'))
}

module.exports = RouteManager;