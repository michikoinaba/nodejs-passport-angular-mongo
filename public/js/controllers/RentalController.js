
/**********************************************************************
 * Rent controller
 **********************************************************************/
app.controller('RentCtrl',['$scope','$rootScope','$http','$route','tools', function($scope, $rootScope,$http,$route,tools ) {
//app.controller('RentCtrl', function($scope, $rootScope, $http, $location,tools) {
	// This object will be filled by the form
	  $scope.tool = {};
	  $rootScope.selected_id='';
	
	  
	  tools.get() //tools is the table name.  populate all tools from the tools table
		.success(function(data) {	
			//console.log(JSON.stringify(data));
			$scope.tools = data;
			
		});
	
	  //select button function
	 
		$scope.select = function(id){
			
			console.log('id '+id);
			 //$scope.formData.tool_id = id;
			//add the selected tool id in the url
			// $location.path('/select/' + id+'/0')
		};//$scope.select = function(id){
		
}]);