//---------------
// Services
//---------------

babyApp.factory('MainService', ['$location', '$http', '$q', '$timeout', function ($location, $http, $q, $timeout) {
    var client = new FamilySearch({
        // DEV SETTINGS
        client_id: 'a0T3000000BZ6ojEAD',
        environment: 'sandbox',
        redirect_uri: 'http://localhost:8000/fs/callback/',

        // Production Settings
        //client_id: 'Q5YX-KQ5L-TJ3S-VXXJ-5XMV-KNDZ-LYD2-2B6Q',
        //environment: 'production',
        //redirect_uri: 'http://babyancestry.com/fs/callback/',
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
        buildAllMemories: function (firstName) {
            for (var i = 0; i < build[firstName]['persons'].length; i++) {
                var p = build[firstName]['persons'][i];
                client.getPersonMemoriesQuery(p.pid).then(function (response) {
                    var memoriesResp = response.getMemories();
                    p.memories = memoriesResp;
                    console.log('MEMORIES: ' + p);
                });

                client.getPersonPortraitUrl(p.pid, {
                    default: 'http://babyancestry.com/static/app/img/browsers/Male-avatar.png',
                    followRedirect: true,
                }).then(function (response) {
                    if (response) {
                        p.portrait = response;
                    }
                    console.log("PORTRAIT: " + response);
                });
                console.log('YEAH: ' + p);
            }
        },

        // When the response comes back from familysearch with all our ancestors,
        // this function turns the raw data into lists of first names.
        buildAncestors: function (persons) {
            for (var i = 0; i < persons.length; i++) {

                var person = persons[i];
                var firstName = getFirstName(person.$getGivenName());

                if (firstName != undefined) {
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

                    person_obj['portrait'] = '/static/app/img/ajax-loader2.gif';

                    build[firstName]['persons'].push(person_obj);
                }
            }
            return build;
        },

        fsClient: function () {
            return client;
        }
    }
}]);
