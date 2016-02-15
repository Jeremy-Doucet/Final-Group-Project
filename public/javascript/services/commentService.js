"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var commentService = (function () {
            function commentService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.UserCommentResource = $resource('/comments/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            commentService.prototype.getAllComments = function () {
                return this.UserCommentResource.query();
            };
            ;
            commentService.prototype.getComment = function (comId) {
                return this.UserCommentResource.get({ id: comId });
            };
            ;
            commentService.prototype.saveComment = function (userComment) {
                return this.UserCommentResource.save(userComment).$promise;
            };
            ;
            commentService.prototype.deleteComment = function (userComment) {
                return this.UserCommentResource.delete({ id: userComment._id }).$promise;
            };
            ;
            commentService.prototype.editComment = function (userComment) {
                return this.UserCommentResource.update({ id: userComment._id }).$promise;
            };
            ;
            ;
            return commentService;
        }());
        Services.commentService = commentService;
        ;
        angular.module('app').service('commentService', commentService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
