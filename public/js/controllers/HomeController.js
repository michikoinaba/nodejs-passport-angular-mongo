
/**********************************************************************
 * Home controller
 **********************************************************************/
app.controller('HomeCtrl', function($scope,$rootScope, $http,$location) {
	 
	 $rootScope.tool_id=undefined;
	 $rootScope.user_id=undefined;
	 $rootScope.customer_id=undefined;
	 $rootScope.payment_id=undefined;
	
	//redirect to the rent page
	$scope.rent = function(){
		$location.url('/rent');
	  
	}//
	
	$scope.history = function(){
		$location.url('/history');
	  
	}//
	
	$scope.payment = function(){
		$location.url('/payment');
	  
	}//
	
});
