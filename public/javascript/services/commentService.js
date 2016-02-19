"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var CommentService = (function () {
            function CommentService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.UserCommentResource = $resource('/comments/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            CommentService.prototype.getAllComments = function () {
                return this.UserCommentResource.query();
            };
            ;
            CommentService.prototype.getComment = function (comId) {
                return this.UserCommentResource.get({ id: comId });
            };
            ;
            CommentService.prototype.saveComment = function (userComment) {
                return this.UserCommentResource.save(userComment).$promise;
            };
            ;
            CommentService.prototype.deleteComment = function (userComment) {
                return this.UserCommentResource.delete({ id: userComment._id }).$promise;
            };
            ;
            CommentService.prototype.updateComment = function (userComment) {
                return this.UserCommentResource.update({ id: userComment._id }, userComment).$promise;
            };
            ;
            ;
            return CommentService;
        }());
        Services.CommentService = CommentService;
        ;
        angular.module('app').service('CommentService', CommentService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
