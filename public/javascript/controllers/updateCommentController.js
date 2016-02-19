'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var updateCommentController = (function () {
            function updateCommentController(CommentService, $location, $routeParams) {
                this.CommentService = CommentService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.comment = CommentService.getComment($routeParams["id"]);
            }
            updateCommentController.prototype.updateComment = function (comment) {
                var _this = this;
                this.CommentService.updateComment(this.comment).then(function (res) {
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
