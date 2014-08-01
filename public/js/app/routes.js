define([
    'angular'
],

function (angular) {
    'use strict';

    var regApp = angular.module('Registration');
    regApp.config([
                        "$stateProvider",
                        "$urlRouterProvider",
                        "$locationProvider",
                        "$controllerProvider",
                        "$compileProvider",
                        "$filterProvider",
                        "$provide",
                    function(
                        $stateProvider,
                        $urlRouterProvider,
                        $locationProvider,
                        $controllerProvider,
                        $compileProvider,
                        $filterProvider,
                        $provide
                        ){



        /**
         * Route Resolver configuration
         */
        var registerObject =  {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

            var base_url = '/tst_registration/index.php';
            var base_dir = '/tst_registration';
            //GLOBAL VARS
            var loadDepedencies = {};

            // user html5 mode
            $locationProvider.html5Mode(true);

            // unmatched URLs
            //$urlRouterProvider.otherwise("/404");

            //Define routes - controllers will be loaded dynamically
            //var route = routeResolverProvider.route;
            //console.log(route);

            // set routes
            $stateProvider
            /**
             * Actual Routeing urls
             */
                .state('index', {
                    url: base_url+'/index',
                    templateUrl: base_dir+'/public/js/app/templates/home.html',
                    controller: function(){
                        console.log("in index page");
                    }
                })
                .state('404', {
                    url: base_url+'/404',
                    controller: function(){
                        //window.location = '/404_override';
                    }
                })
                .state('signin', {
                    url: base_url+'/appsignin',
                    templateUrl: base_dir+"/public/js/app/templates/signin.html",
                    controller: 'loginCtrl'
                })
                .state('signup', {
                    url: base_url+'/appsignup',
                    templateUrl: base_dir+"/public/js/app/templates/signup.html",
                    controller: 'registrationCtrl'
                })
                .state('profile', {
                    url: base_url+'/appprofile/:id',
                    templateUrl: base_dir+"/public/js/app/templates/profile.html",
                    controller: 'profileCtrl'
                });


    }]);

});



