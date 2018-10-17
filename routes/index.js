const RouteManager = function() {};

RouteManager.attach = function(app) {
    app.use('/user', require('./user'));
}