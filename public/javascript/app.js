'use strict';
var App;
(function (App) {
    angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate'])
        .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/Home.html',
            controller: app.Controllers.HomeController,
            controllerAs: 'vm'
        })
            .when('/Comments', {
            templateUrl: '/templates/comments.html',
            controller: app.Controllers.CommentsController,
            controllerAs: 'vm'
        })
            .when('')
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('HTTPFactory');
    });
})(App || (App = {}));
