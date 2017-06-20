var controllers=angular.module("controllers",[]);

controllers.controller("home",function($scope,$location,$http){
  console.log("###################");

  var showReports=function(view){
    console.log(view);
    if(view==='sendSMS'){
      $location.path('/sendSMS');
    }else{
      $location.path('/portfolio');
    }
  }
  var signUpFB=function(){
    console.log("got the FB login request");
    $http.get('/auth/facebook').then(function(response) {
    console.log(response.data);

  });
  }
    $scope.signUpFB=signUpFB;
  $scope.showReports=showReports;
});

controllers.controller("sendSMS",function($scope,$http){
  $scope.sent;
  console.log("$$$$$$$$$$$$$$");
  var sendSMSFunc=function(){
	  console.log($scope.details);
	  $http.post('/sendSMS', $scope.details).then(function(response) {
//    console.log(response.data);
console.log("success response from the server");
    $scope.sent=true;
  },function myError(res){
    console.log("error response from the server");
    $scope.sent=false;
  });
}


  $scope.sendSMSFunc=sendSMSFunc;

});
