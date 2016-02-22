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
                this.likedBeerResource = $resource('/api/v1/likedBeers/:id');
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
            commentService.prototype.updateComment = function (userComment) {
                return this.UserCommentResource.update({ id: userComment._id }, userComment).$promise;
            };
            ;
            commentService.prototype.getAllLikes = function () {
                return this.likedBeerResource.query();
            };
            commentService.prototype.saveLikedBeer = function (likedBeer) {
                return this.likedBeerResource.save(likedBeer).$promise;
            };
            commentService.prototype.deleteLikedBeer = function (likedBeer) {
                return this.likedBeerResource.delete({ id: likedBeer._id }).$promise;
            };
            ;
            return commentService;
        }());
        Services.commentService = commentService;
        ;
        angular.module('app').service('commentService', commentService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
