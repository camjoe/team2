'use strict';

angular.module('register')
  .controller('RegisterController', ['$scope','$rootScope','$location', 'AuthService',function($scope,$rootScope,$location, AuthService){
  		$scope.user = {email: '', password: '', company_name: '', company_phone_number: ''};
      $scope.number='';
      $scope.pass = '';
      $scope.err=false;
      $scope.check = false;
      $scope.errorMessage='';
  		$scope.reg = function(){ 
        $scope.user.company_phone_number = '';    
            
        //making sure the number is not null before calling toString method
        if($scope.number != null){
            console.log(typeof $scope.user.company_phone_number);
            $scope.user.company_phone_number = $scope.number.toString();
        }
            
        //Email, password, company name, or phone fields are empty
        if($scope.user.email=='' || $scope.user.password=='' || $scope.user.company_name=='' || 
            $scope.user.company_phone_number==''){
            $scope.errorMessage='Please provide company name, password, phone, and email.';
        }
        //Passwords differ
        else if($scope.pass!=$scope.user.password){
          $scope.errorMessage='Please make sure your passwords match';
          return;
        }
        //Password not 4 characters or more
        else if($scope.pass.length<4){
          $scope.errorMessage='Password must be at least 4 characters';
          return;
        }
            
        //Phone number must be 10-11 numbers
        else if($scope.user.company_phone_number.length!=10 && $scope.user.company_phone_number.length!=11)
        {
            $scope.errorMessage='Phone number should be 10-11 numbers long.';
            return;
        }
            
        //Did not agree to the terms
        else if(!($scope.check)) {
          $scope.errorMessage='You must agree to the terms and conditions';
          return;
        }
        else{
  		    AuthService.reg($scope.user)
          //when the API call was a success
      	  .success(function(data){
          $rootScope.token = data.token;
           $rootScope.admin_id = data.admin_id;
            console.log(data);
          $location.path('/thankyou');
          return data;
      	 })
      	 .error(function(err){
            $scope.errorMessage = 'You have already created an account';
       	  	return err;
     	  });
      }
        

  		};
  }]);
