"use strict";
namespace app.Controllers{
    export class updateUserController {
        public updateUser;



        public update() {
            let updateUser = {
                username: this.updateUser.username,
                email: this.updateUser.email,
                avatarUrl: this.updateUser.avatarUrl,
                old_password: this.updateUser.password,
                new_password: this.updateUser.newpassword,
                pwdConfirm: this.updateUser.pwdConfirm
            };
            if (this.updateUser.newpassword === this.updateUser.pwdConfirm) {
                this.userService.updateUser(this.updateUser).then((res:any) => {
                    this.userService.setToken(res.token);
                    this.userService.setUser();
                    this.$window.localStorage.setItem("username", this.updateUser.username);
                    this.$location.path('/updateUser');
                    this.ngToast.success({
                        content: "Congrats your profile changes have been saved!",
                        horizontalPosition: "right",
                        timeout: 1200
                    })
                });
            }
        }

        constructor(
            private userService: app.Services.userService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteParamsService,
            private $window: ng.IWindowService,
            private ngToast
        ){
            this.updateUser = angular.copy(userService.status);
        }
    }
    angular.module("app").controller("updateUserController",updateUserController);
}
