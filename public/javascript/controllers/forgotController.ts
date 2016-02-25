'use strict';
namespace app.Controllers{
  export class forgotController{

    public user;
    public token;

    public passwordReset() {
      this.resetService.saveReset(this.user).then((res)=>{
        this.$location.path('/');
        this.ngToast.success({
            content: "Your confirmation email has been sent!",
            verticalPosition: "right",
            timeout: 2000
        })
      })
    }

    public submitReset() {
      this.resetService.saveSubmit(this.user, this.token).then((res) => {
        this.$location.path('/');
        this.ngToast.success({
            content: "Your password has been successfully reset!",
            verticalPosition: "right",
            timeout: 2000
        })
      })
    }


    constructor(private resetService: app.Services.resetService,
      private $routeParams: ng.route.IRouteParamsService,
      private ngToast,
      private $location: ng.ILocationService){
        this.token = $routeParams["id"];
      }
    }
    angular.module('app').controller('forgotController', forgotController);
  }
