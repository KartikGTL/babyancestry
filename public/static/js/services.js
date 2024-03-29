'use strict';

//---------------
// Services
//---------------

babyApp.factory('MainService', ['$location', '$http', '$q', '$timeout', function ($location, $http, $q, $timeout) {
    var client = new FamilySearch({
        // Production vs development changes are configured in static.js
        client_id: babyApp.credentials.client_id,
        environment: babyApp.credentials.environment,
        redirect_uri: babyApp.credentials.redirect_uri,

        http_function: $http,
        deferred_function: $q.defer,
        timeout_function: $timeout,
        save_access_token: true,
        // auto_expire: true,
        auto_signin: true
    });
    var build = {};

    var getFirstName = function (name) {
        var first = '';
        if (name != undefined)
            first = name.split(' ')[0];
        else
            first = "None";
        return first;
    };

    return {
        ancestors: function () {
            return build;
        },
        buildPortrait: function (firstName, arrayIndex, response) {
            build[firstName].persons[arrayIndex].portrait = response;
        },
        buildMemories: function (firstName, arrayIndex, memoriesList) {
            // This function would append the memories to the corresponding person with personId = pid
            build[firstName].persons[arrayIndex].memories = memoriesList;
            build[firstName].persons[arrayIndex].memoriesCount = memoriesList.length;
        },

        // When the response comes back from familysearch with all our ancestors,
        // this function turns the raw data into lists of first names.
        buildAncestors: function (persons) {
            var numPersonsUsed = 0;
            for (var i = 0; i < persons.length; i++) {

                var person = persons[i];
                var firstName = getFirstName(person.$getGivenName());

                if (firstName != undefined && firstName != null && firstName.toLowerCase() != "none") {
                    if (!build.hasOwnProperty(firstName)) {
                        // Create a dictionary with key = name, value = corresponding details such as persons array
                        build[firstName] = {};

                        // Append the person to the name_obj persons array and initialize personsCount
                        build[firstName]['category'] = firstName;
                        build[firstName]['persons'] = [];
                        build[firstName]['personsCount'] = 0;
                    }
                    build[firstName]['personsCount']++;

                    var person_obj = {};
                    person_obj['pid'] = person.id;
                    person_obj['fsObj'] = person;
                    person_obj['memories'] = [];
                    person_obj['memoriesCount'] = 0;
                    person_obj['ahnentafel_number'] = Math.floor(person.$getAscendancyNumber());
                    person_obj['memories_loaded'] = false;
                    person_obj['fullDetailsVisible'] = false;

                    person_obj['portrait'] = '/static/img/ajax-loader2.gif';

                    build[firstName]['persons'].push(person_obj);
                    numPersonsUsed++;
                }
            }
            console.log(persons.length + " persons retrieved from familysearch");
            console.log(numPersonsUsed + " persons used");
            return build;
        },

        fsClient: function () {
            return client;
        }
    }
}]);
