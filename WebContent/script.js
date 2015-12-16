angular.module('ionicApp', ['ionic'])

.controller('MyCtrl', function($scope, $ionicModal, $http, $ionicPopup, $ionicLoading, $ionicSideMenuDelegate,$ionicScrollDelegate) {
	$scope.myTitle = 'Any Information!!!';

	$scope.params={};
	$scope.params.infoTitle = '';
	$scope.params.infoCategory = '';
	$scope.params.information = '';
	$scope.params.items = [];
	$scope.modal = null;
	$scope.params.currentCategory = "";
	$scope.params.lastDate = "";
	$scope.params.moreData = false;
	$scope.params.categoryList = [];
	$scope.params.isHomePage = true;
	$scope.params.isCategoryPage = false;
	$scope.params.sideMenuList = [];
	
	fetchMenuList();
	
	function resetToHome(){
		$scope.params.items = [];
		$scope.params.currentCategory = "";
		$scope.params.lastDate = "";
		$scope.params.moreData = false;
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
		},function(response){
			
		});
	}
	
	function checkCount(){
		$http({method:"POST",
			url:"/INFOAPP/rest/info/count",
			data:{category:$scope.params.currentCategory, datetime:$scope.params.lastDate}}
		).then(function(response){
			var data = response.data;
			$scope.params.moreData = parseInt(data.no)?false:true;
			console.log($scope.params.moreData);
		},function(response){
			
		});
	}
	
	function populateInfo(){
		if(!$scope.params.lastDate){
			$scope.params.items = [];
		}
		$http({method:"POST",
			url:"/INFOAPP/rest/info/fetch",
			data:{category:$scope.params.currentCategory, datetime:$scope.params.lastDate}}
		).then(function(response){
			var data = response.data;
			if(data){
				if(!$scope.params.lastDate){
					$scope.params.items = [];
				}
				for(var temp in data){
					$scope.params.items.push(data[temp]);
					$scope.params.lastDate = data[temp].datetime;
				}
			}else{
				if(!$scope.params.lastDate){	
					$scope.params.items = [];
					$scope.params.items.push({title:"No Information available",information:""});
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
	
	/*$scope.aboutInfoApp = function(){
		$ionicPopup.alert({
		     title: 'About us',
		     template: '<div style="text-align:center;">A platform to share information from you and for you. <br/><br/> For any suggestions, please mail us at <a href="mailto:contact@jantakhabar.com">contact@jantakhabar.com</a></div>'
		   });
	};*/
	
	//populateInfo();
	$scope.showHomePage = function(){
		$scope.params.isHomePage = true;
		$scope.params.isCategoryPage = false;
		resetToHome();
		$ionicScrollDelegate.scrollTop(true);
	};
	
	$scope.showMenu = function(){
		$ionicSideMenuDelegate.toggleLeft();
	};
	
	$scope.showMenuPage = function(menuItem){
		$ionicSideMenuDelegate.toggleLeft();
		if(menuItem.id == "1"){
			$scope.params.isHomePage = false;
			$scope.params.isCategoryPage = true;
		}
		if(menuItem.id == "2"){
			$ionicPopup.alert({
			     title: 'About',
			     template: '<div style="text-align:center;">A platform to share information from you and for you.</div>'
			   });
		}
		if(menuItem.id == "3"){
			$ionicPopup.alert({
			     title: 'Contact Us',
			     template: '<div style="text-align:center;">For any suggestions or any other information, please mail us at <a href="mailto:contact@jantakhabar.com">contact@jantakhabar.com</a></div>'
			   });
		}
	};
	
	$scope.showCategoryInfo = function(category){
		$scope.params.currentCategory = category.id;
		$scope.params.lastDate = "";
		$scope.params.isHomePage = true;
		$scope.params.isCategoryPage = false;
		$scope.params.moreData = false;
		$scope.params.items = [];
		//populateInfo();
		$ionicScrollDelegate.scrollTop(true);
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
			
		},function(){
			
		});
	};
		
	$scope.loadMore = function(){
		populateInfo($scope.params.lastDate);
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
		$ionicModal.fromTemplateUrl('post.html', {
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
