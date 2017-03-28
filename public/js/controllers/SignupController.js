/**********************************************************************
 * Signup controller
 **********************************************************************/
app.controller('SignupCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.signup = function(){
    $http.post('/signup', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
    	
      $rootScope.userid = user._id;
      $location.url('/home');
    })
    .error(function(err){
    	//console.log(JSON.stringify(err));
      // Error: authentication failed
    	$scope.errormsg = err;
      $location.url('/signup');
    });
  };
});