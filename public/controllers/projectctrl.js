app.controller('projectctrl', ['$scope', '$sessionStorage', '$location', '$window', '$mdSidenav', '$mdDialog', '$routeParams', '$http', 'projectfac', function ($scope, $sessionStorage, $location, $window, $mdSidenav, $mdDialog, $routeParams, $http, projectfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
    $scope.project = {};
    $scope.code = "";
    projectfac.openpost($routeParams.pid).then(function (data) {
        $scope.project = data.data.pdata;
        $http.post('/code', {
            code: $scope.project.sourcecode[0]
        }).then(function (data) {
            $scope.code = data.data;
        }, function () {
            $scope.code = "No source code";
        });
        $scope.comments = data.data.ddata;
        $scope.canEdit = _.isEqual($scope.user._id, $scope.project.userId._id);
    });
    $scope.loadcode = function (index) {
        $http.post('/code', {
            code: $scope.project.sourcecode[index]
        }).then(function (data) {
            $scope.code = data.data;
        }, function () {
            $scope.code = "No source code";
        });
    }
    $scope.canEditC = function (cid) {
        return _.isEqual(cid, $scope.user._id);
    };
    $scope.com = '';
    $scope.comment = function () {
        projectfac.comment($scope.user._id, $scope.com, $routeParams.pid).then(function (data) {
            $scope.comments = data.data;
            $scope.com = '';
        }, function (err) {
            alert(err);
        });
    };
    $scope.getClass = function (cid) {
        if (_.isEqual($routeParams.cid, cid)) return 'md-3-line md-long-text highlight';
        else return 'md-3-line md-long-text';
    }
    $scope.obpost = function () {
        var userid = $scope.user._id;
        var postid = $scope.project._id;
        projectfac.obpost(userid, postid).then(function (data) {
            $scope.project = data.data.pdata;
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.obpyet = function () {
        if (_.indexOf($scope.project.outofthebox, $scope.user._id) >= 0) return 'md-icon-button md-primary';
        else return 'md-icon-button';
    }
    $scope.cpost = function () {
        var userid = $scope.user._id;
        var postid = $scope.project._id;
        projectfac.cpost(userid, postid).then(function (data) {
            $scope.project = data.data.pdata;
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.cpyet = function () {
        if (_.indexOf($scope.project.cool, $scope.user._id) >= 0) return 'md-icon-button md-primary';
        else return 'md-icon-button';
    }
    $scope.ipost = function () {
        var userid = $scope.user._id;
        var postid = $scope.project._id;
        projectfac.ipost(userid, postid).then(function (data) {
            $scope.project = data.data.pdata;
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.ipyet = function () {
        if (_.indexOf($scope.project.innovative, $scope.user._id) >= 0) return 'md-icon-button md-primary';
        else return 'md-icon-button';
    }
    $scope.opost = function () {
        var userid = $scope.user._id;
        var postid = $scope.project._id;
        projectfac.opost(userid, postid).then(function (data) {
            $scope.project = data.data.pdata;
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.opyet = function () {
        if (_.indexOf($scope.project.okay, $scope.user._id) >= 0) return 'md-icon-button md-primary';
        else return 'md-icon-button';
    }
    $scope.rpost = function () {
        var userid = $scope.user._id;
        var postid = $scope.project._id;
        projectfac.rpost(userid, postid).then(function (data) {
            $scope.project = data.data.pdata;
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.rpyet = function () {
        if (_.indexOf($scope.project.irrelevant, $scope.user._id) >= 0) return 'md-icon-button md-primary';
        else return 'md-icon-button';
    }
    $scope.uvcomment = function (cid) {
        var userid = $scope.user._id;
        var postid = $scope.project._id;
        projectfac.uvcomment(userid, postid, cid).then(function (data) {
            $scope.comments = data.data.ddata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.uvcyet = function (carr) {
        if (_.indexOf(carr, $scope.user._id) >= 0) return 'md-icon-button md-primary';
        else return 'md-icon-button';
    }
    $scope.dvcomment = function (cid) {
        var userid = $scope.user._id;
        var postid = $scope.project._id;
        projectfac.dvcomment(userid, postid, cid).then(function (data) {
            $scope.comments = data.data.cdata;
        }, function (err) {
            alert(err);
        });
    }
    $scope.dvcyet = function (carr) {
        if (_.indexOf(carr, $scope.user._id) >= 0) return 'md-icon-button md-accent';
        else return 'md-icon-button';
    }
    $scope.editproject = function (ev) {
        $sessionStorage.put('post', $scope.project);
        $mdDialog.show({
            controller: DialogController
            , templateUrl: '../views/dialog3.tmpl.html'
            , targetEvent: ev
            , clickOutsideToClose: true
            , fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (ans) {
            $sessionStorage.remove('post');
            projectfac.openpost($routeParams.pid).then(function (data) {
                $scope.project = data.data.pdata;
                $scope.comments = data.data.ddata;
                $http.post('/code', {
                    code: $scope.project.sourcecode[0]
                }).then(function (data) {
                    $scope.code = data.data;
                }, function () {
                    $scope.code = "No source code";
                });
                $scope.canEdit = _.isEqual($scope.user._id, $scope.project.userId._id);
            });
        }, function () {
            console.log('nothing');
        });
    }
    $scope.updateComment = function (ev, cid, comment) {
        var confirm = $mdDialog.prompt().title('Edit your comment...').placeholder('What do you think?').ariaLabel('Comment').initialValue(comment).targetEvent(ev).ok('Submit').cancel('Cancel');
        $mdDialog.show(confirm).then(function (result) {
            if (result.trim().length > 0) {
                projectfac.upcom(cid, result).then(function (data) {
                    $scope.comments = data.data.ddata;
                }, function (err) {
                    alert(err);
                });
            }
        }, function () {
            console.log('ok');
        });
    };
    function DialogController($scope, Upload, $sessionStorage, $mdDialog) {
        $scope.hide = function (ans) {
            $mdDialog.hide(ans);
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        }
        $scope.projectId = $sessionStorage.get('post')._id;
        $scope.uppostTitle = $sessionStorage.get('post').title;
        $scope.uppostDescription = $sessionStorage.get('post').abstract;
        $scope.uppostPic = $sessionStorage.get('post').sourcecode[0];
        $scope.upuppost = function () {
            Upload.upload({
                url: '/updatepost'
                , method: 'POST'
                , data: {
                    pid: $scope.projectId
                    , title: $scope.uppostTitle
                    , abstract: $scope.uppostDescription
                    , file: $scope.uppostPic
                }
            , }).then(function (response) {
                $scope.hide('yolo');
            }, function (response) {
                console.log('Failed', 3000);
            }, function (evt) {
                console.log('Uploading', 100);
            });
        };
    }
}]);