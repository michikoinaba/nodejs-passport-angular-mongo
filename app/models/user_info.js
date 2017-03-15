
var mongoose = require('mongoose');

// define our tools model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('user_info', {
	
	 first_name: {type: String },
	 last_name: {type: String},
	 street1: {type: String},
	 street2: {type: String},
	 city: {type: String},
	 state: {type: String},
	 zip: {type: String},
	 email: {type: String},
	 phone: {type: String},
	 user_id: {type: String},
	 timestamp: {type: String},
	 
});

