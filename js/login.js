angular.module('app.login', [])
    .controller('LoginCtrl', function ($scope, auth, $state, store, $rootScope, $http) {
    function doAuth() {
        auth.signin({
            closable: false,
            // This asks for the refresh token
            // So that the user never has to log in again
            authParams: {
                scope: 'openid offline_access'
            }
        }, function (profile, idToken, accessToken, state, refreshToken) {
            store.set('profile', profile);
            store.set('token', idToken);
            store.set('refreshToken', refreshToken);
            $state.go('tab.dash');
            var GoogleToken = "";
            var photoURL = "";
            for (var t in profile.identities) {
                switch (profile.identities[t].provider) {
                    case "google-oauth2":
                        GoogleToken = profile.identities[t].access_token;
                        break;
                }
            }
            if (GoogleToken != "") {
                $http({
                    method: 'GET',
                    url: ' https://www.googleapis.com/plus/v1/people/me?access_token=' + GoogleToken
                }).then(function successCallback(response) {
                    photoURL = response.data.cover.coverPhoto.url;
                    store.set('backgroundimage', photoURL);
                }, function errorCallback(response) {
                });
            }
        }, function (error) {
            console.log("There was an error logging in", error);
        });
    }
    $scope.$on('$ionic.reconnectScope', function () {
        doAuth();
    });
    doAuth();
});
//# sourceMappingURL=login.js.map