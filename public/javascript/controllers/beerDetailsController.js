'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerDetailsController = (function () {
            function beerDetailsController(commentService, $location, homeService, $routeParams) {
                var _this = this;
                this.commentService = commentService;
                this.$location = $location;
                this.homeService = homeService;
                this.$routeParams = $routeParams;
                this.comments = [];
                this.showModal = false;
                homeService.getBeer($routeParams['id']).then(function (res) {
                    _this.beer = res;
                });
            }
            beerDetailsController.prototype.toggleModal = function () {
                this.showModal = !this.showModal;
            };
            beerDetailsController.prototype.deleteBeer = function (id) {
                var _this = this;
                this.homeService.deleteBeer(this.beer._id).then(function (res) {
                    _this.$location.path('/beerPage');
                });
            };
            ;
            beerDetailsController.prototype.rateBeer = function (rating) {
                this.beer.ranking = this.beer.ranking + rating;
                this.homeService.updateBeer(this.beer);
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
            beerDetailsController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.commentService.deleteComment(comment).then(function (res) {
                    _this.beer.comments.splice(_this.beer.comments.indexOf(comment), 1);
                });
            };
            return beerDetailsController;
        }());
        Controllers.beerDetailsController = beerDetailsController;
        angular.module('app').controller('BeerDetailsController', beerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
