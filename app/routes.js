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
	
	app.get('/api/tools/:_id', function(req, res) {
		
		   return tools.findById(req.params._id, function (err, data) {

		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err) {
		            res.send(err);
		        }

		        res.json(data); // return tool in JSON format
		    });
		
	});
	
	//Customer Info Page/////
	//Body->raw->json(application/json)
  //postman test json
	/*
	{ "username": "abc",
	"password": "$2a$08$aA99hDg46GyQCTysT1ViUO7JLhAUytGaOPYw9Nf99LIYShmO8PN7u",
	
		
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
	//update user's addresses 
	app.put('/api/users/:_id', function (req, res){

		 return users.findById(req.params._id, function (err, user) {
		   
			//console.log(JSON.stringify(req.body.first_name));
			 //assing each data value
			 user.first_name = req.body.first_name;
		     user.last_name = req.body.last_name;
		     user.email = req.body.email;
		     user.phone = req.body.phone;
		   
		     
		     //address is an array, so push the values into the array.
		    user.address.push({"street1": req.body.street1, "street2":req.body.street2,
		    			  "city": req.body.city, "state": req.body.state,
		    			  "zip": req.body.zip, "tool_id": req.body.tool_id
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
		
		
		//get a selected user's selected address and selected payment method
		app.get('/api/users/:_id/:address_id/:payment_id', function (req, res){
			
			users.findById(req.params._id, {
				address: {$elemMatch: {_id: req.params.address_id}},payments:{$elemMatch: {_id: req.params.payment_id}}
			},function(err,data){
				
				if(err){
					
					res.send(err);
				}else{
					
					res.json(data);
				}
			});
			
		});
		
		
		//get a selected users selected payment info
		app.get('/api/payments/:_id/:payment_id', function(req,res){
			
			users.findById(req.params._id, {
				payments:{$elemMatch: {_id: req.params.payment_id}}
			},function(err,data){
				
				if(err){
					
					res.send(err);
				}else{
					
					res.json(data);
				}
			});
			
		});
		
		//get a selected users selected payment info
		app.get('/api/users/:_id/:address_id', function(req,res){
			
			users.findById(req.params._id, {
				address:{$elemMatch: {_id: req.params.address_id}}
			},function(err,data){
				
				if(err){
					
					res.send(err);
				}else{
					
					res.json(data);
				}
			});
			
		});
		
	   //remove a selected address from a selected user
		app.delete('/api/users/:_id/:address_id', function(req, res){
			//sample site
			//http://stackoverflow.com/questions/39424531/mongoose-mongodb-remove-an-element-on-an-array
			
			//find a user by user_id and pull (remove) the selected address_id from the selected user.
		    users.findByIdAndUpdate(req.params._id, {
		        $pull: {address: {
		            _id: req.params.address_id  
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
		
		
		
		   //remove a selected payment from a selected user
			app.delete('/api/payments/:_id/:payment_id', function(req, res){
				//sample site
				//http://stackoverflow.com/questions/39424531/mongoose-mongodb-remove-an-element-on-an-array
				
				//find a user by user_id and pull (remove) the selected address_id from the selected user.
			    users.findByIdAndUpdate(req.params._id, {
			        $pull: {payments: {
			            _id: req.params.payment_id  
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
			
		
		//add a payment info into the users collection
		//add user's payment _id is userid
		app.put('/api/payments/:_id', function (req, res){

			 return users.findById(req.params._id, function (err, user) {
			   
				// console.log('payments');
				//console.log(JSON.stringify(req.params._id));
			
			     //payments is an array, so push the values into the array.
			    user.payments.push({"type": req.body.type, "name":req.body.name,
			    			  "number": req.body.number, "securityCode": req.body.securityCode,
			    			  "month": req.body.month, "year": req.body.year
			    });
			     
			   
			    return user.save(function (err) {
			      if (err) {
			      
			        console.log('Error '+err);
			      }
			      return res.send( user);
			    });
			  });

			});
		
	
		//add a rented tool info into the users collection
		//add payment_id, address_id, tool_id
		app.put('/api/rentedtools/:_id', function (req, res){

			 return users.findById(req.params._id, function (err, user) {
	
				//console.log(JSON.stringify(req.params._id));
			
			     //payments is an array, so push the values into the array.
			    user.rentedtools.push({"tool_id": req.body.tool_id, "address_id":req.body.address_id,
			    			  "payment_id": req.body.payment_id, "rented_date":req.body.rented_date
			    });
			     
			   
			    return user.save(function (err) {
			      if (err) {
			      
			        console.log('Error '+err);
			      }
			      return res.send( user);
			    });
			  });

			});
		
		
		//in userService.js
		//getRentedTools
		//populate rented tools from the rentedtools in the users collection
		app.get('/api/rentedtools/:_id' , function(req,res){
			 var tool_ids = []; 
			 var rented_dates=[];
			 var tool_info=[];
			 var element={};
			 users.findById(req.params._id, function (err, user) {
				
				   // if there is an error retrieving, send the error. nothing after res.send(err) will execute
			     if (err) {
			            res.send(err);
			        }
			       // res.json(user.rentedtools); 
			        
			     //loop thru the rentedtools to get the selected tool_id's data from tool collection
			        for(var key1 in user.rentedtools){
				        for(var key2 in user.rentedtools[key1]){
				        	
				        	if(key2 == 'tool_id'){
				        		//console.log('key2 '+key2 + ' '+user.rentedtools[key1][key2]);
				        		tool_ids.push(user.rentedtools[key1][key2]);
				        		
				        	}//if(key2 == 'tool_id'){
				        	
				        	//add all rented_date into rented_dates array
				        	if(key2 == 'rented_date'){
				        		
				        		rented_dates.push(user.rentedtools[key1][key2]);
				        	}
				        	
				        }//for
			 		}//for
			        
			        //console.log(rented_dates);
			        //find all tool data from the tools collection with selected tool ids
			        tools.find({
			        	"_id": {$in:tool_ids}
			        }, function(err, tool_data){
			        	  
			        	if (err) {
					       res.send(err);
					    }
			        	
			        	//add the rented_date and the tool data in one obj
			        	for(var key in tool_data){
			        		
			        		element[key]={tool:tool_data[key]};
			        		element[key].rented_date = rented_dates[key];
			        		
			        		tool_info.push(element[key]);
			        		//console.log('key '+key + ' '+element[key].rented_date);
			        	}
			        	//console.log(tool_info[0].rented_date);
			        	res.json(tool_info);
			        	
			        	
			        });
			     
			  });	
			 
			
		});
		
		//getPayment in userService.js
		app.get('/api/payments/:_id' , function(req,res){
			
			users.findById(req.params._id, function (err, user) {
				
				   // if there is an error retrieving, send the error. nothing after res.send(err) will execute
			     if (err) {
			            res.send(err);
			        }
			
			     res.json(user.payments);
			     
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
