'use strict';
namespace app.Controllers {
  export class HomeController {

    constructor(private HomeService: app.Services.HomeService) {

    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
