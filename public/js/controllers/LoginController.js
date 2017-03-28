

//inject the Todo service factory into our controller
app.controller('loginCtrl', function($scope, $rootScope, $http, $location) {
	 // This object will be filled by the form
	  $scope.user = {};

	  // Register the login() function
	  $scope.login = function(){
		  console.log('username '+$scope.user.username);
	    $http.post('/login', {
	      username: $scope.user.username,
	      password: $scope.user.password,
	    })
	    .success(function(user){
	    	
	    	//console.log(JSON.stringify(user));
	    	$rootScope.username=user.username;
	    	$rootScope.userid = user._id;
	    	$location.url('/home');
	    
	    })
	    .error(function(err){
	      // Error: authentication failed
	    	
	    	//$scope.errormsg = 'Authentication failed.';
	    	$scope.errormsg=err;
	    	//console.log('loginCtrl error');
	    	//console.log(JSON.stringify(data));
	    	//console.log(data);
	      
	    });
	  };

});//.controller('
