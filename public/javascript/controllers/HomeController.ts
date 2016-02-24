'use strict';

namespace app.Controllers {

  export class homeController {

    public status;
    public beer;
    public result;

    public logout() {
      this.userService.removeToken();
      this.userService.removeUser();
      this.$location.path('/');
    };

    public searchBeer() {
      this.homeService.searchBeer(this.beer).then((res) => {
        this.result = res;
        this.$location.path('/searchBeer');
        this.beer.name = "";
      });
    };

    constructor(
      private homeService: app.Services.homeService,
      private userService: app.Services.userService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {
      let params = $location.search();
      if (params.code) {
        userService.setToken(params.code);
        userService.setUser();
        $location.search('code', null);
        $location.hash('');
      };
      this.status = userService.status;
    };
  };

  angular.module('app').controller('homeController', homeController);
};
