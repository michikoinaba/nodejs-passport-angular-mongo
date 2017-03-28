var UserService = angular.module('UserService', []).factory('users', ['$http', function($http) {

    return {
       
	
		//this data is formData in read.html
		updateAddress: function(id){
			return $http.put('/api/users/'+id);
			
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

        // call to DELETE a nerd
     //   delete : function(id) {
     //       return $http.delete('/api/tools/' + id);
      //  }
    }       

}]);