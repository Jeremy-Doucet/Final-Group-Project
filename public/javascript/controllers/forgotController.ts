'use strict';
namespace app.Controllers{
  export class forgotController{

    public user;
    public token;

    public passwordReset() {

    this.resetService.saveReset(this.user).then((res) => {


    });

  }
  public submitReset() {

  this.resetService.saveSubmit(this.user, this.token).then((res) => {


  });

}


constructor(private resetService: app.Services.resetService,
private $routeParams: ng.route.IRouteParamsService){

      this.token = $routeParams["id"];
}
  }
  angular.module('app').controller('forgotController', forgotController);
}
