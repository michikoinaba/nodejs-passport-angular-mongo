var UserService = angular.module('UserService', []).factory('users', ['$http', function($http) {

    return {
       
	
		//this data is formData in read.html
		updateAddress: function(id, address_data){
			return $http.put('/api/users/'+id,address_data);
			
		},
		
		deleteAddress: function(id, address_id){
			return $http.delete('/api/users/'+id+'/'+address_id);
			
		},
		
		//get users addresses
		getUser: function(id){
			return $http.get('/api/users/'+id);
			
		},
		// these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(data) {
            return $http.post('/api/tools', data);
        },
        
        updatePayment : function(id, payment_data){
        	return $http.put('/api/payments/'+id,payment_data);
        	
        },
        
        updateRentedtools : function(id, rental_data){
        	return $http.put('/api/rentedtools/'+id,rental_data);
        	
        }
      
        
    }       

}]);