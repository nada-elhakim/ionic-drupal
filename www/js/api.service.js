(function(){
    angular.module('starter')
        .factory('API', ['$http','$q','constants','storage',
            function($http,$q,constants,storage){
                return {
                    /*
                     * Get services session token.
                     */
                    getSessionToken:function(){
                        var defer = $q.defer();
                        $http({
                            method    :'GET',
                            url       : constants.SESSION_TOKEN_ENDPOINT,
                            dataType  : 'text'
                        }).success(function(data,status,headers,config){
                            defer.resolve(data);
                        }).error(function(data,status,header,config){
                            defer.reject(data);
                        });
                        return defer.promise;
                    },

                    /**
                     *  Return All Entries
                     */
                    query:function(url){
                        var defer = $q.defer();
                        $http({
                            method  :'GET',
                            url     : constants.API_ENDPOINT + url,
                            dataType: 'json'
                        }).success(function(data,status,headers,config){
                            defer.resolve(data);
                        }).error(function(data,status,headers,config){
                            defer.reject(data);
                        });

                        return defer.promise;
                    },

                    /**
                     *  Return Entry By Id
                     */
                    get:function(url,id){
                        var defer = $q.defer();
                        $http({
                            method  :'GET',
                            url     : constants.API_ENDPOINT + url + '/' + id,
                            dataType: 'json'
                        }).success(function(data,status,headers,config){
                            defer.resolve(data);
                        }).error(function(data,status,headers,config){
                            defer.reject(data);
                        });
                        return defer.promise;
                    },

                    /**
                     *  Add A New Entry
                     */
                    save:function(url,entry,token){
                        var defer = $q.defer();
                        $http({
                            method  : 'POST',
                            url     : constants.API_ENDPOINT + url,
                            data    : entry,
                            dataType:'json',
                            headers : {
                                "Accept"        : "application/json",
                                "Content-Type"  : "application/json",
                                'X-CSRF-Token' : token
                            }
                        }).success(function(data,status,headers,config){
                            defer.resolve(data);
                        }).error(function(data,status,headers,config){
                            defer.reject(data);
                        });
                        return defer.promise;
                    },
                    /**
                     *  Update Entry
                     */
                    update:function(url,entry,token){
                        var defer = $q.defer();
                        $http({
                            method  : 'PUT',
                            url     : constants.API_ENDPOINT + url,
                            data    : entry,
                            dataType:'json',
                            headers : {
                                "Accept"        : "application/json",
                                "Content-Type"  : "application/json",
                                'X-CSRF-Token' : token
                            }
                        }).success(function(data,status,headers,config){
                            defer.resolve(data);
                        }).error(function(data,status,headers,config){
                            defer.reject(data);
                        });
                        return defer.promise;
                    },

                    /**
                     *  Delete Entry
                     */
                    delete:function(url,token){
                        var defer = $q.defer();
                        $http({
                            method  : 'DELETE',
                            url     : constants.API_ENDPOINT + url,
                            dataType:'json',
                            headers : {
                                "Accept"        : "application/json",
                                "Content-Type"  : "application/json",
                                'X-CSRF-Token' : token
                            }
                        }).success(function(data,status,headers,config){
                            defer.resolve(data);
                        }).error(function(data,status,headers,config){
                            defer.reject(data);
                        });
                        return defer.promise;
                    }
                };
            }]);
})();
