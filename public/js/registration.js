(function(){
    var registration = angular.module("registration", ['angularFileUpload']);

    registration.controller("registrationCtrl", ['$scope', '$rootScope', '$http', 'URL', 'FileUploader', function($scope, $rootScope, $http, URL, FileUploader){
        console.log("in registration controller");
        $scope.user = {};

        $scope.response = {"error": false, "text": ''};

        /**
         * FILE UPLOAD
         */
        var uploader = $scope.uploader = new FileUploader({
            url: URL.base_url+URL.registrationURL,
            formData: [$scope.user],
            //queueLimit: 1,
            //autoUpload: true

        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            registrationResponse(response);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

        /**
         * REGISTRATION
         */
        $scope.submitRegistration = function(user){
            console.log(user);
            var data = 'registration='+encodeURIComponent(JSON.stringify(user));
            /*$http({
                url: URL.base_url+URL.registrationURL,
                method: 'post',
                data: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).success(function(response){
                    console.log(response);
                    registrationResponse(response);
                });
            */
            uploader.uploadAll();
        }

        function registrationResponse(res){
            if(res.status.toUpperCase() == 'SUCCESS'){
                $scope.response.error = true;
                $scope.response.text = res.description;
                window.location = URL.base_url+URL.registrationSuccess;
            }else{
                $scope.resposne.error = true;
                $scope.response.text = res.description;
            }
        }

        function errorHandler(){

        }

    }]);

    registration.value("URL", {"base_url": '/tst_registration/index.php',"registrationURL": '/registration/doregistration', "registrationSuccess":'/login', "uploadURL":'/registration/uploadfile'});
})();