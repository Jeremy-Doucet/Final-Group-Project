'use strict';
namespace app {

  angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate'])

  .config((
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider) => {

    $routeProvider.when('/', {
      templateUrl: '/templates/Home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .when('/Comments', {
      templateUrl:'/templates/comments.html',
      controller: app.Controllers.CommentsController,
      controllerAs: 'vm'
    })
    .when('/addBeer', {
      templateUrl: '/templates/createBeer.html',
      controller: app.Controllers.BeerCreateController,
      controllerAs: 'vm'
    })
    .when('/beerPage', {
      templateUrl: '/templates/beerPage.html',
      controller: app.Controllers.BeerPageController,
      controllerAs: 'vm'
    })

    .when('/details/:id', {
      templateUrl: '/templates/beerDetails.html',
      controller: app.Controllers.BeerDetailsController,
      controllerAs: 'vm'
    })

    .when("/register", {
      templateUrl: "/templates/register.html",
      controller: app.Controllers.uCtrl,
      controllerAs: "vm"
    })
    .when("/login", {
      templateUrl: "/templates/login.html",
      controller: app.Controllers.uCtrl,
      controllerAs: "vm"
    })
    .when("/:username", {
      templateUrl: "/templates/uHome.html",
      controller: app.Controllers.uHomeCtrl,
      controllerAs: "vm"
    })
    .otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HTTPFactory');
  });
}
