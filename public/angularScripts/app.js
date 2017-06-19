
var app=angular.module("app",['controllers',"ngRoute"]);

app.config(function($routeProvider,$locationProvider){
  $routeProvider.
        when("/",{
            redirectTo:"/home"
        })
        .when("/home",{
          templateUrl:"./partials/home.html",
          controller:"home"
        })
        .when("/sendSMS",{
          templateUrl:"./partials/sendSMS.html",
          controller:"sendSMS"
        })
        .otherwise({
          redirectTo:"/home"
        })
});
