'use strict';

namespace app.Controllers {
  export class beerDetailsController {
    public beer;
    public comment;
    public status;
    public comments = [];
    public showModal = false;
    public heart = false;

    public toggleLike(){
      this.heart = !this.heart;
    }

    public toggleModal() {
      this.showModal = !this.showModal;
    };

    public deleteBeer(id) {
      this.homeService.deleteBeer(this.beer._id).then((res) => {
        this.$location.path('/beerPage')
      });
    };

    public addComment() {
      let comment = {
        message: this.comment.message,
        Beer: this.$routeParams['id']
      };
      this.commentService.saveComment(comment).then((res) => {
        this.beer.comments.push(res);
      });
    };

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
        this.beer.likedByUsers.push(this.status._id)
      })
    }

    public unlikeBeer(beer){
      this.commentService.deleteLikedBeer(this.beer).then((res) =>{
        this.beer.likedByUsers.splice(this.beer.likedByUsers.indexOf(this.status._id), 1)
      })
    }

    public rateBeer(rating) {
      this.beer.ranking = this.beer.ranking + rating;
      this.homeService.getBeer(this.beer._id).then((res) => {
        this.homeService.updateBeer(this.beer);
      });
    };

    constructor (
      private commentService: app.Services.commentService,
      private $location: ng.ILocationService,
      private homeService: app.Services.homeService,
      private $routeParams: ng.route.IRouteParamsService,
      private userService: app.Services.userService
    ) {
      homeService.getBeer( $routeParams['id'] ).then((res)=>{
        this.beer = res;
      });

      this.status = userService.status;
    };
  };
  angular.module('app').controller('BeerDetailsController', beerDetailsController);
};
