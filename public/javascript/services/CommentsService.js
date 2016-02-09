var app;
(function (app) {
    var Services;
    (function (Services) {
        var CommentsService = (function () {
            function CommentsService($resource, $window) {
                this.$resource = $resource;
                this.$window = $window;
                this.UserCommentResource = $resource('/Comments/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            CommentsService.prototype.getAllComments = function () {
                return this.UserCommentResource.query();
            };
            CommentsService.prototype.getComment = function (comId) {
                return this.UserCommentResource.get({ id: comId });
            };
            CommentsService.prototype.saveComment = function (userComment) {
                return this.UserCommentResource.save(userComment).$promise;
            };
            CommentsService.prototype.deleteComment = function (userComment) {
                return this.UserCommentResource.delete({ id: userComment._id }).$promise;
            };
            CommentsService.prototype.editComment = function (userComment) {
                return this.UserCommentResource.update({ id: userComment._id }).$promise;
            };
            return CommentsService;
        }());
        Services.CommentsService = CommentsService;
        angular.module('app').service('CommentsService', CommentsService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
