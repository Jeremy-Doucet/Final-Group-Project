'use strict';

namespace app.Controllers {

  export class categoryHomeController {

    public beersLocal;

    public beersType;

    public beersPopular;

    public sortByPopular(array, key) {
      return this.beersPopular.sort((a, b) => {
        return b['ranking'] - a['ranking'];
      });
    };

    public locHomeImg = '/css/img/' + this.$routeParams['location'] + '.png';

    public typeHomeImg = '/css/img/' + this.$routeParams['type'] + '.png';

    constructor(
      private categoryService: app.Services.categoryService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      if (this.$routeParams['location']) this.beersLocal = categoryService.getBeersLocal($routeParams['location']);
      if (this.$routeParams['type']) this.beersType = categoryService.getBeersType($routeParams['type']);
      if (this.$location.path() === '/popular') this.beersPopular = categoryService.getBeersPopular();
    };
  };

  angular.module('app').controller('categoryHomeController', categoryHomeController);
};
