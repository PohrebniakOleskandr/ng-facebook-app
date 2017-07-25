'use strict';

angular.module('ngSocial.facebook', ['ngRoute','ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('450853485276464');
  $facebookProvider.setPermissions("email","public_profile","user_posts","publish_actions","user_photos");  
})   

.run( function( $rootScope ) {
     (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})


.controller('FacebookCtrl', ['$scope', '$facebook', function($scope,$facebook) {

    $scope.isLoggedIn = false;
    $scope.login = function(){
        $facebook.login().then(function(){
           $scope.isLoggedIn = true;
           refresh();
        });
    }

    $scope.logout = function(){
        $facebook.logout().then(function(){
           $scope.isLoggedIn = false;
           refresh();
        });
    }
   
    function refresh(){
        $facebook.api('/me?fields=first_name, last_name, picture, email', function(response) {
            $scope.welcomeMsg = 'Welcome '+response.name;
            $scope.isLoggedIn = true;
            console.log(response);
        }, function(error){
            $scope.welcomeMsg = 'Please, log in';
        });
    }

     refresh();
}]);


/*


down vote
$facebookapi('/me?fields=first_name, last_name, picture, email', function(response) {
    $scope.welcomeMsg = 'Welcome '+response.name;
    $scope.isLoggedIn = true;
    console.log(response);
}, function(error){
    $scope.welcomeMsg = 'Please, log in';
});


        $facebook
            .api('/me?fields=id,name,email')
            .then(function(response){
            $scope.welcomeMsg = 'Welcome '+response.name;
            $scope.isLoggedIn = true;
            $scope.userInfo = response;
            console.log('Change is: ');
            console.log( $scope.userInfo);
        },function(error){
            $scope.welcomeMsg = 'Please, log in';
        });

*/