// app/routes.js
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

		console.log('lggedin');
		console.log(req.isAuthenticated());
		// render the page and pass in any flash data if it exists
		//res.render('login.ejs', { message: req.flash('loginMessage') });
		 res.send(req.isAuthenticated() ? req.user : '0');
		
	});


/*
	app.post('/login', function(req, res, next) {
		  //look at the 2nd parameter to the below call 
		  passport.authenticate('local', {
			  //successRedirect: '/home',
			  //failureRedirect: '/login',
			 // failureFlash: true
			},function(err, user, info) {
				
				 
		    if (err) 
		    { 
		    	return next(err); 
		    }
		    if (info != '') 
		    { 
		    	return res.send(info);
		    }
		   
		   req.logIn(user, function(err) {
		    	if (err) 
		    	{ 
		    		return next(err); 
		    	}
		    	 return res.redirect('#/home');
		    }); 
		
		  })(req, res, next);
		});
*/
	// route to log in
	app.post('/login', passport.authenticate('local'), function(req, res) {
		
	  	res.send(req.user);
	    
	  
	});
	
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		//res.render('signup.ejs', { message: req.flash('signupMessage') });
	
		res.send(req.user);
	 

	});
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
