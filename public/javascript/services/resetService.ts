"use strict";

namespace app.Services {
  export class resetService{

    public Resource;
    public ResourceTwo;
    public token;

    public saveReset(user) {
      return this.Resource.save(user).$promise;
    };

    public saveSubmit(usertwo, token) {
      //url token take LT then RT takes param token below*
      return this.ResourceTwo.save({token:token},usertwo).$promise;
    }
    
    constructor(private $resource: ng.resource.IResourceService){
      this.Resource = $resource('/forgot');
      this.ResourceTwo = $resource('/forgot/reset/:token');

    };

  }
  angular.module('app').service('resetService', resetService);
}
