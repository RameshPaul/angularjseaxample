define([
    'angular'
],

function (angular) {
    'use strict';

    var regApp =  angular.module('Registration', [
                                        'ui.router',
                                        'ui.bootstrap',

                                        'Registration.Signup',
                                        'Registration.Signin',
                                        'Registration.Profile'
                                ]);



    regApp.value("APP_URL", {'base_url': 'http://localhost/tst_registration/', 'base_dir': 'tst_registration'});
});