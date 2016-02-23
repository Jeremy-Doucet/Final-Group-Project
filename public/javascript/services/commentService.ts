"use strict";

namespace app.Services {

  export class commentService{

    public UserCommentResource;
    public likedBeerResource;

    public getAllComments() {
      return this.UserCommentResource.query();
    };

    public getComment(comId) {
      return this.UserCommentResource.get({id: comId});
    };

    public saveComment(userComment) {
      return this.UserCommentResource.save(userComment).$promise;
    };

    public deleteComment(userComment) {
      return this.UserCommentResource.delete({id: userComment._id}).$promise;
    };

    public updateComment(userComment) {
      return this.UserCommentResource.update({id: userComment._id}, userComment).$promise;
    };

    public getAllLikes(){
      return this.likedBeerResource.query();
    }

    public saveLikedBeer(likedBeer){
      return this.likedBeerResource.save(likedBeer).$promise
    }

    public deleteLikedBeer(likedBeer){
      return this.likedBeerResource.delete({ id: likedBeer._id }).$promise
    }

    constructor(
      private $resource:ng.resource.IResourceService,
      private $window: ng.IWindowService
    ) {
      this.UserCommentResource = $resource('/comments/:id', null, {
          'update':{method: 'PUT'}
      });
      this.likedBeerResource = $resource('/api/v1/likedBeers/:id')
    };
  };

  angular.module('app').service('commentService', commentService);
}
