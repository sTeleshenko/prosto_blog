"use strict";
var app = angular.module("blogApp", [
    'ngAria',
    'ngAnimate',
    'ngMessages',
    'ngMaterial',
    'ngComponentRouter'
]);
app.value('$routerRootComponent', 'mainComponent');