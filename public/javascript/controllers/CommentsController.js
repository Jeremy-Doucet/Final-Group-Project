'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var CommentsController = (function () {
            function CommentsController(CommentsService, $location, $routeParams) {
                this.CommentsService = CommentsService;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            CommentsController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment.message,
                    UcCom: this.$routeParams['id']
                };
                this.CommentsService.saveComment(comment).then(function (res) {
                    _this.$location.path('/');
                });
            };
            CommentsController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.CommentsService.deleteComment(comment).then(function (res) {
                    _this.dawg.comments.splice(_this.dawg.comments.indexOf(comment), 1);
                });
            };
            CommentsController.prototype.editComment = function (comment) {
                var _this = this;
                this.CommentsService.editComment(this.comment).then(function (res) {
                    _this.$location.path("/");
                });
            };
            return CommentsController;
        }());
        Controllers.CommentsController = CommentsController;
        angular.module('app').controller('CommentsController', CommentsController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
