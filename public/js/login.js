(function(){
    var registration = angular.module("login", []);

    registration.controller("loginCtrl", ['$scope', '$rootScope', '$http', 'URL', function($scope, $rootScope, $http, URL){
        console.log("in login controller");
        $scope.user = {};

        $scope.response = {"error": false, "text": ''};

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
                window.location = URL.base_url+URL.loginSuccess+'/'+res.data.USERID;
            }else{
                $scope.response.error = true;
                $scope.response.text = res.description;
            }
        }

    }]);

    registration.value("URL", {"base_url": '/tst_registration/index.php',"loginURL": '/login/dologin', "loginSuccess":'/profile/index'});
})();