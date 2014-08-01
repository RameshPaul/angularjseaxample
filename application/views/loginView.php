
<script type="text/javascript" src="<?php echo WEBSITE_URL?>public/js/angular.min.js"></script>

<div class="container" ng-app="login">
    <div class="col-md-8 float-center" ng-controller="loginCtrl">
        <h2>Registration</h2>
        <form name="loginForm" ng-submit="login(user)" novalidate>
            <div class="clearfix">
                <label> Email</label>
                <input type="email" name="email" class="form-control input-sm" placeholder="Enter email"
                       ng-model="user.email" required>
                <div ng-show="loginForm.email.$dirty && loginForm.email.$invalid">
                    <div class="text-danger text-center" ng-show="loginForm.email.$error.required || loginForm.email.$error.email">Please enter valid email</div>
                </div>
            </div>
            <div class="clearfix">
                <label> Password</label>
                <input type="password" name="password" class="form-control input-sm" placeholder="Enter password"
                       ng-model="user.password" required>
                <div ng-show="loginForm.password.$dirty && loginForm.password.$invalid">
                    <div class="text-danger text-center" ng-show="loginForm.password.$error.required"> Please enter password</div>
                </div>
            </div>
            <div ng-show="response.error" class="text-danger text-center">
                {{response.text}}
            </div>

            <div class="clearfix">
                <button type="submit" class="btn btn-primary"
                        ng-disabled="loginForm.$invalid || isChanged(user)">login</button>
                <button type="reset" class="btn btn-default">Reset</button>
            </div>

        </form>
    </div>
</div>

<script type="text/javascript" src="<?php echo WEBSITE_URL?>public/js/login.js"></script>