'use strict';

/*******************************************************************************
 * Angular Application
 ******************************************************************************/
var app = angular.module('app',
		[ 'ToolService','UserService','ngResource', 'ngRoute', 'ngCookies', 'ui.bootstrap' ]).config(
		function($routeProvider, $locationProvider, $httpProvider) {

			// ================================================
			// Check if the user is connected
			// ================================================
			var checkLoggedin = function($q, $timeout, $http, $location,
					$rootScope) {
				// Initialize a new promise
				var deferred = $q.defer();

				// Make an AJAX call to check if the user is logged in
				$http.get('/loggedin').success(function(user) {

				
					// Authenticated
					if (user !== '0') {
						/* $timeout(deferred.resolve, 0); */
						deferred.resolve();
						$rootScope.username = user.username;
						$rootScope.userid = user._id;
						
						// console.log('user '+$rootScope.userid);
						// Not Authenticated
					} else {
						// $rootScope.message = 'You need to log in.';
						// $timeout(function(){deferred.reject();}, 0);
						deferred.reject();
						$location.url('/login');
					}
				});

				return deferred.promise;
			};
			// ================================================

			// ================================================
			// Add an interceptor for AJAX errors
			// ================================================
			$httpProvider.interceptors.push(function($q, $location) {
				return {
					response : function(response) {
						// do something on success
						return response;
					},
					responseError : function(response) {
						if (response.status === 401){
							
							$location.url('/login');
						}
							
						return $q.reject(response);
					}
				};
			});
			// ================================================

			// ================================================
			// Define all the routes
			// ================================================

			$routeProvider.when('/', {
				templateUrl : '/views/main.html'
			}).when('/home', {
				templateUrl : 'views/home.html',
				controller : 'HomeCtrl',
				resolve : {// check the user's login status
					loggedin : checkLoggedin
				}
			}).when('/login', {
				templateUrl : 'views/login.html',
				controller : 'loginCtrl',
				loggedin : checkLoggedin
			})

			.when('/signup', {
				templateUrl : 'views/signup.html',
				controller : 'SignupCtrl'
			})
			 .when('/rent', {
	        templateUrl: 'views/rent.html',
	        controller: 'RentCtrl',
	        resolve: {////check the user's login status
	            loggedin: checkLoggedin
	          }
	      })
		   .when('/history', {
	        templateUrl: 'views/rentalhistory.html',
	        controller: 'HistoryCtrl',
	        resolve: {////check the user's login status
	            loggedin: checkLoggedin
	          }
	      })
	       .when('/payment', {
	        templateUrl: 'views/payment.html',
	        controller: 'PaymentCtrl',
	        resolve: {////check the user's login status
	            loggedin: checkLoggedin
	          }
	      })
	        
		}) // end of config()
		.run(function($rootScope, $http) {
			$rootScope.message = '';
		
			// Logout function is available in any pages
			$rootScope.logout = function() {
				$scope.message = 'Logged out.';
				$http.post('/logout');
			};
		});