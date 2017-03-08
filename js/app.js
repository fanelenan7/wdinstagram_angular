"use strict";

angular
        .module("wdinstagram", [
          "ui.router",
          "ngResource"
        ])
        .config([
          "$stateProvider",
          RouterFunction
        ])
        .factory("WDInstagramFactory", [
          "$resource",
          WDInstagramFactoryFunction
        ])
        .controller("WDInstagramIndexController", [
          "WDInstagramFactory",
          WDInstagramIndexControllerFunction
        ])
        .controller("WDInstagramNewController", [
          "WDInstagramFactory",
          "$state",
          WDInstagramNewControllerFunction
        ])
        .controller("WDInstagramShowController", [
          "WDInstagramFactory",
          "$stateParams",
          WDInstagramShowControllerFunction
        ])
        .controller("WDInstagramEditController", [
          "WDInstagramFactory",
          "$stateParams",
          "$state",
          WDInstagramEditControllerFunction
        ])

function RouterFunction($stateProvider) {
  $stateProvider
                .state("WDInstagramIndex", {
                  url: "/entries",
                  templateUrl: "js/ng-views/index.html",
                  controller: "WDInstagramIndexController",
                  controllerAs: "vm"
                })
                .state("WDInstagramNew", {
                  url: "/entries/new",
                  templateUrl: "js/ng-views/new.html",
                  controller: "WDInstagramNewController",
                  controllerAs: "vm"
                })
                .state("WDInstagramShow", {
                  url: "/entries/:id",
                  templateUrl: "js/ng-views/show.html",
                  controller: "WDInstagramShowController",
                  controllerAs: "vm"
                })
                .state("WDInstagramEdit", {
                  url: "/entry/:id/edit",
                  templateUrl: "js/ng-views/edit.html",
                  controller: "WDInstagramEditController",
                  controllerAs: "vm"
                })
}

function WDInstagramFactoryFunction($resource) {
  return $resource("http://localhost:3000/entries/:id", {}, {
    update: { method: "PUT" }
  })
}

function WDInstagramIndexControllerFunction(WDInstagramFactory) {
  this.entries = WDInstagramFactory.query()
}

function WDInstagramNewControllerFunction(WDInstagramFactory, $state) {
  this.entry = new WDInstagramFactory()
  this.create = () => {
    this.entry.$save( (entry) => {
      $state.go("WDInstagramShow", {id: entry.id})
    })
  }
}

function WDInstagramShowControllerFunction(WDInstagramFactory, $stateParams) {
  this.entry = WDInstagramFactory.get({id: $stateParams.id})
}

function WDInstagramEditControllerFunction(WDInstagramFactory, $stateParams, $state) {
  this.entry = WDInstagramFactory.get({id: $stateParams.id})
  this.update = () => {
    this.entry.$update({id: $stateParams.id}, (entry) => {
      $state.go("WDInstagramShow", {id: entry.id})
    })
  }
}
