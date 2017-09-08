app.factory('projectfac', function ($q, $http) {
    return {
        openpost: function (pid) {
            var q = $q.defer();
            $http.post('/project', {
                id: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , comment: function (uid, com, pid) {
            var q = $q.defer();
            $http.post('/discuss', {
                uid: uid
                , com: com
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , obpost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/obpost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , cpost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/cpost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , ipost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/ipost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , opost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/opost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , rpost: function (uid, pid) {
            var q = $q.defer();
            $http.post('/rpost', {
                uid: uid
                , pid: pid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , uvcomment: function (uid, pid, cid) {
            var q = $q.defer();
            $http.post('/uvcomment', {
                uid: uid
                , pid: pid
                , cid: cid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , dvcomment: function (uid, pid, cid) {
            var q = $q.defer();
            $http.post('/dvcomment', {
                uid: uid
                , pid: pid
                , cid: cid
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
        , upcom: function (cid, comment) {
            var q = $q.defer();
            $http.post('/updatecomment', {
                cid: cid
                , comment: comment
            }).then(function (data) {
                q.resolve(data);
            }, function (err) {
                q.reject(err);
            });
            return q.promise;
        }
    };
});