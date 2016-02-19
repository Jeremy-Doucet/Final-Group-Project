'use strict';
namespace app.Controllers {
  export class beerDetailsController {

    public beer;
    public comment;
    public dawg;
    public comments = [];

    public deleteBeer(id){
      this.homeService.deleteBeer(this.beer._id).then((res) =>{
        this.$location.path('/beerPage')
      })
    };

    public rateBeer(rating) {
      this.homeService.getBeer(this.beer._id).then((res) => {
        this.beer.ranking = this.beer.ranking + rating;
        this.homeService.updateBeer(this.beer);
      });
    };



        public addComment() {
        let comment = {
          message: this.comment.message,
          Beer: this.$routeParams['id']
        };
        this.CommentService.saveComment(comment).then((res) => {
          this.beer.comments.push(res);

        });

      }

      public deleteComment(comment) {
        this.CommentService.deleteComment(comment).then((res) => {
          this.beer.comments.splice(this.beer.comments.indexOf(comment), 1);
        });
      }
    constructor(
      private CommentService: app.Services.CommentService,
      private $location: ng.ILocationService,
      private homeService: app.Services.homeService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      homeService.getBeer( $routeParams['id'] ).then((res)=>{
        this.beer = res;
        //this.comment = CommentService.getComment($routeParams["id"]);
      });
    }
  }
  angular.module('app').controller('BeerDetailsController', beerDetailsController);
}
