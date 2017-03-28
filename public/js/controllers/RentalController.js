
/*******************************************************************************
 * Rent controller
 ******************************************************************************/
app.controller('RentCtrl',['$scope','$rootScope','$http','$route','$location','$uibModal','tools','users', 
               function($scope, $rootScope,$http,$route,$location,$uibModal,tools ,users) {

	// This object will be filled by the form
	  $scope.tool = {};
	  $rootScope.selected_id='';
	  $scope.showTools=true;
	  $scope.showAddressList=false;
	  $scope.showAddressForm=false;
	  
	  tools.get() // tools is the table name. populate all tools from the
					// tools table
		.success(function(data) {	
			// console.log(JSON.stringify(data));
			$scope.tools = data;
			
		});
	
	  // select button function
	 
		$scope.select = function(id){
			
			console.log('user id '+$rootScope.userid);
			
			// get this logged in user's info and get address info from the
			// users collection
			users.getUser($rootScope.userid)
			.success(function(data) {	
					
				console.log(JSON.stringify(data.info.address));
				// if there is no addrerss in the users collection, show the add
				// address form page.
				if(data.info.address==''){
					
					$scope.showTools=false;
					$scope.showAddressForm=true;
					
				}else{
					
					// there are existing addresses, so show the address list.
					$scope.showTools=false;
					$scope.showAddressList=true;
					
					// assign the address array
					$scope.items = data.info.address;
					$scope.first_name = data.info.first_name;
					$scope.last_name = data.info.last_name;
					
				}// else
					
				
				
			});
			
			
		};// $scope.select = function(id){
		
		
		 // open the modal form///////////////////////////////
	    $scope.modalConfirm = function (address_id ) {
	    	$scope.showModal=true;
	    	
	    	$rootScope.adddress_id = address_id;
	    	console.log('address id '+address_id);
	    	 var modalInstance = $uibModal.open({
	             // size: size,
	              animation: false,
	              backdrop: 'static',
	              templateUrl : 'templates/modal.html',
	             controller: 'AddressModalController',
	          
	          });
	    	 
	    	  // this function gets excuted after Yes button is clicked and
				// delete the selected contact id.
	    	  // show a new list of contact
	         modalInstance.result.then(function (response) {
	        	 // console.log('modalInstance '+response);
	        	 $rootScope.showModal=false;
	        	 
	        	// get all addresses for this user
				// getAlladdresses();
		  		  
	          }, function () {
	        	  // if a user cancel to remove the selected contact, log it.
	              console.log('Modal dismissed at: ' + new Date());
	          });
	    	
	    };// $scope.modalConfirm = function (payment_id ) {
	    
	
}]);