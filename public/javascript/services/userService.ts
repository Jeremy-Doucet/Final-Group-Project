"use strict";

namespace app.Services {

  export class userService {
    public status = { _id: null, email: null, username: null, avatarUrl: null };
    public uRegResource;
    public uLoginResource;

    public registerUser(newUser) {
      return this.uRegResource.save(newUser).$promise;
    };

    public login(user) {
      return this.uLoginResource.save(user).$promise;
    };

    public setToken(token) {
      this.$window.localStorage.setItem("token", token);
    };

    public getToken() {
      return this.$window.localStorage.getItem("token");
    };

    public removeToken() {
      this.$window.localStorage.clear();
    };

    public setUser() {
      let user = JSON.parse(
        atob(this.$window.localStorage.getItem("token").split(".")[1] ));
        this.status._id = user._id;
        this.status.email = user.email;
        this.status.username = user.username;
        this.status.avatarUrl = user.avatarUrl;
    };

    public removeUser(){
      this.status._id = null;
      this.status.email = null;
      this.status.username = null;
      this.status.avatarUrl = null;
    }


    public getUser(userId){
      var q = this.$q.defer();
      this.$http.get('/usershell/users/' + userId).then(function(res){
        q.resolve(res.data);
      }, function(err){
        q.reject(err);
      });
      return q.promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService,
      private $http: ng.IHttpService,
      private $q: ng.IQService
    ) {
      this.uRegResource = $resource("/usershell/register");
      this.uLoginResource = $resource("/usershell/login");
      if (this.getToken()) this.setUser();
    };
  };

  angular.module("app").service("userService", userService);
};
