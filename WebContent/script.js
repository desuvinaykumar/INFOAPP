angular.module('ionicApp', ['ionic'])

.controller('MyCtrl', function($scope, $ionicModal, $http, $ionicPopup, $ionicLoading) {
  $scope.myTitle = 'Any Information!!!';
  
  $scope.params={};
  $scope.params.infoTitle = '';
  $scope.params.infoCategory = '';
  $scope.params.information = '';
	$scope.modal = null;
  $scope.postInfo = function() {
	
	  if(!$scope.params.infoTitle || !$scope.params.information || !$scope.params.infoCategory){
			$ionicPopup.alert({
			     template: 'Please fill all the fields'
			   });
			return;
		}
	  
	var data = {title : $scope.params.infoTitle, information: $scope.params.information, category : $scope.params.infoCategory};
    $http({method:"POST",
			url:"/INFOAPP/rest/info/create",
			data:data}
	).then(function(){
		$ionicLoading.hide();
		$ionicLoading.show({
		      template: '<div style="color:green">Information posted</div>'
		    });
		setTimeout(function(){
			$ionicLoading.hide();
		}, 3000);
	},function(){
		$ionicLoading.hide();
		$ionicLoading.show({
		      template: '<div style="color:red">Error in posting information</div>'
		    });
		setTimeout(function(){
			$ionicLoading.hide();
		}, 3000);
	});
    $scope.modal.hide();
	$scope.modal.remove();
	$ionicLoading.show({
	      template: 'Posting info...'
	    });
  };
  
  $scope.closeInfo = function() {
	$scope.modal.hide();
	$scope.modal.remove();
  };
  

  $scope.doSomething = function() {
	  $scope.params.infoTitle = '';
		$scope.params.infoCategory = '';
		$scope.params.information = '';
	  $ionicModal.fromTemplateUrl('my-modal.html', {
		scope: $scope,
		backdropClickToClose:false,
		hardwareBackButtonClose:false,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
		$scope.modal.show();
	  });

  };
  
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});