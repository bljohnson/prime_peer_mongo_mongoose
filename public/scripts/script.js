console.log('this works');


var myApp=angular.module( 'myApp', [] );
// create a controller
myApp.controller( 'assignmentController', [ '$scope', '$http', function( $scope, $http ){
  $scope.addRecord = function(){
    event.preventDefault();
    // get the user input and store in an object
    var objectToSend ={
      name: $scope.studentNameIn,
      assignment: $scope.assignmentNumberIn,
      score: $scope.scoreIn,
      date: $scope.dateIn
    };
    // make a call to server with object to be stored in DB
    $http({
      method: 'POST',
      url: '/postAssignment',
      data: objectToSend
    });
    // clear inputs
    $scope.studentNameIn ='';
    $scope.assignmentNumberIn ='';
    $scope.scoreIn ='';
    $scope.dateIn =''; // THIS DOESN'T CLEAR YET
  }; // end addRecord
}]); // end controller
