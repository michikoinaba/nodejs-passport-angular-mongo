
var mongoose = require('mongoose');

// define our rented_tools model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('rented_tools', {
	
	tool_id: {type: String },
	 rented_date: {type: String},
	 user_id: {type: String},
	 user_info_id: {type: String}
	
});

