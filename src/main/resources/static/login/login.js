angular.module('market-front').controller('loginController', function ($rootScope, $scope, $http, $localStorage) {
    const contextPath = 'http://localhost:8189/market/api/v1';


        $scope.createNewUser = function () {
            if($scope.new_user == null){
                alert("Форма не заполнена");
                return;
            }

            $http.post(contextPath + '/login/new_user', $scope.new_user)
                .then(function successCallback(response) {
                        $scope.new_user = null;
                        alert("Пользователь зарегистрирован");},

                        function failCallback(response) {
                        alert("Что-то не так с введенными данными");
                    }
                );
        }


        $scope.tryToAuth = function () {
            $http.post(contextPath + '/login', $scope.user)
                .then(function successCallback(response) {
                    if (response.data.token) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                        $localStorage.webMarketUser = {username: $scope.user.username, token: response.data.token};

                        $scope.user.username = null;
                        $scope.user.password = null;
                    }
                }, function errorCallback(response) {
                });
        };

        $scope.tryToLogout = function () {
            $scope.clearUser();
            if ($scope.user.username) {
                $scope.user.username = null;
            }
            if ($scope.user.password) {
                $scope.user.password = null;
            }
        };

        $scope.clearUser = function () {
            delete $localStorage.webMarketUser;
            $http.defaults.headers.common.Authorization = '';
        };

        $rootScope.isUserLoggedIn = function () {
            if ($localStorage.webMarketUser) {
                return true;
            } else {
                return false;
            }
        };
    });