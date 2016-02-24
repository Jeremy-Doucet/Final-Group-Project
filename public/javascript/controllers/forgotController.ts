'use strict';
namespace app.Controllers{
  export class forgotController{

    public user;
    public token;

    public passwordReset() {
    this.resetService.saveReset(this.user)
  }

  public submitReset() {
  this.resetService.saveSubmit(this.user, this.token).then((res) => {
    this.$location.path('/');
  })
}


constructor(private resetService: app.Services.resetService,
private $routeParams: ng.route.IRouteParamsService,
private $location: ng.ILocationService){

      this.token = $routeParams["id"];
}
  }
  angular.module('app').controller('forgotController', forgotController);
}
