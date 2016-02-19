'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var updateCommentController = (function () {
            function updateCommentController(commentService, $location, $routeParams) {
                this.commentService = commentService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.comment = commentService.getComment($routeParams["id"]);
            }
            updateCommentController.prototype.updateComment = function (comment) {
                var _this = this;
                this.commentService.updateComment(this.comment).then(function (res) {
                    _this.$location.path("/");
                });
            };
            ;
            return updateCommentController;
        }());
        Controllers.updateCommentController = updateCommentController;
        angular.module('app').controller('updateCommentController', updateCommentController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
