// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var tools = require('./tools');

// define the schema for our user model
var userSchema = mongoose.Schema({

	username: {type: String },
	password: {type: String},
	
		 
	first_name:{type: String},
	last_name:{type: String},
	email:{type: String},
	phone:{type: String},
	
	address:[{ 
		          street1: {type: String},
		          street2: {type: String},
		          city: {type: String},
		          state: {type: String},
		          zip: {type: String},
		          tool_id : {type : mongoose.Schema.Types.ObjectId,
		        	         ref: 'tools'}//rented tool id with this address
		         
		} ],
		
	payments:[{
			  type: {type: String},
	          name: {type: String},
	          number: {type: String},
	          securityCode: {type: String},
	          month: {type: String},
	          year: {type: String}
	         
		}],
	
	
	rentedtools:[{ 
					tool_id : {type : mongoose.Schema.Types.ObjectId, ref: 'tools'},
					address_id:{type : mongoose.Schema.Types.ObjectId},
					payment_id:{type : mongoose.Schema.Types.ObjectId},
					rented_date:{type: Date}
		}]
		
	
	
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

