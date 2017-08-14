(function(){
    angular.module('starter')
        .factory('User',['$http','$q','constants','storage','$rootScope', '$cookies',
            function($http,$q,constants,storage,$rootScope, $cookies){
            var self = this;

            // var $cookies;
            // angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
            //   $cookies = _$cookies_;
            // }]);

            return {
                /*
                 * Register new User.
                 */
                register: function(data,token) {
                    var defer = $q.defer();

                    $http({
                        method    : 'POST',
                        url       : constants.API_ENDPOINT + constants.REGISTER_ENDPOINT,
                        dataType  : 'json',
                        data      :data,
                        headers   : {
                            'X-CSRF-Token': token
                        }
                    })
                        .success(function(data, status, headers, config) {
                            defer.resolve(data);
                        })
                        .error(function(data, status, headers, config) {
                            defer.reject(data);
                        });

                    return defer.promise;
                },
                /*
                 * Login User with username and password.
                 */
                login: function(username, password,token) {
                    var defer = $q.defer();

                    $http({
                        method    : 'POST',
                        url       : constants.API_ENDPOINT + constants.LOGIN_ENDPOINT,
                        dataType  : 'json',
                        data: {
                            username: username,
                            password: password
                        },
                        headers: {
                            'X-CSRF-Token': token
                        }
                    })
                        .success(function(data, status, headers, config) {
                            if ( status >= 200 && status < 300 || status === 304 ) {
                                defer.resolve(data);
                                storage.set('token', data.token);
                                storage.set('user', data.user);
                                $cookies.token = data.token;
                            } else {
                                defer.reject(data);
                                storage.set('user', null);
                            }
                        })
                        .error(function(data, status, headers, config) {
                            defer.reject(data);
                            storage.set('user', null);
                        });

                    return defer.promise;
                },

                /*
                 * Logout User.
                 */
                logout: function(token) {
                    var defer = $q.defer();

                    $http({
                        method    : 'POST',
                        url       : constants.API_ENDPOINT + constants.LOGOUT_ENDPOINT,
                        dataType  : 'json',
                        headers: {
                          'X-CSRF-Token': token,
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                        }
                    })
                        .success(function(data, status, headers, config) {
                            defer.resolve(data);
                            $rootScope.user = "";
                            $rootScope.token = "";
                            storage.remove('user');
                            storage.remove('token');
                            $cookies.remove('token');
                            //$cookieStore.remove('user');
                            //$cookieStore.remove('token');
                        })
                        .error(function(data, status, headers, config) {
                            defer.reject(data);
                        });

                    return defer.promise;
                },


                /*
                 * Save user credentials To Local Storage.
                 */
                setUserData: function(user, token) {
                    $rootScope.user = user;
                    $rootScope.token = token;

                    storage.set('token', token);
                    storage.set('user', user);
                },

                /*
                 * Remove user credentials from Local Storage.
                 */
                removeUserData: function() {
                    $rootScope.user = {};
                    $rootScope.token = false;
                    storage.remove('token');
                    storage.remove('user');
                },

                /*
                 * Request new password.
                 */
                requestPassword: function(data,token) {
                    var defer = $q.defer();

                    $http({
                        method    : 'POST',
                        url       : constants.API_ENDPOINT + constants.REQUEST_PASSWORD_ENDPOINT,
                        dataType  : 'json',
                        data      :data,
                        headers   : {
                            'X-CSRF-Token': token
                        }
                    })
                        .success(function(data, status, headers, config) {
                            defer.resolve(data);
                        })
                        .error(function(data, status, headers, config) {
                            defer.reject(data);
                        });
                    return defer.promise;
                }

            };
        }]);
})();
