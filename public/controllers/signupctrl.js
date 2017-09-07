app.controller('signupctrl', ['$scope', '$window', '$sessionStorage', function ($scope, $window, $sessionStorage) {
    $scope.signup = function () {
        var n = $scope.n;
        var email = $scope.semail;
        var passwd = $scope.spasswd;
        var obj = {
            n: n
            , email: email
            , passwd: passwd
        };
        $sessionStorage.put('temp', obj);
        if ($sessionStorage.get('temp')) {
            console.log('written');
            $window.location.href = './imgup';
        }
    };
}]);