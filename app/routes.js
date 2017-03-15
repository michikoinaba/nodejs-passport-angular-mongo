// app/routes.js
var tools = require('./models/tools');
var users = require('./models/user');
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
	
	//Customer Info Page/////
  //postman test json
	/*
	{ "username": "yoda",
	"password": "$2a$10$Cc5NBQylWAy9LAgzeNaMauVu7BsxSR5PPmamH04LF8l/pYQvSyFGK",
	"info":
	{
		
		"first_name":"Michiko",
		"last_name":"Inaba",
		"email":"michiko@gmail.com",
		"phone":"503-777-5555",
		"address":[{
		          "street1": "28",
		          "street2": "Egemae",
		          "city": "Maruyama Okazaki",
		          "state": "Aichi",
		          "zip": "444-0006"
		         }]
	}	         
	
	}
*/
	app.put('/api/users/:_id', function (req, res){

		 return users.findById(req.params._id, function (err, user) {
		    
			 //assing each data value
			 user.info.first_name = req.body.info.first_name;
		     user.info.last_name = req.body.info.last_name;
		     user.info.email = req.body.info.email;
		     user.info.phone = req.body.info.phone;
		     
		     
		     //address is an array, so push the values into the array.
		    user.info.address.push({"street1": req.body.info.address[0].street1, "street2":req.body.info.address[0].street2,
		    			  "city": req.body.info.address[0].city, "state": req.body.info.address[0].state,
		    			  "zip": req.body.info.address[0].zip
		    });
		     
		    return user.save(function (err) {
		      if (err) {
		      
		        console.log('Error '+err);
		      }
		      return res.send( user);
		    });
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
