'use strict'
namespace app.Controllers {
  export class CommentsController{

public comment;
public dawg;



    public addComment() {
    let comment = {
      message: this.comment.message,
      UcCom: this.$routeParams['id']
    };
    this.CommentsService.saveComment(comment).then((res) => {
    this.$location.path('/');
    });
  }

  public deleteComment(comment) {
    this.CommentsService.deleteComment(comment).then((res) => {
      this.dawg.comments.splice(this.dawg.comments.indexOf(comment), 1);
    });
  }

  public editComment(comment) {
  this.CommentsService.editComment(this.comment).then((res) => {
    this.$location.path("/");
  });
}



    constructor(private CommentsService: app.Services.CommentsService,

                      private $location: ng.ILocationService,
                      private $routeParams: ng.route.IRouteParamsService

  ){

    }
  }
angular.module('app').controller('CommentsController', CommentsController);
}
