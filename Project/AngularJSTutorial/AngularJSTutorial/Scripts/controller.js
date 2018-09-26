angular.module("CrudDemoApp.controller",[]).
controller("MainController",function($scope) {
    $scope.message = "@andrinurwakhid";
//
}).controller("SecondController", function ($scope, PlayerService) {
    $scope.message = "Demo Version";
    PlayerService.GetPlayersFromDB().then(function(x) {
        $scope.listPlayers = x.data.list;
    })
    $scope.DeletePlayer = function (id,index) {
        $scope.listPlayers.splice(index, 1);
        PlayerService.DeletePlayer(id);
    }
//
}).controller("AddController", function ($scope,PlayerService) {
    $scope.message = "Add Player Detail";
    $scope.AddPlayer = function () {
        PlayerService.AddPlayer($scope.player);
    }
//
}).controller("EditController", function ($scope, PlayerService,$routeParams) {
    $scope.message = "Edit Player Detail";
    var id = $routeParams.id;
    PlayerService.GetPlayerById(id).then(function(e) {
        $scope.player = e.data.player;
    })
    $scope.UpdatePlayer = function () {
        PlayerService.UpdatePlayer($scope.player);
        return '/#!/';
        $scope.player = "";
    }
}).
//
factory("PlayerService", ["$http", function ($http) {
    var fac = [];
    fac.GetPlayersFromDB = function () {
        return $http.get("/Player/GetPlayers");
    }
    fac.GetPlayerById = function (id) {
        return $http.get("/Player/GetPlayerById",{ params: { id: id } });
    }
    fac.AddPlayer = function (player) {
        return $http.post("/Player/AddPlayer", player).success(function (response) {
            alert(response.status);
        })
    }
    fac.UpdatePlayer = function (player) {
        return $http.post("/Player/UpdatePlayer", player).success(function (response) {
            alert(response.status);
        })
    }

    fac.DeletePlayer = function (id) {
        return $http.post("/Player/DeletePlayer", {id:id}).success(function (response) {
            alert(response.status);
        })
    }
    return fac;
}])
