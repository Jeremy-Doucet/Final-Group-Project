'use strict';
namespace app.Controllers{
  export class BeerDetailsController{

    public beer;

    public comment;
    public dawg;



        public addComment() {
        let comment = {
          message: this.comment.message,
          Beer: this.$routeParams['id']
        };
        this.CommentsService.saveComment(comment).then((res) => {
          this.dawg.comments.push(res);
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

    constructor(
      private CommentsService: app.Services.CommentsService,
      private HomeService: app.Services.HomeService,
      private $routeParams: ng.route.IRouteParamsService,
      private $location: ng.ILocationService
    ){
      this.beer = HomeService.getBeer( $routeParams['id'] );
    }
  }
  angular.module('app').controller('BeerDetailsController', BeerDetailsController);
}
