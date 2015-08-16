//---------------
// Controllers
//---------------

babyApp.controller('MainCtrl', ['$scope','MainService', '$location', '$http', '$q', '$timeout','$modal', '$log','$window', function($scope, MainService, $location, $http, $q, $timeout, $modal, $log, $window){
  var currentUser;
  var ancestors; 
  var fs = MainService.fsClient();    

  var buildAncestorsList = function(persons){
    var obj = {};
    // key = givenName;
    // value = person
    for (var i = 0; i < persons.length; i++){
        var person = persons[i];
        var givenName = person.$getGivenName();
        var firstName = '';

        if (givenName != undefined) 
          firstName = givenName.split(' ')[0];
        else 
          firstName = "None";

        if (obj.hasOwnProperty(firstName)) {
          obj[firstName].push(person);
        } else {
          obj[firstName] = [person];
        }
    }
    console.log(obj);
    return obj;
  };
  
  $scope.contactName = 'User';
  $scope.loggedIn = false;
  $scope.ancestorsList;

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
          // descendants: true,
        }).then(function(response){
          $scope.ancestorsList = buildAncestorsList(response.getPersons());
        });
      });
    });
  };

  $scope.logoutUser = function() {
    fs.invalidateAccessToken();
    $window.location.reload();
  };

  // Modal related
  $scope.isStoriesLoaded = false; 
  $scope.stories = [];
  
  $scope.showStories = function(person){
    $scope.stories = [];  // List of stories associated to a personId - Should be initialzied back to empty every click...
    
    person.getBirthDate.then(function(response){
      console.log(response);
    })
  };

  // Actions
  $scope.openModal = function(givenName) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'modalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.ancestorsList[givenName];
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

babyApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
  $scope.items = items;             // List of persons 
  
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

        for (var k = 1; k <= howFar -1; k++){
          relation = relation + " great";
        }
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
});