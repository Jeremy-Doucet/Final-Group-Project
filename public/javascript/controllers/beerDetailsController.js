'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var BeerDetailsController = (function () {
            function BeerDetailsController(CommentsService, HomeService, $routeParams, $location) {
                this.CommentsService = CommentsService;
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.beer = HomeService.getBeer($routeParams['id']);
            }
            BeerDetailsController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment.message,
                    Beer: this.$routeParams['id']
                };
                this.CommentsService.saveComment(comment).then(function (res) {
                    _this.dawg.comments.push(res);
                });
            };
            BeerDetailsController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.CommentsService.deleteComment(comment).then(function (res) {
                    _this.dawg.comments.splice(_this.dawg.comments.indexOf(comment), 1);
                });
            };
            BeerDetailsController.prototype.editComment = function (comment) {
                var _this = this;
                this.CommentsService.editComment(this.comment).then(function (res) {
                    _this.$location.path("/");
                });
            };
            return BeerDetailsController;
        }());
        Controllers.BeerDetailsController = BeerDetailsController;
        angular.module('app').controller('BeerDetailsController', BeerDetailsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
