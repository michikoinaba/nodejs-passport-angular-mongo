
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
			//dumpObject(data[0]);
			//console.log(JSON.stringify(data));
			$scope.tools = data;
			
		});
	  /*
	  if($rootScope.tools == undefined){

      //populate the tools data
	   $http.post('/rent', {
	      id: $scope.tool.id,
	      type: $scope.tool.type,
	      name: $scope.tool.name,
	      description: $scope.tool.description,
	      price: $scope.tool.price
	    })
	    .success(function(tool){
	    	//this tools are used in the rent.html to show the tool list.
	    	$rootScope.tools = tool;
	    	//console.log('post $rootScope.tools '+ $rootScope.tools  );
	    })
	    .error(function(){
	      // Error: authentication failed
	    	$scope.errormsg = 'Error occured.';
	      $location.url('/home');
	    });
		  
	  }//  if($rootScope.tools == undefined){
	   	
	*/
		 
		  
	  //select button function
	  /*
		$scope.select = function(id){
			 //$scope.formData.tool_id = id;
			//add the selected tool id in the url
			 $location.path('/select/' + id+'/0')
		};//$scope.select = function(id){
		*/
}]);