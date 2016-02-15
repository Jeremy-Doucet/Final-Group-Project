namespace app.Services {
  export class CommentsService{

    public UserCommentResource;

    public getAllComments(){
      return this.UserCommentResource.query();
    }
    public getComment(comId){
      return this.UserCommentResource.get({id: comId});
    }
    public saveComment(comment) {
      return this.UserCommentResource.save(comment).$promise;
    }
    public deleteComment(userComment){
      return this.UserCommentResource.delete({id: userComment._id}).$promise;
    }
    public editComment(userComment){
      return this.UserCommentResource.update({id: userComment._id}).$promise;
    }


    constructor(private $resource:ng.resource.IResourceService,
      private $window: ng.IWindowService){

        this.UserCommentResource = $resource('/api/comments/:id', null,{
          'update':{method: 'PUT'}
        });
    }
  }
  angular.module('app').service('CommentsService',CommentsService);
}
