"use strict";

namespace app.Controllers {

  export class userController {

    public newUser;
    public user;

    public register() {
      let newUser = {
      username: this.newUser.username,
      email: this.newUser.email,
      avatarUrl: this.newUser.avatarUrl,
      password: this.newUser.password,
      pwdConfirm: this.newUser.pwdConfirm
      };
      if (this.newUser.password === this.newUser.pwdConfirm) {
        this.userService.registerUser(this.newUser).then((res) => {
          this.userService.setToken(res.token);
          this.userService.setUser();
          this.$window.localStorage.setItem("username", this.newUser.username);
          this.$location.path('/myprofile');
        });
      } else {
        alert("Passwords do not match");
      }
    };

    public login() {
      this.userService.login(this.user).then((res) => {
        this.userService.setToken(res.token);
        this.userService.setUser();
        this.$window.localStorage.setItem("username", this.user.username);
        this.$location.path("/");
      });
    };

    constructor(
      private userService: app.Services.userService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService,
      private $window: ng.IWindowService
    ) {};
  };

  angular.module("app").controller("userController", userController);
};
