// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angularLocalStorage', 'ngCookies'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .constant('constants', {API_ENDPOINT:"http://neutrinos.biz/ionicDrupal/api/",
  NODE_ENDPOINT:"node.json",
  FILE_ENDPOINT:"file.json",
  LOGIN_ENDPOINT:"user/login",
  LOGOUT_ENDPOINT:"user/logout",
  REGISTER_ENDPOINT:"user/register",
  REQUEST_PASSWORD_ENDPOINT:"user/request_new_password.json",
  SESSION_TOKEN_ENDPOINT:"http://neutrinos.biz/ionicDrupal/services/session/token",
  ACCOUNT_LOCAL_STORAGE_PREFIX  :"account_"})
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
      .state('login', {
        url: "/",
        templateUrl: "templates/login.html",
        controller: "LoginController as loginVC"
      })
      .state('logout', {
        url: "/logout",
        templateUrl: "templates/logout.html",
        controller: "LogoutController as logoutVC"
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
  }])
  // Login controller
  .controller('LoginController', ['User', 'API', '$state', '$cookies', function(User, API, $state, $cookies){
    this.user = {};
    this.reponse = '';
    this.logged = false;
    var self = this;
    this.login = function() {
      API.getSessionToken().then(function(token){
        console.log(self.user);

        User.login(self.user.username,self.user.password,token)
          .then(function(data){
            self.response = JSON.stringify(data);
            self.logged = true;
            //$state.go('logout');
          },function(error){
            // on error show error message to user
            self.response = JSON.stringify(error);
            //$scope.errorMessage = error[0];
          });
      });
    }

    this.logout = function() {
      console.log($cookies['token']);
      User.logout($cookies.token).then(function(data){
        self.response = JSON.stringify(data);
        //$state.go("login");
        self.logged = false;
      },function(error){
        self.response = JSON.stringify(data);
        // on error show error message to user
      });
      // API.getSessionToken().then(function(data){
      //
      // });
    }
}])
  .controller('LogoutController', ['User', 'API', '$state', 'storage', function(User, API, $state, storage){
    this.reponse = '';
    var self = this;
    this.logout = function() {
      API.getSessionToken().then(function(data){
        User.logout(data).then(function(data){
          self.response = JSON.stringify(data);
          $state.go("login");
        },function(error){
          self.response = JSON.stringify(data);
          // on error show error message to user
        });
      });
    }
  }]);
