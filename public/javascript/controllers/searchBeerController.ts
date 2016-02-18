"use strict";
namespace app.Controllers {
    export class searchBeerController {
        public beer;
        public result;
        public brew;
        public breweries;
        public mybeer;
        public chosen;
        public hide = false;







        public searchBeer() {
            this.homeService.searchBeer(this.beer).then((res) => {
                this.result = res;
            })
        }

        public getMyBeer(mybeer)   {
            this.homeService.getMyBeer(this.mybeer).then((res) => {
                this.chosen = res;
            })
        }
        public searchBrew(brew) {
            this.homeService.getBrew(this.brew).then((res) => {
                this.breweries = res;
            });
        }
        public show()   {
                this.hide = true;
            }

        constructor(
          private homeService: app.Services.homeService,
          private $location: ng.ILocationService,
          private $routeParams: ng.route.IRouteParamsService
        ){
        }
    }
    angular.module("app").controller("searchBeerController",searchBeerController)
}
