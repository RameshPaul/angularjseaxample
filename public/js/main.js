require.config({

    baseUrl: "/tst_registration/public/js",

    paths: {
        domReady: 'lib/requirejs-domReady',
        jquery: "lib/jquery-v1.11.0",
        angular: "lib/angular/angular",
        uiRouter: "lib/angular/ui-router",
        "ui.bootstrap": "lib/angularbootstrap/ui-bootstrap",
        lodash: "lib/lodash-v2.4.1",
        d3: 'lib/d3',
        text: "lib/requirejs-text",
        utils: "lib/utils",
        'angularFileUpload': 'fileupload/angular-file-upload-0',
        'signup': 'app/modules/signupModule',
        'signin': 'app/modules/signinModule',
        'profile': 'app/modules/profileModule'


    },

    waitSeconds: 7000,

    shim: {
        'angular': {
            exports: 'angular'
        },
        'restangular': {
            deps:["lodash"]
        },
        'uiRouter': {
            deps:["angular"]
        },
        'ui.bootstrap': {
            deps:["angular"]
        },
        'jquery': {
            exports: '$'
        },
        'lodash': {
            exports: '_'
        },
        'd3': {
            exports: 'd3'
        },
        'angularFileUpload': {
            deps:[
                'http://nervgh.github.io/js/es5-shim.min.js',
                'http://nervgh.github.io/js/es5-sham.min.js'
            ]
        }
    }

});


console.log(window.document.readyState);
require(['domReady'], function (domReady) {
    console.log("In dom ready");
    require([
        'jquery',
        'angular',
        'd3',
        'utils',
    ], function(){
        console.log("main Dependencies loaded");
        console.log(angular);
        require([
                'uiRouter',
                'ui.bootstrap',
                'angularFileUpload',
                'signup',
                'signin',
                'profile'
            ],
            function () {
                require([
                    //'app/modules/signinModule',
                    //'app/modules/signupModule',
                    //'app/modules/profileModule',
                    'app/app',
                    'app/routes',
                ], function(){
                    console.log("All dependencies loaded");
                    angular.bootstrap(document.body, [
                       'Registration'
                    ]);
                });

            });
    });
});



