"use strict";

namespace app.Controllers {

  export class uCtrl {

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
        this.uSvc.registerUser(this.newUser).then((res) => {
          this.uSvc.setToken(res.token);
          this.uSvc.setUser();
          this.$window.localStorage.setItem("username", this.newUser.username);
          this.$location.path(this.newUser.username);
        });
      } else {
        alert("Passwords do not match");
      }
    };

    public login() {
      this.uSvc.login(this.user).then((res) => {
        this.uSvc.setToken(res.token);
        this.uSvc.setUser();
        this.$window.localStorage.setItem("username", this.user.username);
        this.$location.path(this.user.username);
      });
    };

    constructor(
      private uSvc: app.Services.uSvc,
      private $location: ng.ILocationService,
      private $window: ng.IWindowService
    ) {};
  };

  angular.module("app").controller("uCtrl", uCtrl);
};
