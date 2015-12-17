angular.module('ionicApp')
.controller('MyCtrl', function($scope, $ionicModal, $http, $ionicPopup, $ionicLoading, $ionicSideMenuDelegate,$ionicScrollDelegate, $state, $ionicHistory) {
	$scope.myTitle = 'Any Information!!!';

	$scope.params={};
	$scope.params.infoTitle = '';
	$scope.params.infoCategory = '';
	$scope.params.information = '';
	$scope.params.items = [];
	$scope.modal = null;
	$scope.params.currentCategory = "";
	$scope.params.currentTitle = "";
	$scope.params.currentInformation = "";
	$scope.params.lastDate = "";
	$scope.params.lastRefreshDate = "";
	$scope.params.moreData = false;
	$scope.params.categoryList = [];
	$scope.params.sideMenuList = [];
	$scope.params.showPostInfo = true;
	
	$scope.params.searchText = "";
	$scope.params.searchCategory = "";
	$scope.params.searchItems = [];
	
	var localCreatedData= [];
	
	fetchMenuList();
	
	function resetToHome(){
		$scope.params.items = [];
		$scope.params.currentCategory = "";
		$scope.params.currentTitle = "";
		$scope.params.currentInformation = "";
		$scope.params.lastDate = "";
		$scope.params.lastRefreshDate = "";
		$scope.params.moreData = false;
		localCreatedData = [];
		//populateInfo();
	}
	
	function fetchMenuList(){
		$http({method:"POST",
			url:"/INFOAPP/rest/menu/get"}
		).then(function(response){
			$scope.params.sideMenuList = response.data;
			fetchCategoryList();
		},function(response){
			
		});
	}
	
	function fetchCategoryList(){
		$http({method:"POST",
			url:"/INFOAPP/rest/info/categoryList"}
		).then(function(response){
			$scope.params.categoryList = response.data;
			$state.go("index");
		},function(response){
			
		});
	}
	
	function checkCount(){
		$http({method:"POST",
			url:"/INFOAPP/rest/info/count",
			data:{title: $scope.params.currentTitle, information : $scope.params.currentInformation, category:$scope.params.currentCategory, datetime:$scope.params.lastDate}}
		).then(function(response){
			var data = response.data;
			$scope.params.moreData = parseInt(data.no)?false:true;
		},function(response){
			
		});
	}
	
	function populateInfo(){
		if(!$scope.params.lastDate){
			$scope.params.items = [];
		}
		$http({method:"POST",
			url:"/INFOAPP/rest/info/fetch",
			data:{title: $scope.params.currentTitle, information : $scope.params.currentInformation, category:$scope.params.currentCategory, datetime:$scope.params.lastDate}}
		).then(function(response){
			var data = response.data;
			if(data && data.length!=0){
				if(!$scope.params.lastDate){
					$scope.params.items = [];
				}
				if(!$scope.params.lastRefreshDate){
					$scope.params.lastRefreshDate = data[0].datetime;
				}
				for(var temp in data){
					$scope.params.items.push(data[temp]);
					$scope.params.lastDate = data[temp].datetime;
				}
			}
			checkCount();
			$scope.$broadcast('scroll.infiniteScrollComplete');
		},function(response){
			$ionicPopup.alert({
				template: 'Error fetching the Information'
			});
		});
	}
	
	//populateInfo();
	$scope.showHomePage = function(){
		resetToHome();
		$ionicScrollDelegate.scrollTop(true);
		$state.go("index");
	};
	
	$scope.showMenu = function(){
		$ionicSideMenuDelegate.toggleLeft();
	};
	
	$scope.showMenuPage = function(menuItem){
		$ionicSideMenuDelegate.toggleLeft();
		$state.go(menuItem.code);
	};
	
	$scope.showCategoryInfo = function(category){
		$scope.params.currentCategory = category.id;
		$scope.params.currentTitle = "";
		$scope.params.currentInformation = "";
		$scope.params.lastDate = "";
		$scope.params.lastRefreshDate = "";
		$scope.params.moreData = false;
		$scope.params.items = [];
		localCreatedData = [];
		//populateInfo();
		$ionicScrollDelegate.scrollTop(true);
		$state.go("index");
	};
	
	
	$scope.showSearchInfo = function(){
		if(!$scope.params.searchCategory && !$scope.params.searchText){
			$scope.params.currentCategory = "";
			$scope.params.currentTitle = "";
			$scope.params.currentInformation = "";
		}else{
			$scope.params.currentCategory = $scope.params.searchCategory;
			$scope.params.currentTitle = $scope.params.searchText;
			$scope.params.currentInformation = $scope.params.searchText;
		}
		$scope.params.lastDate = "";
		$scope.params.lastRefreshDate = "";
		$scope.params.moreData = false;
		$scope.params.items = [];
		localCreatedData = [];
		//populateInfo();
		$ionicScrollDelegate.scrollTop(true);
		$state.go("index");
	};
	
	$scope.checkInfoCount = function(){
		checkCount();
	};
	
	$scope.showInfo = function(info){
		$ionicPopup.show({
			title: 'Information',
			template: info.information,
		    buttons: [
		      { text: 'Close' }]
		});
	};
	
	$scope.updateLikes = function(info, $event){
		$event.stopPropagation();
		info.likes = (Number(info.likes)+1)+"";
		$http({method:"POST",
			url:"/INFOAPP/rest/info/updateLikes",
			data:info}
		).then(function(response){
			localCreatedData[response.data.createdDate] = true;
		},function(){
			
		});
	};
	
	$scope.updateDislikes = function(info, $event){
		$event.stopPropagation();
		info.dislikes = (Number(info.dislikes)+1)+"";
		
		$http({method:"POST",
			url:"/INFOAPP/rest/info/updateDislikes",
			data:info}
		).then(function(response){
			localCreatedData[response.data.createdDate] = true;
		},function(){
			
		});
	};
		
	$scope.loadMore = function(){
		populateInfo();
	};
	
	$scope.doRefresh = function(){
		
		$http({method:"POST",
			url:"/INFOAPP/rest/info/pullToRefresh",
			data:{title: $scope.params.currentTitle, information : $scope.params.currentInformation, category:$scope.params.currentCategory, datetime:$scope.params.lastRefreshDate}}
		).then(function(response){
			var data = response.data;
			if(data){
				for(var temp in data){
					if(!localCreatedData[data[temp].createdDate]){
						$scope.params.items.splice(0,0,data[temp]);	
					}
					
					$scope.params.lastRefreshDate = data[temp].datetime;
				}
			}
			$scope.$broadcast('scroll.refreshComplete');
		},function(response){
			$ionicPopup.alert({
				template: 'Error fetching the Information'
			});
		});
		
	};
	
	$scope.scrollToTop = function(){
		$ionicScrollDelegate.scrollTop(true);
	};
	
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
		).then(function(response){
			$ionicLoading.hide();
			var data = response.data;
			if(!$scope.params.lastDate){
				$scope.params.items = [];
				$scope.params.items.push(data);
			}else{
				$scope.params.items.splice(0,0,data);
			}
			localCreatedData[data.createdDate] = true;
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
			template: '<ion-spinner icon="spiral"></ion-spinner> Posting info...'
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
		$ionicModal.fromTemplateUrl('modules/post.html', {
			scope: $scope,
			backdropClickToClose:false,
			hardwareBackButtonClose:false,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});

	};

	$scope.$on('$ionicView.afterEnter', function(){
		setTimeout(function() {
			$ionicScrollDelegate.scrollTop(true);
		},0);
		if($ionicHistory.currentStateName() == "index"){
			$scope.params.showPostInfo = true;
		}else{
			$scope.params.showPostInfo = false;
		}
		if($ionicHistory.currentStateName() == "searchinfo"){
			$scope.params.searchText = "";
			$scope.params.searchCategory = "";
		}
	});
	
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