'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerDetailsController = (function () {
            function beerDetailsController(commentService, $location, homeService, $routeParams, userService) {
                var _this = this;
                this.commentService = commentService;
                this.$location = $location;
                this.homeService = homeService;
                this.$routeParams = $routeParams;
                this.userService = userService;
                this.comments = [];
                this.showModal = false;
                this.heart = false;
                homeService.getBeer($routeParams['id']).then(function (res) {
                    _this.beer = res;
                });
                this.status = userService.status;
            }
            beerDetailsController.prototype.toggleLike = function () {
                this.heart = !this.heart;
            };
            beerDetailsController.prototype.toggleModal = function () {
                this.showModal = !this.showModal;
            };
            ;
            beerDetailsController.prototype.deleteBeer = function (id) {
                var _this = this;
                this.homeService.deleteBeer(this.beer._id).then(function (res) {
                    _this.$location.path('/beerPage');
                });
            };
            ;
            beerDetailsController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment.message,
                    Beer: this.$routeParams['id']
                };
                this.commentService.saveComment(comment).then(function (res) {
                    _this.beer.comments.push(res);
                });
            };
            ;
            beerDetailsController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.commentService.deleteComment(comment).then(function (res) {
                    _this.beer.comments.splice(_this.beer.comments.indexOf(comment), 1);
                });
            };
            beerDetailsController.prototype.likeBeer = function () {
                var _this = this;
                var likedBeer = {
                    beer: this.beer._id,
                };
                this.commentService.saveLikedBeer(likedBeer).then(function (res) {
                    _this.beer.likedByUsers.push(_this.status._id);
                });
            };
            beerDetailsController.prototype.unlikeBeer = function (beer) {
                var _this = this;
                this.commentService.deleteLikedBeer(this.beer).then(function (res) {
                    _this.beer.likedByUsers.splice(_this.beer.likedByUsers.indexOf(_this.status._id), 1);
                });
            };
            beerDetailsController.prototype.rateBeer = function (rating) {
                var _this = this;
                this.beer.ranking = this.beer.ranking + rating;
                this.homeService.getBeer(this.beer._id).then(function (res) {
                    _this.homeService.updateBeer(_this.beer);
                });
            };
            ;
            ;
            return beerDetailsController;
        }());
        Controllers.beerDetailsController = beerDetailsController;
        ;
        angular.module('app').controller('BeerDetailsController', beerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
