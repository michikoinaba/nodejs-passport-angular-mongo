// app/routes.js
var tools = require('./models/tools');

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs',{ title: 'Authentication' }); // load the index.ejs file
	});

	
	
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/loggedin', function(req, res) {

		//console.log('lggedin');
		//console.log(req.isAuthenticated());
		//if this user is logged in, req.isAuthenticated() is true otherwise set it to 0.
		 res.send(req.isAuthenticated() ? req.user : '0');
		
	});


	//login authentication
	app.post('/login', function(req, res, next) {
		  passport.authenticate('local-login', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { 
		        res.status(401);
		        res.end(info.message);
		        return;
		    }

			  req.logIn(user, function(err) {
			     if (err) 
			     { 
			    	return next(err); 
			     }
			     res.send(req.user);
			    }); 
		  })(req, res, next);
		});
	// =====================================
	// SIGNUP ==============================
	// =====================================

	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		
		res.send(req.user);
	 

	});
	
	//sign up authentication
	app.post('/signup', function(req, res, next) {
		  passport.authenticate('local-signup', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { 
		        res.status(401);
		        res.end(info.message);
		        return;
		    }
		    req.logIn(user, function(err) {
			     if (err) 
			     { 
			    	return next(err); 
			     }
			     res.send(req.user);
			    }); 
		  })(req, res, next);
		});
	
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	//RENT PAGE/////////////////
	app.get('/api/tools', function(req, res) {
		
		  tools.find(function (err, data) {

		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err) {
		            res.send(err);
		        }

		        res.json(data); // return all todos in JSON format
		    });
		
	});
};//module.exports = function(app, passport) {

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
