
/*******************************************************************************
 * Rent controller
 ******************************************************************************/
app.controller('RentCtrl',['$scope','$rootScope','$http','$route','$location','$locale','$uibModal','$timeout','tools','users', 
               function($scope, $rootScope,$http,$route,$location,$locale,$uibModal,$timeout,tools ,users) {

	// This object will be filled by the form
	  $scope.tool = '';
	  $rootScope.selected_id='';
	  $scope.showTools=true;
	  $scope.showAddressList=false;
	  $scope.showAddressForm=false;
	  $scope.showPaymentForm=false;
	  $scope.showPaymentsRecords=false;
	  $scope.showSummary=false;
	  $rootScope.selected_address_id='';
	  $rootScope.tool_id='';
	  $rootScope.selected_payment_id='';
	  
	  //credit card form variables
	  $scope.ccinfo = {};
	  $scope.currentYear = new Date().getFullYear();
	  $scope.currentMonth = new Date().getMonth() + 1;
	  $scope.months = $locale.DATETIME_FORMATS.MONTH;
	  $scope.ccinfo = {type:undefined};
    		
	  console.log('rental userid '+$rootScope.userid);
	  tools.get() // tools is the table name. populate all tools from the tools collection			
		.success(function(data) {	
			// console.log(JSON.stringify(data));
			$scope.tools = data;
			
		});
	
	  // select button function to select a tool_id
	 
		$scope.select = function(tool_id){
			
			//console.log('tool id '+tool_id);
			$rootScope.tool_id=tool_id;
			// get this logged in user's info and get address info from the
			// users collection
			users.getUser($rootScope.userid)
			.success(function(data) {	
					
				//console.log(JSON.stringify(data.address));
				// if there is no addrerss in the users collection, show the add
				// address form page.
				if(data.address==''){
					
					$scope.showTools=false;
					$scope.showAddressForm=true;
					
					//$scope.tool_id= $rootScope.tool_id;
					//$scope.user_id = $rootScope.userid;
				
				}else{
					
					// there are existing addresses, so show the address list.
					$scope.showTools=false;
					$scope.showAddressList=true;
					
					// assign the address array
					$scope.items = data.address;
					$scope.first_name = data.first_name;
					$scope.last_name = data.last_name;
					
				}// else
			});
			
			
		};// $scope.select = function(id){
		
		
		//Rental form adding a new address and submit button is clicked.
		  //submit button is clicked. save new address data into the users collection.
		 $scope.formSubmit = function(isValid){
			//console.log('form '+$scope.formData.first_name);
			 if (isValid) {
				
				 $scope.formData.tool_id= $rootScope.tool_id;
				
				
			  users.updateAddress($rootScope.userid, $scope.formData)
			  .success(function(data) {	
				 
				 // console.log(JSON.stringify(data));
				//successfully delete the row in the database. 
				$rootScope.successTextAlert = "New Address Added";
				$rootScope.showSuccessAlert = true;
				
				$scope.showAddressList=true;
				$scope.showAddressForm=false;
				
				 //populate this users data and how the adress list
				users.getUser($rootScope.userid)
					.success(function(data) {	
						// assign the address array
						$scope.items = data.address;
						$scope.first_name = data.first_name;
						$scope.last_name = data.last_name;
					});	
				 
											
				$timeout(function(){
					$rootScope.showSuccessAlert = false;
					}, 10000);
											
						
				}). 
				error(function(){
					$scope.ModalErrormsg = "Error occured. Could not add a new address.";
					$scope.showModalErrormsg=true;
				});
			 
			 }//  if (isValid) {
			
		 }// $scope.formSubmit = function(){
		
		 //cancel the address form.
		 $scope.AddressFormcancel = function(){
			 
			 //hide the address form and show the address list
			 $scope.showAddressList=true;
			 $scope.showAddressForm=false;
			 
			 //populate this users data and how the adress list
			users.getUser($rootScope.userid)
				.success(function(data) {	
					// assign the address array
					$scope.items = data.address;
					$scope.first_name = data.first_name;
					$scope.last_name = data.last_name;
				});	
			 
		
			 
		 }// $scope.AddressFormcancel = function(){
		 
		 // open the modal form to confirm selected address deletion///////////////////////////////
	    $scope.modalConfirm = function (address_id ) {
	    	$scope.showAddressModal=true;
	    	
	    	$rootScope.address_id = address_id;
	    	//console.log(' modalconfirm address id '+address_id);
	    	 var modalInstance = $uibModal.open({
	             // size: size,
	              animation: false,
	              backdrop: 'static',
	              templateUrl : 'templates/addressmodal.html',
	              controller: 'AddressModalController',
	          
	          });
	    	 
	    	  // this function gets excuted after Yes button is clicked and
				// delete the selected contact id.
	    	  // show a new list of contact
	         modalInstance.result.then(function (response) {
	        	 // console.log('modalInstance '+response);
	        	 $rootScope.showAddressModal=false;
	        	 
	        	// get this logged in user's info and get address info from the
	 			// users collection
	 			users.getUser($rootScope.userid)
	 			.success(function(data) {	
	 					
	 				//console.log(JSON.stringify(data.address));
	 			
	 				// there are existing addresses, so show the address list.
	 				$scope.showTools=false;
	 				$scope.showAddressList=true;
	 					
	 				// assign the address array
	 				$scope.items = data.address;
	 				$scope.first_name = data.first_name;
	 				$scope.last_name = data.last_name;
	 					
	 				
	 			});
		  		  
	          }, function () {
	        	  // if a user cancel to remove the selected contact, log it.
	              console.log('Modal dismissed at: ' + new Date());
	          });
	    	
	    };// $scope.modalConfirm = function ( ) {
	    
	    //Add new address button is clicked to add a new address
	    $scope.addNewAddress = function(){
	    	
	    	//console.log('tool id'+$rootScope.tool_id);
	    	//console.log('userid '+$rootScope.userid);
		
	    	$scope.showAddressList=false;
	    	$scope.showTools=false;
	    	$scope.showAddressForm=true;
	    	
	    }// $scope.addNewAddress = function(){
	    
	      //user click on the "Use" button to selected this address
	    $scope.selectAddress = function(address_id){
	    	
	    	$rootScope.selected_address_id = address_id;
	    	//check if there are any existing payments info
	    	users.getUser($rootScope.userid)
			.success(function(data) {	
					
				//console.log(JSON.stringify(data.address));
				// if there is no payments in the users collection, show the add
				// payment form page.
				if(data.payments==''){
					
					$scope.showPaymentForm=true;
			    	$scope.showAddressList=false;
			    	
			    	//payment form logic here
			    	
			    	$rootScope.successTextAlert = "";
			    	$rootScope.showSuccessAlert = false;
			    	  
			    
				}else{
					
					// there are existing payments, so show the address list.
					$scope.showPaymentsRecords=true;
					$scope.showTools=false;
					$scope.showAddressList=false;
					
					// assign the payments array
					$scope.items = data.payments;
					
					
				}// else
		
			});

	    }// $scope.selectAddress(address_id){
	    
	    
	    //add a new payment method
	    $scope.addNewPayment = function(){
	    	
	    	$scope.showPaymentForm=true;
	    	$scope.showPaymentsRecords=false;
	    	
	    }//  $scope.addNewPayment = function(){
	    
	 	//Payment form submit button is clicked 
   	 	$scope.paymentSave = function(ccinfo){
   			
   		//pass validations, insert the new payment data into the payments table.
   	    if ($scope.paymentForm.$valid){
   	        //console.log(ccinfo) // valid data saving stuff here
   	        $scope.ccinfo = ccinfo;
   	        $scope.ccinfo.user_id = $rootScope.userid;
   	        
   	    	// get this logged in user's info and update the payment info in the
	 			// users collection
	 			users.updatePayment($rootScope.userid, ccinfo)
	 			.success(function(data) {	
	 					
	 				users.getUser($rootScope.userid)
	 				.success(function(payments) {	
	 						
	 						
	 					// there are existing addresses, so show the address list.
	 					$scope.showPaymentForm=false;
	 					$scope.showPaymentsRecords=true;
	 						
	 					// assign the address array
	 					$scope.items = data.payments;
	 			
	 				});
	 			
	 				
	 			});
   	
   	      }  //if ($scope.paymentForm.$valid){
   	  
   		}//	$scope.paymentSave = function(ccinfo){
			
   	 	//the user confirm the rental info.  now isert the info into rentedtools array in the users collection
   	 	$scope.rentalConfirm=function(){
   	 	  
   	 		var rentedtools_data = {"payment_id":  $rootScope.selected_payment_id, "tool_id":$rootScope.tool_id, "address_id":$rootScope.selected_address_id,
   	 				"rented_date" : new Date()};
		   //update the rented tools info into the users collection
		    users.updateRentedtools($rootScope.userid,rentedtools_data)
			.success(function(data) {	
				
				console.log(JSON.stringify(rentedtools_data));
				$scope.showConfirmation=true;
				$scope.showSummary=false;
			});
   	 		
   	 	}//$scope.rentalConfirm=function(){
   	 	
   	 	//cancel the tool rental summary
   	 	$scope.rentalCancel=function(){
   	 		
   	 		$scope.showSummary=false;
   	 		
	   	 	users.getUser($rootScope.userid)
			.success(function(data) {	
					
				// there are existing payments, so show the address list.
				$scope.showPaymentsRecords=true;
				$scope.showTools=false;
				$scope.showAddressList=false;
					
				// assign the payments array
				$scope.items = data.payments;
					
			});
   	 		
   	 		
   	 	
   	 	}//$scope.rentalCancel=function(){
   	 	
	    //cancel the payment form
	    $scope.PaymentFormcancel=function(){
	    	
	    	$scope.showPaymentForm=false;
	    	$scope.showPaymentsRecords=true;
	    	
	    }//  $scope.PaymentFormcancel=function(){
	    
		 // open the modal form to confirm selected payment deletion///////////////////////////////
	    $scope.modalConfirmpayment = function (payment_id ) {
	    	$scope.showModal=true;
	    	
	    	$rootScope.payment_id = payment_id;
	    	//console.log('address id '+address_id);
	    	 var modalInstance = $uibModal.open({
	             // size: size,
	              animation: false,
	              backdrop: 'static',
	              templateUrl : 'templates/modal.html',
	              controller: 'PaymentModalController',
	          
	          });
	    	 
	    	  // this function gets excuted after Yes button is clicked and
				// delete the selected contact id.
	    	  // show a new list of contact
	         modalInstance.result.then(function (response) {
	        	 // console.log('modalInstance '+response);
	        	 $rootScope.showModal=false;
	        	 
	        	// get this logged in user's info and get payments info from the
	 			// users collection
	 			users.getUser($rootScope.userid)
	 			.success(function(data) {	
	 					
	 				//console.log(JSON.stringify(data.payments));
	 			
	 				// there are existing addresses, so show the address list.
	 				$scope.showTools=false;
	 				$scope.showAddressList=false;
	 				$scope.showPaymentsRecords=true;
				
	 				// assign the address array
	 				$scope.items = data.payments;
	 				
	 				
	 			});
		  		  
	          }, function () {
	        	  // if a user cancel to remove the selected contact, log it.
	              console.log('Modal dismissed at: ' + new Date());
	          });
	    	
	    };// $scope.modalConfirm = function ( ) {
	    
	    //select a payment method
	   $scope.selectPayment = function(payment_id){
		  // console.log('payment id '+payment_id);
		   $rootScope.selected_payment_id = payment_id;
		   
		   if(($rootScope.selected_address_id !='')&&($rootScope.tool_id !='')){
			   
			   //insert the payment_id, address_id and tool_id in the users collection.
			   $scope.showSummary=true;
			   $scope.showPaymentsRecords=false;
			   $scope.tool='';
			   $scope.address='';
			   $scope.payment='';
			   $scope.items={};
		
					
				tools.getone($rootScope.tool_id)
				.success(function(selected_tool){
					
					$scope.tool = selected_tool;
						
					//calculate the return date
					var today = new Date();
					var dd = today.getDate()+7;
						
					var mm = today.getMonth()+1; //January is 0!
					var yyyy = today.getFullYear();
						
					$scope.returnDate = yyyy+'/'+mm+'/'+dd;
				})
				.error(function(){
					console.log('err: cannot populate the tool with id '+$rootScope.tool_id);
				});
					
				users.getUserInfo($rootScope.userid,$rootScope.selected_address_id, $rootScope.selected_payment_id )
				.success(function(userinfo){
						
					$scope.address = userinfo.address;
					$scope.payment = userinfo.payments;
						
		 				//console.log(JSON.stringify(userinfo.payments));
				});
					
		   }//  if(($rootScope.selected_address_id !='')&&($rootScope.tool_id !='')){
		   
	   }//$scope.selectPayment = function(){
}]);



//credit card validations here
app.directive
( 'creditCardType'
, function(){
    var directive =
      { require: 'ngModel'
      , link: function(scope, elm, attrs, ctrl){
          ctrl.$parsers.unshift(function(value){
        	scope.ccinfo.type={}; 
            scope.ccinfo.type =
              (/^5[1-5]/.test(value)) ? "mastercard"
              : (/^4/.test(value)) ? "visa"
              : (/^3[47]/.test(value)) ? 'amex'
              : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'discover'
              : undefined
            ctrl.$setValidity('invalid',!!scope.ccinfo.type)
            return value
          })
        }
      }
    return directive;
    }
);


app.directive
( 'cardExpiration'
, function(){
    var directive =
      { require: 'ngModel'
      , link: function(scope, elm, attrs, ctrl){
    	  scope.$watch('[ccinfo.month,ccinfo.year]',function(value){
            ctrl.$setValidity('invalid',true)
            if ( scope.ccinfo.year == scope.currentYear
                 && scope.ccinfo.month <= scope.currentMonth
               ) {
              ctrl.$setValidity('invalid',false)
            }
            return value
          },true)
        }
      }
    return directive;
    }
);


app.filter
( 'range'
, function() {
    var filter = 
      function(arr, lower, upper) {
        for (var i = lower; i <= upper; i++) arr.push(i)
        return arr;
      }
    return filter;
  }
);

