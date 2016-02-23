'use strict';

namespace app.Controllers {
    export class beerCreateController {
        public beer:any = {name:"",beerdesc:"",imgbeer:"",brewerydb:{abv:"",breweryName:"",beerType:"",labelImg:"",breweryUrl:"",breweryDesc:"",organic:""}};
        public mybeer;
        public brew:any;
        public hide = false;

        public createBeer() {
          this.homeService.saveBeer(this.beer).then((res) => {
            this.$location.path('/beerPage');
          });
        };

        public show()   {
            this.hide = true;
        }
    
        constructor(
            private homeService: app.Services.homeService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteParamsService
        ) {
            homeService.getBrew( $routeParams["id"]).then((res) => {
                if (!res.data[0].images)res.data[0].images = {};
                this.brew = res.data;
                this.beer.brewerydb.breweryName = res.data[0].name;
                this.beer.brewerydb.labelImg = res.data[0].images.squareMedium;
                this.beer.brewerydb.breweryDesc = res.data[0].description;
                this.beer.brewerydb.breweryUrl = res.data[0].website;
            });
            homeService.getMyBeer( $routeParams["id"]).then((res:any) =>{
                this.mybeer = res.data;
                this.beer.name = res.data.name;
                this.beer.brewerydb.abv = res.data.abv;
                this.beer.brewerydb.beerType = res.data.style.shortName;
                this.beer.brewerydb.organic = res.data.isOrganic;
                this.beer.imgbeer = res.data.labels.medium;
                this.beer.beerdesc = res.data.style.description;

            });
        };
      };
      angular.module('app').controller('beerCreateController', beerCreateController);
    };
