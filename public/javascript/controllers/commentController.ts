'use strict'

namespace app.Controllers {

  export class commentController {

    public comment;
    public dawg;

    public addComment() {
      let comment = {
        message: this.comment.message,
        UcCom: this.$routeParams['id']
      };
      this.commentService.saveComment(comment).then((res) => {
        this.$location.path('/');
      });
    };

    public deleteComment(comment) {
      this.commentService.deleteComment(comment).then((res) => {
        this.dawg.comments.splice(this.dawg.comments.indexOf(comment), 1);
      });
    };

    public editComment(comment) {
      this.commentService.editComment(this.comment).then((res) => {
        this.$location.path("/");
      });
    };

    constructor(
      private commentService: app.Services.commentService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService
    ) {};
  };

  angular.module('app').controller('commentController', commentController);
};
