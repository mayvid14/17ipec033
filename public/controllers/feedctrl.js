app.controller('feedctrl', ['$scope', '$sessionStorage', '$window', '$mdSidenav', '$mdDialog', 'feedfac', function ($scope, $sessionStorage, $window, $mdSidenav, $mdDialog, feedfac) {
    if (!$sessionStorage.get('user')) $window.location.href = '/login';
    else $scope.user = $sessionStorage.get('user');
    feedfac.getprojects().then(function (data) {
        $scope.projects = data.data;
    }, function (err) {
        alert('error : ' + err);
    });

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID).toggle();
        };
    }
    $scope.toggle = buildToggler('left');
    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController
            , templateUrl: '../views/dialog1.tmpl.html'
            , targetEvent: ev
            , clickOutsideToClose: true
            , fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (ans) {
            feedfac.getprojects().then(function (data) {
                $scope.projects = data.data;
            }, function (err) {
                alert('error : ' + err);
            });
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.openproject = function (pid) {
        $window.location.href = "/#project/#" + pid;
    };
    $scope.search = '';
    $scope.srch = function (item) {
        return item.title.toLowerCase().includes($scope.search.toLowerCase()) || item.abstract.toLowerCase().includes($scope.search.toLowerCase());
    }
    $scope.sot=false;
    $scope.ordor = function (item) {
        if($scope.sot) return;
        var ob = item.outofthebox.length;
        var o = item.okay.length;
        var i = item.innovative.length;
        var c = item.cool.length;
        var r = item.irrelevant.length;
        return -(ob*3+c*2+i-r);
    }

    function DialogController($scope, Upload, $sessionStorage, $mdDialog) {
        $scope.hide = function (ans) {
            $mdDialog.hide(ans);
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        }
        $scope.user = $sessionStorage.get('user');
        $scope.projectupload = function () {
            Upload.upload({
                url: '/newproject'
                , method: 'POST'
                , data: {
                    uid: $scope.user._id
                    , title: $scope.postTitle
                    , description: $scope.postDescription
                    , file: $scope.filer
                }
            , }).then(function (response) {
                $scope.hide('yolo');
            }, function (response) {
                console.log('Failed', 3000);
            }, function (evt) {
                console.log('Uploading', 100);
            });
            //console.log($scope.file);
        };
    }
}]);