//---------------
// Services
//---------------

babyApp.factory('MainService', ['$location', '$http', '$q', '$timeout', function($location, $http, $q, $timeout){
  var client;

  return {
    fsClient: function(){
      client = new FamilySearch({
          client_id: 'a0T3000000BZ6ojEAD',
          environment: 'sandbox',
          redirect_uri: 'http://localhost:8000/fs/callback/',
          // client_id: 'Q5YX-KQ5L-TJ3S-VXXJ-5XMV-KNDZ-LYD2-2B6Q',
          // environment: 'production',
          // redirect_uri: 'http://babyancestry.com/fs/callback/',
          http_function: $http,
          deferred_function: $q.defer,
          timeout_function: $timeout,
          save_access_token: true,
          // auto_expire: true,
          auto_signin: true
      });
      return client;
    }
  }
}]);