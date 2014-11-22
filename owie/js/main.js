var owieApp = angular.module('owieApp', ['ui.router', 'ngResource']);

// Data sharing between controllers
owieApp.factory('Data', function() {
  return {
    message: "one-click-message",
    date: "31.12.2014",
    msgId: "messagetestdate"
  };
});

// REST Call to CouchDB Backend
// Search a specific message
owieApp.factory('Message', function($resource) {
  return $resource('/api/message/:id'); // Note the full endpoint address
});

owieApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

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

// index controller
owieApp.controller('indexCtrl', function($scope, $state, Message, Data) {
  var msgId = Data.message + Data.date;
  Data.msgId = msgId;
  $scope.data = Data;

  console.log('controller=indexCtrl msgId=' + msgId);

  $scope.processForm = function() {
    console.log('controller=indexCtrl function=processForm');
    var msgId = Data.message + Data.date;

    // create a new Resource
    $scope.message = new Message();
    $scope.message.data = Data;
    console.log($scope.message);

    Message.save($scope.message.data, function(d) {
      console.log(
        'controller=indexCtrl function=processForm msg="saving message"'
      );
      $state.go('show', {
        id: d.id
      });
    })


  };
});

// show controller
owieApp.controller('showCtrl', function($scope, Data, Message,
  $stateParams) {
  var message = Message.get({
    id: $stateParams.id
  }, function() {
    console.log('controller=showCtrl message=' + message);
    Data.msgId = $stateParams.id;
    Data.message = message.message;
    Data.date = message.date;
    $scope.data = Data;
  });
});
