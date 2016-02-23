'use strict';

namespace app.Directives {

  export function autofocusDirective($timeout) {
    return {
      restrict: 'A',
      link: function($scope, $element) {
        $timeout(function() {
          $element[0].focus();
        });
      }
    }
  };

  angular.module("app").directive("autofocus",["$timeout",autofocusDirective]);
};
