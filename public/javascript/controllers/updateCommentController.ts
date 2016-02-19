'use strict';

namespace app.Controllers {
  export class updateCommentController {

    public comment;
    public oldcomment;

    public updateComment(comment) {
    this.commentService.updateComment(this.comment).then((res) => {
      this.$location.path("/");
    });
  }
  constructor(private commentService: app.Services.commentService,
       private $location: ng.ILocationService,
       private $routeParams: ng.route.IRouteParamsService) {
      // $routeParams['id'] is linked to :id on the /update route on app.ts
      this.comment = commentService.getComment($routeParams["id"]);
    };


  }
  angular.module('app').controller('updateCommentController', updateCommentController)
}
