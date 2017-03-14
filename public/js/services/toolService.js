var ToolService = angular.module('ToolService', []).factory('tools', ['$http', function($http) {

    return {
        // call to get all tools
        get : function() {
            return $http.get('/api/tools');
        },
        
        //get tool for the selected id
        getone: function(id){
			return $http.get('/api/tools/'+id);
		},
         
		//update the selected tool id row.
		//this data is formData in read.html
		update: function(id, data){
			return $http.put('/api/tools/'+id,data);
			
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