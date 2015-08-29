//---------------
// Controllers
//---------------

babyApp.controller('MainCtrl', ['$scope','MainService', '$location', '$http', '$q', '$timeout','$modal', '$log','$window', function($scope, MainService, $location, $http, $q, $timeout, $modal, $log, $window){
  var fs = MainService.fsClient();    

  $scope.contactName = 'User';
  $scope.loggedIn = false;
  $scope.ancestorsList = [];

  $scope.loginUser = function() {
    fs.getAccessToken().then(function(accessToken) {  
      fs.getCurrentUser().then(function(response) {
        $scope.loggedIn = true;
        
        currentUser = response.getUser();
        $scope.contactName = currentUser.contactName;
        
        fs.getAncestry(currentUser.personId, {
          generations:8,
          personDetails: true,
          marriageDetails: true,
          descendants: true,
        }).then(function(response){
          $scope.ancestorsList = MainService.buildAncestors(response.getPersons());
        });
      });
    });
  };

  $scope.logoutUser = function() {
    fs.invalidateAccessToken();
    $window.location.reload();
  };

  // Actions
  $scope.openModal = function(givenName) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'modalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        firstName: function(){
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
}]);

babyApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, MainService, items, firstName) {
  var fs = MainService.fsClient();  
  $scope.items = items;             // List of persons 
  $scope.ancestors = MainService.ancestors();
  
  // CAROUSEL
  $scope.myInterval = 500;
  $scope.noWrapSlides = true;

  $scope.getMemories = function(person, arrayIndex){
    fs.getPersonMemoriesQuery(person.id).then(function (response) {
      var memories = response.getMemories();
      MainService.buildMemories(firstName, arrayIndex, memories);
      console.log($scope.items);
    });
  };
  

  $scope.personRelation = function(item){
    var name = item.$getGivenName();
    var order = item.$getAscendancyNumber();
    var gender = item.$getDisplayGender();
    var sentence = "";
    var genderEq; 

    if (gender == 'Male') 
      genderEq = 'Father';
    else 
      genderEq = 'Mother'

    if (order != undefined){

      // Determine the person's relation to you through the ahfentel method. 
      // If order is 1 - It refers to you.
      if (order == 1) {
        return "This is you!";
      } else if (order == 2){
        sentence = name + " is your " + genderEq;
        return sentence  + "!";
      } else if (order == 3){
        sentence = name + " is your " + genderEq;
        return sentence  + "!";
      } else if (order >= 4){
        var relation = "";
        var count = order;
        var howFar = 0;
        while (count > 2){
          if (count % 2 == 0){
            count = count/2;
            howFar++;
          } else {
            count = (count-1)/2;
            howFar++;
          }
        }

        relation = relation + " great";
        var times = 1;
        for (var k = 1; k <= howFar -2; k++){
          times++; 
        }
        if (times != 1)
          relation = relation + "(" + times + "x)";
        relation = relation + " grand " +genderEq;
        sentence = name + " is your " + relation + "!";
        return sentence;
        // End of if. Should have returned sentence. 
      }
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

  
});