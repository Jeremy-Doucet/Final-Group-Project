'use strict';

namespace app.Controllers {

  export class userDetailsController {

    public user;
    public getUser;
    public likedBeers;

    constructor(
      private userService: app.Services.userService,
      private $routeParams: ng.route.IRouteParamsService,
      private commentService: app.Services.commentService
    ){
      userService.getUser( $routeParams['id'] ).then((res)=>{
        this.user = res
      });
      this.likedBeers = commentService.getAllLikes();
    }
  }
  angular.module('app').controller('userDetailsController', userDetailsController);
};
