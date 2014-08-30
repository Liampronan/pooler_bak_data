module.exports = function(app, passport) {
  var request = require("request");
  app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/home', isLoggedIn, function(req, res){
        res.render('webapp');
    });

    app.get('/partial/auth/:name', isLoggedIn, function(req, res) {
        var name = req.params.name;
        res.render('partials/auth/' + name);
    });

    app.get('/partial/:name', function(req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/#/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    app.get('/api/logout', isLoggedIn, function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/uber/api/products', function(req, res){
      var host = 'https://api.uber.com/v1/products?server_token=6q10iFhFqbzAe7FQebL8w7Uju8Vq09a-JcODZiUp' +
          '&latitude=37.775818&longitude=-122.418028';
      request(host, function (error, response, body) {
//        TODO: error handling
        if (!error && response.statusCode == 200) {
          res.send(body);
        }
      });
    });

    app.get('/uber/api/prices', function(req, res){
      var startLat = parseFloat(req.query.startLat);
      var startLng = parseFloat(req.query.startLng);
      var endLat = parseFloat(req.query.endLat);
      var endLng = parseFloat(req.query.endLng);
      var host = 'https://api.uber.com/v1/estimates/price?server_token=6q10iFhFqbzAe7FQebL8w7Uju8Vq09a-JcODZiUp' +
          '&start_latitude=' + startLat + '&start_longitude=' + startLng + '&end_latitude=' +
           endLat + '&end_longitude=' + endLng;
      request(host, function (error, response, body) {
  //        TODO: error handling
        if (!error && response.statusCode == 200) {
          res.send(body);
        }
        else {
          console.log(error, body, response);
          console.log(startLat);
          console.log(req.query);
        }
      });
    });

    app.get('/uber/api/times', function(req, res){
      var startLat = parseFloat(req.query.startLat);
      var startLng = parseFloat(req.query.startLng);
      var host = 'https://api.uber.com/v1/estimates/time?server_token=6q10iFhFqbzAe7FQebL8w7Uju8Vq09a-JcODZiUp' +
          '&start_latitude=' + startLat + '&start_longitude=' + startLng;
      request(host, function (error, response, body) {
        //        TODO: error handling
        if (!error && response.statusCode == 200) {
          res.send(body);
        }
        else {
          console.log(error, body, response);
          console.log(startLat);
          console.log(req.query);
        }
      });
    });

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

}
