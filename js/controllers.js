angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      // You can get our Auth0 NodeJS seed project to host
      // the secured API from here: https://auth0.com/docs/quickstart/backend/nodejs/
      url: 'http://localhost:3001/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("We got the secured data successfully");
    }, function() {
      alert("Please download the API seed so that you can call it.");
    });
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
