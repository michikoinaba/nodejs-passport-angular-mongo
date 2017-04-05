	    
app.controller('AddressModalController',['$scope', '$rootScope', '$http', '$uibModalInstance','$routeParams','$timeout','users',		        
               function ( $scope, $rootScope, $http, $uibModalInstance,$routeParams,$timeout,users) {
							  	
					$scope.showErrorAlert=false;	
					$scope.showSuccessAlert=false;
					$scope.showModalErrormsg=false;
					
					// get this logged in user's info and get address info from the
					// users collection
					users.getUser($rootScope.userid)
					.success(function(data) {	
							
						//console.log(JSON.stringify(data.address));
						var addresses = data.address;
						var index=0;
				    	Object.keys(addresses).forEach(function (key) {
				    		
				    		if(addresses[key]['_id']== $rootScope.adddress_id  ){
				    			//console.log(' key '+addresses[key]['_id'] + 'value '+$rootScope.adddress_id);
				    			$scope.removeItemaddressID = addresses[key]['_id'];
				    			$scope.removeItemstreet1 = addresses[key]['street1'];
				    			$scope.removeItemstreet2 = addresses[key]['street2'];
				    			$scope.removeItemcity = addresses[key]['city'];
				    			$scope.removeItemstate = addresses[key]['state'];
				    			$scope.removeItemzip = addresses[key]['zip'];
				    			
				    		}
				    		
				    	});
				    	
						
						// assign the address array
						$scope.removeItemfirst_name = data.first_name;
						$scope.removeItemlast_name = data.last_name;
						
					}). 
					error(function(){
						$scope.ModalErrormsg = "Error occured. Please press No button.";
						$scope.showModalErrormsg=true;
				});
					
					
				//remove a selected address	
				$scope.remove = function () {
				
					//console.log('remove address _id '+$rootScope.adddress_id+'remove user id '+$rootScope.userid);
					
					users.deleteAddress($rootScope.userid,$rootScope.adddress_id)
					.success(function(data) {	
						
						//successfully delete the row in the database. 
						$rootScope.successTextAlert = "Selected address is deleted";
						$rootScope.showSuccessAlert = true;
											
						$timeout(function(){
							$rootScope.showSuccessAlert = false;
						}, 10000);
											
						//close the modal box
						$uibModalInstance.close($rootScope.adddress_id);  
						//set the address_id to null for next time.
						$rootScope.adddress_id ='';		
					}). 
					error(function(){
						$scope.ModalErrormsg = "Error occured. Deletion failed.";
						$scope.showModalErrormsg=true;
				});
					
				}//	$scope.remove = function () {
				/*	///
				   // selected payment_id to delete
					var customer_id =$rootScope.removeCustomer_id;
								
					// populate the selected payment row from the payments
					// table.
					$http.get('/selectedaddress/' + customer_id, {params: {id: customer_id}
								
					}).success(function(data){
									
						// successfully delete the row in the database.
						if(data.status==0){
										
							// use this removeItem to output the selected
							// payment data in the modal
							$scope.removeItem = data.row[0];
							  		   
						} // if(data.status==0){
						else{
										
							$scope.ModalErrormsg =  "Error occured. Please press No button.";
							$scope.showModalErrormsg=true;
						}
							  		  
					}).
					error(function(){
							$scope.ModalErrormsg = "Error occured. Please press No button.";
							$scope.showModalErrormsg=true;
					});
						    	
							  
				    $scope.headerTitle = 'Remove Payment Method';
				    $scope.messag= 'Are you sure to remove?';
							    
				    // yes button is clicked. now delete the selected contact id
				   $scope.remove = function () {
							   
							    		
					$http.delete('/address/' + customer_id, {params: {id: customer_id}
									
					}).success(function(data){
										
						// console.log('payment deletion success
						// '+data.message);
						// successfully delete the row in the database.
						if(data.status==0){
							$rootScope.successTextAlert = "Selected address is deleted";
							$rootScope.showSuccessAlert = true;
											
							$timeout(function(){
								$rootScope.showSuccessAlert = false;
							}, 10000);
											
							// close the modal box
							 $uibModalInstance.close(customer_id);  
								  		   
						 } // if(data.status==0){
						else{
											
							$scope.ModalErrormsg =  "Error occured. Please press No button.";
							$scope.showModalErrormsg=true;
										   
						}// else
										
								  		 
						}).
						error(function(){
							$scope.ModalErrormsg =  "Error occured. Please press No button.";
							$scope.showModalErrormsg=true;
						});
							    	
							    
					 };// $scope.remove = function () {
			*/
					$scope.cancel = function () {
						// $scope.showModal=false;
						 $uibModalInstance.dismiss('cancel');
					};
			}]); 