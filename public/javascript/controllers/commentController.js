'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var commentController = (function () {
            function commentController(commentService, $location, $routeParams) {
                this.commentService = commentService;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }
            commentController.prototype.addComment = function () {
                var _this = this;
                var comment = {
                    message: this.comment.message,
                    UcCom: this.$routeParams['id']
                };
                this.commentService.saveComment(comment).then(function (res) {
                    _this.$location.path('/');
                });
            };
            ;
            commentController.prototype.deleteComment = function (comment) {
                var _this = this;
                this.commentService.deleteComment(comment).then(function (res) {
                    _this.dawg.comments.splice(_this.dawg.comments.indexOf(comment), 1);
                });
            };
            ;
            commentController.prototype.editComment = function (comment) {
                var _this = this;
                this.commentService.editComment(this.comment).then(function (res) {
                    _this.$location.path("/");
                });
            };
            ;
            ;
            return commentController;
        }());
        Controllers.commentController = commentController;
        ;
        angular.module('app').controller('commentController', commentController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
;
