'use strict';

namespace app.Controllers {

  export class userDetailsController {

    public user;

    constructor(
      private userService: app.Services.userService,
      private $routeParams: ng.route.IRouteParamsService
    ) {
      userService.getUser( $routeParams['id'] ).then((res) =>{
        this.user = res;
      });
    };
  };

  angular.module('app').controller('userDetailsController', userDetailsController);
};
