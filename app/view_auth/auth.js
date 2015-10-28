'use strict';

angular.module('myApp.auth', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('auth', {
    url: '/auth',
    data: {
        permissions: {
          except: ['isloggedin'],
          redirectTo: 'jokes'
        }
      },
    views: {
      'jokesContent': {
        templateUrl: "view_auth/auth.html",
    	controller: 'AuthCtrl as auth'
      }
    }
  })
}])

.controller('AuthCtrl', ['$auth', '$state', '$http', '$rootScope', function($auth, $state, $http, $rootScope) {

      var jk = this;

        jk.loginError = false;
        jk.loginErrorText;

        jk.login = function() {

            var credentials = {
                email: jk.email,
                password: jk.password
            }

            $auth.login(credentials).then(function() {
                // Return an $http request for the authenticated user
                $http.get('http://localhost:8000/api/authenticate/user').success(function(response){
                    // Stringify the retured data
                    var user = JSON.stringify(response.user);

                    // Set the stringified user data into local storage
                    localStorage.setItem('user', user);

                    // Getting current user data from local storage
                    $rootScope.currentUser = response.user;
                   
                    $state.go('jokes');
                })
                .error(function(){
                    jk.loginError = true;
                    jk.loginErrorText = error.data.error;
                    console.log(jk.loginErrorText);
                })
            });
        }

}]);