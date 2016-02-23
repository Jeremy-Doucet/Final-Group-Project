var app;
(function (app) {
    var Directives;
    (function (Directives) {
        function backButton() {
            return {
                restrict: 'A',
                link: function ($scope, $element) {
                    $element.bind("click", function () {
                        history.back();
                    });
                }
            };
        }
        Directives.backButton = backButton;
        angular.module("app").directive("backButton", backButton);
    })(Directives = app.Directives || (app.Directives = {}));
})(app || (app = {}));
