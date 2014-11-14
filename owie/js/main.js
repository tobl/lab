angular.module('owieApp', ['ngAnimate', 'ui.router'] ).

    config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            // route to show our basic form (/form)
            .state('form', {
                url: '/form',
                templateUrl: 'form.html',
                controller: 'formController'
            })

            // nested states
            // each of these sections will have their own view
            // url will be nested (/form/create)
            .state('form.create', {
                url: '/create',
                templateUrl: 'form-create.html'
            })

            // url will be /form/show
            .state('form.show', {
                url: '/show',
                templateUrl: 'form-show.html'
            })

        // catch all route
        // send users to the form page
        $urlRouterProvider.otherwise('/form/create');
    })

    .controller('formController', function($scope, $http) {

        // we will store all of our form data in this object
        $scope.formData = {};

        $scope.processMessage = function($scope, $http) {
            $http.post('message/create')
                .success(function (data, status, headers, config) {
                    console.log('controller successfully called')
                }).error(function (data, status, headers, config) {
                    console.log('controller call with errors')
                });
        }


        $scope.data = {message: "your message", datetime: "your date"};


    })

    .controller('FirstPage', function($scope) {
        $scope.data = {message: "your message", datetime: "your date"};
    });