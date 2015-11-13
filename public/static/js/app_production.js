'use strict';

var babyApp = angular.module('babyApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngOrderObjectBy']);

babyApp.credentials = {
    // DEV SETTINGS
    //root_url: 'http://localhost:8000',
    //client_id: 'a0T3000000BZ6ojEAD',
    //environment: 'sandbox',
    //redirect_uri: 'http://localhost:8000/fs/callback/'

    // Production Settings
    root_url: 'https://babyancestry.com',
    client_id: 'Q5YX-KQ5L-TJ3S-VXXJ-5XMV-KNDZ-LYD2-2B6Q',
    environment: 'production',
    redirect_uri: 'http://babyancestry.com/fs/callback/'
};


