var main = angular.module('app.main', ['ui.router','ionic']);


main.filter('filterMenue', function () {
    return function (input,Filter) {

        if (Filter== "" ){
            return input;
        }

        for(var i in input){

            // console.log(input[i]);
            // console.log(Filter);

            if(input[i].itemname ==Filter){

                return input[i].submenue;
            }
        }



    };
});

main.filter('DateTime', function () {
    return function (input) {

        if (typeof input == "undefined" ){
            return input;
        }


        return moment(input).format("DD.MM.YYYY HH:mm");
    };
});

main.filter('replaceSize', function () {
    return function (input) {


        console.log(input);

        if (typeof input == "undefined" ){
            return input;
        }


        return input.replace("sz=50", 'sz=128');
    };
});

main.controller('mainCtrl', function ($scope,$log, $location, $ionicSideMenuDelegate,$rootScope,$ionicPopup,$timeout, $ionicModal,$ionicLoading,$filter,store) {


    $rootScope.menueList = [];
    $rootScope.FilterMenue = "";

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.toggleRight = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.init = function(){

        $rootScope.profile = store.get('profile');
        $rootScope.dbuser = store.get('profile').obj;
        $rootScope.backgroundImageURL = store.get('backgroundimage');




    }


    $scope.setMenItem = function(arrlength,ItemName,Link){

        if(arrlength == 0){

            $location.path(Link);
            $rootScope.FilterMenue = "";
            $rootScope.appTitle = ItemName;
            $ionicSideMenuDelegate.toggleLeft();
            //  window.open("https://localhost/app/#/site/development/menuemanagement" , "_self");
            $timeout(function(){
                $scope.$apply();
            });

        }else{

            $rootScope.FilterMenue = ItemName;
        }
    }





});