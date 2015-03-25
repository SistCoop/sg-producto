var module = angular.module('demoApp', ['restangular', 'sg-producto']);

module.config(function(sgProductoProvider){

    sgProductoProvider.restUrl = 'https://someweb';

});

module.controller('PruebaController', function($scope, Restangular, SGProductoCredito){

    $scope.obj = SGProductoCredito.$search();

});