
/*******************************************************************************
 * Payment controller
 ******************************************************************************/
app.controller('PaymentCtrl',['$scope','$rootScope','$http','$route','$location','$locale','$uibModal','$timeout','tools','users', 
  function($scope, $rootScope,$http,$route,$location,$locale,$uibModal,$timeout,tools ,users) {

	$scope.payments =[];

	 //populate this users data and how the adress list
	users.getPayment($rootScope.userid)
		.success(function(data) {	
		
			$scope.payments = data;
		
	})
	.error(function(){
		console.log('Cannot find tools.');
	});
	
	if($scope.payments ==''){
		
		$scope.message = 'You have no payment methods'
		
	}
}]);