var app = angular.module("CrudDemoApp", ["CrudDemoApp.controller", "ngRoute"]);
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
        when("/", { templateUrl: "/Partials/PlayerList.html", controller: "SecondController" }).
        when("/AddPlayer", { templateUrl: "/Partials/AddPlayer.html", controller: "AddController" }).
        when("/EditPlayer/:id", { templateUrl: "/Partials/EditPlayer.html", controller: "EditController" }).
    otherwise({ redirectTo: "/" });
}])