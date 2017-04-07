	    
app.controller('PaymentModalController',['$scope', '$rootScope', '$http', '$uibModalInstance','$routeParams','$timeout','users',		        
               function ( $scope, $rootScope, $http, $uibModalInstance,$routeParams,$timeout,users) {
							  	
					$scope.showErrorAlert=false;	
					$scope.showSuccessAlert=false;
					$scope.showModalErrormsg=false;
					$scope.removePayment={};
						
					// get this logged in user's info and get address info from the
					// users collection
					users.getUserPaymentInfo($rootScope.userid, $rootScope.payment_id)
					.success(function(data) {	
							
						console.log(JSON.stringify(data.payments));
						$scope.removePayment = data.payments;
					 
						
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
				
				$scope.remove=function(){
					
					console.log('selected payment id '+$rootScope.payment_id);
					users.deletePayment($rootScope.userid,$rootScope.payment_id)
					.success(function(data) {	
						
						console.log(data);
						//successfully delete the row in the database. 
						$rootScope.successTextAlert = "Selected payment is deleted";
						$rootScope.showSuccessAlert = true;
						
											
						$timeout(function(){
							$rootScope.showSuccessAlert = false;
						}, 10000);
											
						//close the modal box
						$uibModalInstance.close($rootScope.payment_id);  
						//set the address_id to null for next time.
						$rootScope.payment_id ='';		
					}). 
					error(function(){
						$scope.ModalErrormsg = "Error occured. Deletion failed.";
						$scope.showModalErrormsg=true;
				});
				}//$scope.removePayment=function(){
				
			
					$scope.cancel = function () {
						// $scope.showModal=false;
						 $uibModalInstance.dismiss('cancel');
					};
			}]); 