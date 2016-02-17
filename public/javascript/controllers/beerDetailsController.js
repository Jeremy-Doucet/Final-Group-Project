'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var beerDetailsController = (function () {
            function beerDetailsController(CommentService, $location, homeService, $routeParams) {
                var _this = this;
                this.CommentService = CommentService;
                this.$location = $location;
                this.homeService = homeService;
                this.$routeParams = $routeParams;
                this.comments = [];
                homeService.getBeer($routeParams['id']).then(function (res) {
                    _this.beer = res;
                });
            }
            beerDetailsController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment.message,
                    Beer: this.$routeParams['id']
                };
                this.CommentService.saveComment(comment).then(function (res) {
                    _this.beer.comments.push(res);
                });
            };
            beerDetailsController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.CommentService.deleteComment(comment).then(function (res) {
                    _this.beer.comments.splice(_this.beer.comments.indexOf(comment), 1);
                });
            };
            return beerDetailsController;
        }());
        Controllers.beerDetailsController = beerDetailsController;
        angular.module('app').controller('BeerDetailsController', beerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
