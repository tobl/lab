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

            .state('create', {
                url: '/create',
                templateUrl: 'show.html',
                controller: 'showCtrl'
            })
            .state('show', {
                url: '/show',
                templateUrl: 'show.html'
            })

        // catch all route
        // send users to the form page
        $urlRouterProvider.otherwise('/index');
});

owieApp.controller('indexCtrl', function($scope, $state, Data) {
    $scope.data = Data;
    var msgId = Data.message + Data.date;
    Data.msgId = msgId;

    $scope.processForm = function() {
        alert('awesome: '+msgId);
        $state.transitionTo('show');
    };

});

owieApp.controller('process', function($scope, Data) {
    alert('works');
})

owieApp.controller('showCtrl', function($scope, Data) {
    var msgId = Data.message + Data.date;
    Data.msgId = msgId;
    console.log(msgId);
    $scope.data = Data;
    //$state.go('show')
});