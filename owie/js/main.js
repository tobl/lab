var owieApp = angular.module('owieApp', ['ui.router'] )

owieApp.factory('Data', function() {
    return {message: "message", date: "testdate", msgId: "messagetestdate"};
});


owieApp.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            // route to show our basic form (/form)
            .state('index', {
                url: '/index',
                templateUrl: 'form.html',
                controller: 'indexCtrl'
            })

            .state('show', {
                url: '/show?id',
                templateUrl: 'show.html',
                controller: 'showCtrl'
            });

        // catch all route
        // send users to the form page
        $urlRouterProvider.otherwise('/index');
});

owieApp.controller('indexCtrl', function($scope, $state, Data) {
    var msgId = Data.message + Data.date;
    Data.msgId = msgId;
    $scope.data = Data;
    //$scope.data.msgId = $scope.data.message + $scope.data.date;


    $scope.processForm = function() {
        var msgId = Data.message + Data.date;
        alert('awesome: '+msgId);
        $state.go('show', {id: msgId});
    };
});

owieApp.controller('showCtrl', function($scope, Data, $state, $stateParams) {
    msgId = $stateParams.id
    if (msgId) {
        Data.msgId = msgId;
        $scope.data = Data;
    } else {
        $state.go('index');
    }
});