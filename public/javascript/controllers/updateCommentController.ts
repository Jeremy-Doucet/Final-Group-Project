'use strict';

namespace app.Controllers {
  export class updateCommentController {

    public comment;
    public oldcomment;

    public updateComment(comment) {
    this.CommentService.updateComment(this.comment).then((res) => {
      this.$location.path("/");
    });
  }
  constructor(private CommentService: app.Services.CommentService,
       private $location: ng.ILocationService,
       private $routeParams: ng.route.IRouteParamsService) {
      // $routeParams['id'] is linked to :id on the /update route on app.ts
      this.comment = CommentService.getComment($routeParams["id"]);
    };


  }
  angular.module('app').controller('updateCommentController', updateCommentController)
}
