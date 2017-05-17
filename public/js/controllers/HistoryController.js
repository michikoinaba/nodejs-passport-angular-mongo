
/*******************************************************************************
 * History controller
 ******************************************************************************/
app.controller('HistoryCtrl',['$scope','$rootScope','$http','$route','$location','$locale','$uibModal','$timeout','tools','users', 
      function($scope, $rootScope,$http,$route,$location,$locale,$uibModal,$timeout,tools ,users) {
	
 var rentedtools=[];
 $scope.tools =[];
 $scope.rented_dates={};
 
 $scope.element={};
 
	 //populate this users data and how the adress list
	users.getRentedTools($rootScope.userid)
		.success(function(data) {	
			//console.log( data);
			$scope.tools = data;
		
	})
	.error(function(){
		console.log('Cannot find tools.');
	});
	
if($scope.tools ==''){
		
		$scope.message = 'You have no rented tools'
		
	}
	
}]);