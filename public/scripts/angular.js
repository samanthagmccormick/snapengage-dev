
/////////////
// Angular //
/////////////

var myApp = angular.module('myApp', []);

myApp.controller('TableCtrl', function($scope, Chats) {

	// In this scope, use chats as your data set
	$scope.chats = Chats;
	// Sort automatically by name
	$scope.predicate = 'name';

});  /* End controller */
