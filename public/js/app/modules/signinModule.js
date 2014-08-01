define(['angular'], function(angular){
    var login = angular.module("Registration.Signin", []);

    login.controller("loginCtrl", ['$scope', '$rootScope', '$http', '$state', function($scope, $rootScope, $http, $state){
        console.log("in login controller");
        var URL = {"base_url": '/tst_registration/index.php',"loginURL": '/api/login', "loginSuccess":'/appprofile'};
        $scope.user = {};

        $scope.response = {"error": false, "text": ''};

        console.log(URL);

        $scope.login = function(user){
            console.log(user);
            var data = 'login='+encodeURIComponent(JSON.stringify(user));
            $http({
                url: URL.base_url+URL.loginURL,
                method: 'post',
                data: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).success(function(response){
                    console.log(response);
                    registrationResponse(response);
                })
        }

        function registrationResponse(res){
            if(res.status.toUpperCase() == 'SUCCESS'){
                $scope.response.error = true;
                $scope.response.text = res.description;
                //window.location = URL.base_url+URL.loginSuccess+'/'+res.data.USERID;
                $state.go('profile', {id: res.data.USERID});
            }else{
                $scope.response.error = true;
                $scope.response.text = res.description;
            }
        }

    }]);

});

