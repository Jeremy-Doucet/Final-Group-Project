var app;
(function (app) {
    var Directives;
    (function (Directives) {
        function autofocusDirective($timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element) {
                    $timeout(function () {
                        $element[0].focus();
                    });
                }
            };
        }
        Directives.autofocusDirective = autofocusDirective;
        angular.module("app").directive("autofocus", ["$timeout", autofocusDirective]);
    })(Directives = app.Directives || (app.Directives = {}));
})(app || (app = {}));
