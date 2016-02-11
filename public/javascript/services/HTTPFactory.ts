"use strict";
namespace app.Services {
  angular.module('app').factory('HTTPFactory', ($window: ng.IWindowService) => {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        config.headers['Accepts'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        if ($window.localStorage.getItem('token')) {
          // Bearer token
          config.headers['Authorization'] = `Bearer ${$window.localStorage.getItem('token')}`;
        }
        return config;
      }
    }
  });
}
