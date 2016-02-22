'use strict';
namespace app.Controllers {
  export class beerDetailsController {

    public beer;
    public comment;
    public comments = [];
    public showModal = false;
    public heart = false;

    public toggleLike(){
      this.heart = !this.heart;
    }

    public toggleModal(){
      this.showModal = !this.showModal;
    }

    public deleteBeer(id){
      this.homeService.deleteBeer(this.beer._id).then((res) =>{
        this.$location.path('/beerPage')
      })
    }

    public addComment() {
      let comment = {
        message: this.comment.message,
        Beer: this.$routeParams['id']
      };
      this.commentService.saveComment(comment).then((res) => {
        this.beer.comments.push(res);
      });
    }

    public deleteComment(comment) {
      this.commentService.deleteComment(comment).then((res) => {
        this.beer.comments.splice(this.beer.comments.indexOf(comment), 1);
      });
    }

    public likeBeer(){
      let likedBeer = {
        beer: this.beer._id,
      };
      this.commentService.saveLikedBeer(likedBeer).then((res) =>{
        this.$location.path('/beerPage')
      })
    }

    public unlikeBeer(beer){
      this.commentService.deleteLikedBeer(beer).then((res) =>{
        console.log('Beer was unliked')
      })
    }

    constructor(
      private commentService: app.Services.commentService,
      private $location: ng.ILocationService,
      private homeService: app.Services.homeService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      homeService.getBeer( $routeParams['id'] ).then((res)=>{
        this.beer = res;
      });
    }
  }
  angular.module('app').controller('BeerDetailsController', beerDetailsController);
}
