"use strict";
namespace app.Services {
  angular.module('app').factory('HTTPFactory', ($window) => {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        config.headers['Accepts'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        return config;
      }
    }
  });
}
