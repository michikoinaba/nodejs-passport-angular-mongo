	    
app.controller('AddressModalController',['$scope', '$rootScope', '$http', '$uibModalInstance','$routeParams','$timeout','users',		        
               function ( $scope, $rootScope, $http, $uibModalInstance,$routeParams,$timeout,users) {
							  	
					$scope.showErrorAlert=false;	
					$scope.showSuccessAlert=false;
					$scope.showModalErrormsg=false;
					$scope.removeAddress={};
					$scope.removeItemfirst_name='';
					$scope.removeItemlast_name='';
					
					// get this logged in user's info and get address info from the
					// users collection
					users.getUser($rootScope.userid)
					.success(function(userinfo) {	
							
						//console.log('addressModal ');
						//console.log(JSON.stringify(userinfo.first_name));
						// assign the address array
						$scope.removeItemfirst_name = userinfo.first_name;
						$scope.removeItemlast_name = userinfo.last_name;
						
					}). 
					error(function(){
						$scope.ModalErrormsg = "Error occured. Please press No button.";
						$scope.showModalErrormsg=true;
				});
					
					
					
					users.getUserAddressInfo($rootScope.userid, $rootScope.address_id)
					.success(function(data) {	
							
						//console.log('addressModal ');
						//console.log(JSON.stringify(data.address));
						$scope.removeAddress = data.address;
						
					}). 
					error(function(){
						$scope.ModalErrormsg = "Error occured. Please press No button.";
						$scope.showModalErrormsg=true;
				});
					
					
				//remove a selected address	
				$scope.remove = function () {
				
					//console.log('remove address _id '+$rootScope.adddress_id+'remove user id '+$rootScope.userid);
					
					users.deleteAddress($rootScope.userid,$rootScope.address_id)
					.success(function(data) {	
						
						//successfully delete the row in the database. 
						$rootScope.successTextAlert = "Selected address is deleted";
						$rootScope.showSuccessAlert = true;
					
						
						$timeout(function(){
							$rootScope.showSuccessAlert = false;
						}, 10000);
											
						//close the modal box
						$uibModalInstance.close($rootScope.address_id);  
						//set the address_id to null for next time.
						$rootScope.address_id ='';		
					}). 
					error(function(){
						$scope.ModalErrormsg = "Error occured. Deletion failed.";
						$scope.showModalErrormsg=true;
				});
					
				}//	$scope.remove = function () {
				
				$scope.cancel = function () {
						// $scope.showModal=false;
						 $uibModalInstance.dismiss('cancel');
					};
			}]); 