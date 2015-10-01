'use strict';
//---------------
// Controllers
//---------------

babyApp.controller('MainCtrl', ['$scope', 'MainService', '$location', '$http', '$q', '$timeout', '$modal', '$log', '$window', function ($scope, MainService, $location, $http, $q, $timeout, $modal, $log, $window) {
    var fs = MainService.fsClient();

    $scope.contactName = 'User';
    $scope.loggedIn = false;
    $scope.loadingAncestors = false;
    $scope.ancestorsList = [];
    $scope.ancestorsLoaded = false;

    $scope.loginUser = function () {
        $scope.loadingAncestors = true;
        fs.getAccessToken().then(function (accessToken) {
            fs.getCurrentUser().then(function (response) {
                $scope.loggedIn = true;

                var currentUser = response.getUser();
                $scope.contactName = currentUser.contactName;
                $scope.loadingAncestors = true;

                fs.getAncestry(currentUser.personId, {
                    generations: 8,
                    personDetails: true,
                    marriageDetails: true,
                    descendants: true
                }).then(function (response) {
                    $scope.loadingAncestors = false;
                    $scope.ancestorsList = MainService.buildAncestors(response.getPersons());
                    $scope.ancestorsLoaded = true;
                });
            });
        });
    };

    $scope.logoutUser = function () {
        fs.invalidateAccessToken();
        $window.location.reload();
    };
    /*
     $scope.buildAll = function(givenName){
     MainService.buildAllMemories(givenName).then(function(data){

     });
     }*/
    // Actions
    $scope.openNamesModal = function (givenName) {
        // for (var i = 0; i < $scope.ancestorsList[givenName].persons.length; i++){
        //   var person = $scope.ancestorsList[givenName].persons[i];
        //   // fs.getPersonMemoriesQuery(person.id).then(function (response) {
        //   //   var memories = response.getMemories();
        //   //   // MainService.buildAllMemories(givenName, person, memories);
        //   // });
        // }

        // MainService.buildAllMemories(givenName);

        /*fs.getPersonMemoriesQuery(person.id).then(function (response) {
         var memories = response.getMemories();
         });*/

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/static/app/html/names_modal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                firstName: function () {
                    return givenName;
                },
                items: function () {
                    return $scope.ancestorsList[givenName].persons;
                },
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.showAboutModal = function(){
        var modalInstance = $modal.open({
            templateUrl : '/static/app/html/about_modal.html',
            controller : 'AboutModalCtrl',
        });

        modalInstance.result.then(function(data) {
            $scope.name = data;
        });
    };


}]);

babyApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, MainService, items, firstName) {
    var fs = MainService.fsClient();
    $scope.items = items;             // List of persons
    $scope.ancestors = MainService.ancestors();

    // CAROUSEL
    $scope.myInterval = 10000;
    $scope.noWrapSlides = false;

    $scope.getMemories = function (item, arrayIndex) {
        if (!item.memoriesLoaded) {

            var person = item.fsObj;
            fs.getPersonMemoriesQuery(person.id).then(function (response) {
                var memories = response.getMemories();
                MainService.buildMemories(firstName, arrayIndex, memories);
                console.log("GET MEMORIES: " + $scope.items);
            });

            var defaultPortrait = person.$getDisplayGender() == 'Male' ?
                'http://babyancestry.com/static/app/img/browsers/Male-avatar.png' :
                'http://babyancestry.com/static/app/img/browsers/Female-avatar.png';
            fs.getPersonPortraitUrl(person.id, {
                default: defaultPortrait,
                followRedirect: true,
            }).then(function (response) {
                if (response) {
                    MainService.buildPortrait(firstName, arrayIndex, response);
                }
                console.log("PORTRAIT: " + response);
            });

            item.memoriesLoaded = true;
        }
    };


    $scope.personRelation = function (item) {
        // Get the person's relation using the Ahnentafel method:
        // https://en.wikipedia.org/wiki/Ahnentafel
        var order = Math.floor(item.$getAscendancyNumber());

        var gender = item.$getDisplayGender();
        var name = item.$getGivenName();
        var sentence = "";
        var genderEq;

        if (gender == 'Male')
            genderEq = 'father';
        else
            genderEq = 'mother';

        if (order != undefined) {

            // The log(2) of the Ahnentafel method gives the number of generations back
            // the ancestor is.
            var generation = Math.floor(Math.log(order) / Math.log(2)); // log base 2

            if (generation == 0) {
                sentence = "This is you!";
            } else if (generation == 1) {
                sentence = name + " is your " + genderEq + "!";
            } else if (generation == 2) {
                sentence = name + " is your grand" + genderEq;
            }else if (generation == 3) {
                sentence = name + " is your great grand" + genderEq;
            } else if (generation >= 4) {
                var greats = generation - 2;
                sentence = name + " is your (" + greats + "x) great grand" + genderEq;
            }
            return sentence
        } else {
            return "";
        }
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.oneAtATime = true;
    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    // Send off the requests to load all the memories
    for(var i=0; i<items.length; i++){
        $scope.getMemories(items[i], i);
    }

});


babyApp.controller('AboutModalCtrl', function($scope, $modalInstance, $modal) {

});
