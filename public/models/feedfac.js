app.factory('feedfac', function ($http, $q) {
    return {
        getprojects: function () {
            var q = $q.defer();
            $http.post('/getprojects').then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});