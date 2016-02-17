'use strict';
var app;
(function (app) {
    angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate'])
        .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/home.html',
            controller: app.Controllers.homeController,
            controllerAs: 'vm'
        })
            .when('/comments', {
            templateUrl: '/templates/comments.html',
            controller: app.Controllers.commentController,
            controllerAs: 'vm'
        })
            .when('/addBeer', {
            templateUrl: '/templates/createBeer.html',
            controller: app.Controllers.beerCreateController,
            controllerAs: 'vm'
        })
            .when('/beerPage', {
            templateUrl: '/templates/beerPage.html',
            controller: app.Controllers.beerPageController,
            controllerAs: 'vm'
        })
            .when('/details/:id', {
            templateUrl: '/templates/beerDetails.html',
            controller: app.Controllers.beerDetailsController,
            controllerAs: 'vm'
        })
            .when("/register", {
            templateUrl: "/templates/register.html",
            controller: app.Controllers.userController,
            controllerAs: "vm"
        })
            .when("/login", {
            templateUrl: "/templates/login.html",
            controller: app.Controllers.userController,
            controllerAs: "vm"
        })
            .when("/:username", {
            templateUrl: "/templates/userHome.html",
            controller: app.Controllers.userHomeController,
            controllerAs: "vm"
        })
            .when("/breweryDetails/:id", {
            templateUrl: "templates/breweryDetails.html",
            controller: app.Controllers.breweryDetailsController,
            controllerAs: "vm"
        })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('HTTPFactory');
    });
})(app || (app = {}));
