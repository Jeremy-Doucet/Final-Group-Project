"use strict";

namespace app.Services {

  export class userService {

    public uRegResource;
    public uLoginResource;

    public uHomeResource;

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

    public setUser() {
      let user = JSON.parse(
        atob(this.$window.localStorage.getItem("token")
        .split(".")[1] ));
    };

    public loadUHome(username) {
      return this.uHomeResource.get({username: username});
    };

    public removeToken() {
      this.$window.localStorage.clear();
    };

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService
    ) {
      this.uRegResource = $resource("/usershell/register");
      this.uLoginResource = $resource("/usershell/login");
      this.uHomeResource = $resource("/usershell/:username");

      if (this.getToken()) this.setUser();
    };
  };

  angular.module("app").service("userService", userService);
};