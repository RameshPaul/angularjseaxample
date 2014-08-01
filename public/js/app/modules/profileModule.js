define(['angular'], function(angular){
    var profile = angular.module("Registration.Profile", ['angularFileUpload']);
    var URL = {"base_url": '/tst_registration/index.php',"base_dir": '/tst_registration/', "getProfileData": '/api/user/id', "updateProfileData":'/api/user/id'};

    profile.controller("profileCtrl", ['$scope', '$rootScope', 'ProfileService', 'FileUploader', '$stateParams', function($scope, $rootScope, ProfileService, FileUploader, $stateParams){
        console.log("in profile controller");
        console.log($stateParams);
        var userID = $stateParams.id;
        $scope.user = {};
        $scope.currentUserID = 0;
        $scope.userPhoto = '';
        $scope.userPhotoOrig = '';
        $scope.user.userID = $scope.currentUserID;

        $scope.response = {"error": false, "text": ''};

        /**
         * FILE UPLOAD
         */
        var uploader = $scope.uploader = new FileUploader({
            url: URL.base_url+URL.updateProfileData,
            formData: [$scope.user]
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
            profileResponse(response);
            uploader.clearQueue();
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
         * PROFILE
         */
        $scope.submitprofile = function(user){
            console.log(user);
            console.log(uploader.queue);
            if(uploader.queue.length > 0){
                uploader.uploadAll();
            }else{
                user.photo = $scope.userPhotoOrig;
                var data = formRequest({'profile':encodeURIComponent(JSON.stringify(user)), 'userID':$scope.currentUserID});
                ProfileService.updateProfileData(data).success(profileResponse);
            }
        }

        function profileResponse(res){
            if(res.status.toUpperCase() == 'SUCCESS'){
                $scope.response.error = true;
                $scope.response.text = res.description;
                $scope.userPhoto = URL.base_dir+res.data.location;
                $scope.userPhotoOrig = res.data.location;
                //window.location = URL.base_url+URL.profileSuccess;
            }else{
                $scope.resposne.error = true;
                $scope.response.text = res.description;
            }
        }

        function formRequest(item){
            var form_data = '';

            for ( var key in item ) {
                form_data = form_data+key+'='+item[key]+'&';
            }
            console.log(form_data);
            return form_data.slice(0, -1);
        }

        function errorHandler(){
        }

        /**
         * GET USER DETAILS
         */
        function getProfileData(){
            var data = 'userID='+userID;
            ProfileService.getUserData(data).success(function(response){
                console.log(response);
                var data = response.data;
                console.log(data);
                updateUserModel(data);
            });

        }
        getProfileData();

        function updateUserModel(data){
            $scope.user.name = data.NAME;
            $scope.user.email = data.EMAIL;
            $scope.user.password = data.PASSWORD;
            $scope.user.phone = data.PHONE_NUM;
            $scope.user.address = data.ADDRESS;

            $scope.currentUserID = data.USERID;

            $scope.user.userID = $scope.currentUserID;

            $scope.userPhoto = URL.base_dir+data.PHOTO_LOCATION;
            $scope.userPhotoOrig = data.PHOTO_LOCATION;
        }
    }]);

    profile.factory("ProfileService", ['$http', function($http){
        return{
            getUserData: function(data){
                var xhr = $http({
                    url: URL.base_url+URL.getProfileData+'?'+data,
                    method: 'get',
                    data: data,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                });
                return xhr;
            },
            updateProfileData: function(data){
                var xhr = $http({
                    url: URL.base_url+URL.updateProfileData,
                    method: 'post',
                    data: data,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                });
                return xhr;
            }
        }
    }]);

    //profile.value();
});