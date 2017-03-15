
var mongoose = require('mongoose');

// define our tools model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('tools', {
	
	 type: {type: String },
	 name: {type: String},
	 description: {type: String},
	 available: {type: String},
	 price: {type: String}
});

