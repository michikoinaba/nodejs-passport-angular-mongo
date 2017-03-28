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
	//Body->raw->json(application/json)
  //postman test json
	/*
	{ "username": "test",
	"password": "$2a$08$BWyruVmSYrg8GXkGglk/GevwfxncDCvsbFpk1r4inaY1OmeNYxeSu",
	
		
		"first_name":"Michiko",
		"last_name":"Inaba",
		"email":"michiko@gmail.com",
		"phone":"503-777-5555",
		"address":[{
		          "street1": "1233 Burnside ST",
		          "street2": "Suite #200",
		          "city": "Portland",
		          "state": "OR",
		          "zip": "98777",
		          "tool_id":"58828bb6de613fe02746f52c"
		         }]
         
	
	}
*/
	//update user's addresses and info
	app.put('/api/users/:_id', function (req, res){

		 return users.findById(req.params._id, function (err, user) {
		    
			 //console.log('req.params.id '+req.body.info.first_name);
			 //assing each data value
			 user.first_name = req.body.first_name;
		     user.last_name = req.body.last_name;
		     user.email = req.body.email;
		     user.phone = req.body.phone;
		    
		     
		     //address is an array, so push the values into the array.
		    user.address.push({"street1": req.body.address[0].street1, "street2":req.body.address[0].street2,
		    			  "city": req.body.address[0].city, "state": req.body.address[0].state,
		    			  "zip": req.body.address[0].zip, "tool_id": req.body.address[0].tool_id
		    });
		     
		    return user.save(function (err) {
		      if (err) {
		      
		        console.log('Error '+err);
		      }
		      return res.send( user);
		    });
		  });

		});
	
		//get a selected user's info
		app.get('/api/users/:_id', function (req, res){

		 return users.findById(req.params._id, function (err, user) {
		    
			   // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err) {
		            res.send(err);
		        }

		        res.json(user); // return all todos in JSON format
		  });

		});
		
	   //remove a selected address from a selected user
		app.delete('/api/users/:_id/:address_id', function(req, res){
			//sample site
			//http://stackoverflow.com/questions/39424531/mongoose-mongodb-remove-an-element-on-an-array
			
		    users.findByIdAndUpdate(req.params._id, {
		        $pull: {address: {
		            _id: req.params.address_id   //_eventId is string representation of event ID
		        }}
		    }, function(err, data){
	    		 if (err) {
			            res.send(err);
			        }
	    		 else{
	    			 
	    			 res.json(data);
	    		 }
			        
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
