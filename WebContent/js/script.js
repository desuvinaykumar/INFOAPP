angular.module('ionicApp')
.controller('MyCtrl', function($scope, $ionicModal, $http, $ionicPopup, $ionicLoading, $ionicSideMenuDelegate,$ionicScrollDelegate, $state, $ionicHistory, $rootScope, Token) {
	
	if(mobileAndTabletcheck()){
		loadJS("cordova.js");
		document.addEventListener("deviceready",
				deviceReadyFunc, false);
	}
	
	$scope.myTitle = 'Any Information!!!';

	$scope.params={};
	$scope.params.searchStyle = {};
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
	$scope.params.easyCategoryList = [];
	$scope.params.showPostInfo = true;
	
	$scope.params.searchText = "";
	$scope.params.searchCategory = "";
	$scope.params.searchItems = [];
	
	$scope.params.hideMenu = false;
	
	$scope.params.userInformation = {
			picture:"",
			name:"",
			gender:"",
			email:""
	};
	
	$scope.params.contact = {
			name : "",
			suggestion : ""
	};
	
	var localCreatedData= [];
	
	fetchMenuList();
	
	function goToPage(pageid){
		$state.go("layout."+pageid);
	}
	
	function resetToHome(){
		$scope.params.searchStyle = {};
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
			url:getURL("rest/menu/get")}
		).then(function(response){
			$scope.params.sideMenuList = response.data;
			fetchCategoryList();
		},function(response){
			
		});
	}
	
	function fetchCategoryList(){
		$http({method:"POST",
			url:getURL("rest/info/categoryList")}
		).then(function(response){
			$scope.params.categoryList = response.data;
			
			for(var i in response.data){
				$scope.params.easyCategoryList["C"+response.data[i]["id"]]=response.data[i]["desc"];
			}
			if(Token.get()){
				updateUserInfoFromGoogle(function(){
					goToPage("index");
				},function(){
					$state.go("welcome");
				});
			}else{
				$state.go("welcome");
			}
		},function(response){
			
		});
	}
	
	function checkCount(){
		$http({method:"POST",
			url:getURL("rest/info/count"),
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
			url:getURL("rest/info/fetch"),
			data:{title: $scope.params.currentTitle, information : $scope.params.currentInformation, category:$scope.params.currentCategory, datetime:$scope.params.lastDate, email : $scope.params.userInformation.email}}
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
			}else{
				if(!$scope.params.lastDate){
					$scope.params.items = [];
					$scope.params.items.push({"title":"No information found", "hideInfo":true});
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
		goToPage("index");
	};
	
	$scope.showMenu = function(){
		$ionicSideMenuDelegate.toggleLeft();
	};
	
	$scope.showMenuPage = function(menuItem){
		$ionicSideMenuDelegate.toggleLeft();
		goToPage(menuItem.code);
	};
	
	$scope.showCategoryInfo = function(category){
		$scope.params.currentCategory = category.id;
		$scope.params.searchStyle = {'padding-top':'30px'};
		$scope.params.currentTitle = "";
		$scope.params.currentInformation = "";
		$scope.params.lastDate = "";
		$scope.params.lastRefreshDate = "";
		$scope.params.moreData = false;
		$scope.params.items = [];
		localCreatedData = [];
		//populateInfo();
		$ionicScrollDelegate.scrollTop(true);
		goToPage("index");
	};
	
	
	$scope.showSearchInfo = function(){
		if(!$scope.params.searchCategory && !$scope.params.searchText){
			$scope.params.currentCategory = "";
			$scope.params.currentTitle = "";
			$scope.params.currentInformation = "";
			$ionicPopup.alert({
				template: 'Enter some text or select a criteria to search'
			});
			return;
		}else{
			$scope.params.currentCategory = $scope.params.searchCategory;
			$scope.params.currentTitle = $scope.params.searchText;
			$scope.params.currentInformation = $scope.params.searchText;
		}
		
		$http({method:"POST",
			url:getURL("rest/info/count"),
			data:{title: $scope.params.currentTitle, information : $scope.params.currentInformation, category:$scope.params.currentCategory}}
		).then(function(response){
			var data = response.data;
			if(parseInt(data.no)){
				$scope.params.lastDate = "";
				$scope.params.lastRefreshDate = "";
				$scope.params.moreData = false;
				$scope.params.items = [];
				$scope.params.searchStyle = {'padding-top':'30px'};
				localCreatedData = [];
				//populateInfo();
				$ionicScrollDelegate.scrollTop(true);
				goToPage("index");
			}else{
				$ionicPopup.alert({
					template: 'No information found with the search criteria'
				});
			}
		},function(response){
			
		});
		
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
			url:getURL("rest/info/updateLikes"),
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
			url:getURL("rest/info/updateDislikes"),
			data:info}
		).then(function(response){
			localCreatedData[response.data.createdDate] = true;
		},function(){
			
		});
	};
	
	$scope.isFavorite = function(info){
		if(Number(info.bookmarked) == 0){
			return "ion-star";
		}
		return "ion-star-favorite";
	};
	
	$scope.setFavorite = function(info, $event){
		$event.stopPropagation();
		if(!checkLoggedIn("Please login to store your favorite information.")){
			return;
		}
		
		$http({method:"POST",
			url:getURL("rest/favoriteinfo/update"),
			data:{title:info.title, createdDate : info.createdDate, email : $scope.params.userInformation.email}}
		).then(function(response){
			if(Number(info.bookmarked) == 0){
				info.bookmarked = 1;
			}else{
				info.bookmarked = 0;
			}
		},function(){
			$ionicPopup.alert({
				template: 'Error storing favorites'
			});
		});
		
	};
		
	$scope.loadMore = function(){
		populateInfo();
	};
	
	$scope.doRefresh = function(){
		
		$http({method:"POST",
			url:getURL("rest/info/pullToRefresh"),
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
	
	$scope.goToIndex = function(){
		goToPage("index");
		$ionicScrollDelegate.scrollTop(true);
	};
	
	$scope.accessToken = Token.get();
	
	$scope.googleLogout = function(){
		Token.clear();
		$scope.accessToken = null;
		$scope.expiresIn = 0;
		$scope.params.userInformation = {
				picture:"",
				name:"",
				gender:"",
				email:""
		};
	};
	
	$scope.submitSuggestion = function(){
		if(!checkLoggedIn("Please login to submit your suggestions.")){
			return;
		}
		$ionicLoading.show();		
		$http({method:"POST",
			url:getURL("rest/contactus/submit"),
			data:{email : $scope.params.userInformation.email, suggestion : $scope.params.contact.suggestion}
		})
		.then(function(success){
			$ionicLoading.hide();
			$ionicPopup.show({
				template: success.data.successMsg?success.data.successMsg:success.data.errorMsg,
						buttons: [{
							text : "Ok",
							type : "button-positive",
							onTap : function(e){
								goToPage("index");
							}
						}]
			});
		}, function(error){
			$ionicLoading.hide();
			$ionicPopup.alert({
				template: 'Error in the network'
			});
		});
		
	};
	
	function updateUserInfoFromGoogle(successCallBack, errorCallBack){
		Token.userInfo(Token.get()).then(function(data){
			$scope.params.userInformation = {
					picture:data.picture,
					name:data.name,
					gender:data.gender,
					email:data.email
			};
			
			$http({method:"POST",
				url:getURL("rest/userinformation/update"),
				data:{email : data.email, name: data.name, picture : data.picture, gender : data.gender}}
			);
			
			if(successCallBack){
				successCallBack();
			}
		},function(){
			Token.clear();
			$scope.params.userInformation = {
					picture:"",
					name:"",
					gender:"",
					email:""
			};
			if(errorCallBack){
				errorCallBack();
			}
		});
	}
	
	
	$scope.googleSignIn = function(){
		
		/*if(mobileAndTabletcheck()){
			$ionicPopup.alert({
				template: 'Google signin for mobile is in progress. Thanks for your patience.'
			});
			return;
		}*/
		
		var w  = 450;
        var h = 500;
		var left = (window.screen.width / 2) - ((w / 2) + 10);
	    var top = (window.screen.height / 2) - ((h / 2) + 50);
	    
	    /*if(mobileAndTabletcheck()){
	    	Token.getTokenInSameWindow({redirect_uri: getURL('oauth2nativecallback.html')});
	    	return;
	    }*/

		Token.getTokenByPopup({display:"popup"}, {openParams:{width: w, height:h, left : left, top : top}})
		//Token.getTokenInSameWindow()
		.then(function(params) {
			// Success getting token from popup.

			// Verify the token before setting it, to avoid the confused deputy problem.
			Token.verifyAsync(params.access_token).
			then(function(data) {
				$rootScope.$apply(function() {
					$scope.accessToken = params.access_token;
					$scope.expiresIn = params.expires_in;

					Token.set(params.access_token);
				});
				updateUserInfoFromGoogle(function(){
					goToPage("index");
					$ionicScrollDelegate.scrollTop(true); 
				},function(){
					$ionicPopup.alert({
						template: 'Failed to Login'
					});
				});
			}, function() {
				$ionicPopup.alert({
					template: 'Failed to verify user from Google'
				});
			});

		}, function() {
			// Failure getting token from popup.
			$ionicPopup.alert({
				template: 'Failed to get authentication from Google'
			});
		});


	};
	
	$scope.scrollToTop = function(){
		$ionicScrollDelegate.scrollTop(true);
	};
	
	function checkLoggedIn(msg){
		if(!$scope.params.userInformation.email){
			$ionicPopup.show({
				template: '<div style="text-align:center;">'+msg+'</div>',
			    buttons: [
			      { text: 'Login' ,
			    	  type: 'button-positive',
			          onTap: function(e) {
			        	  goToPage("userinfo");
			          }
			      },
			      { text: 'Close' }]
			});
			return false;
		}
		return true;
	}
	
	$scope.postInfo = function() {
		
		if(!checkLoggedIn("Please login to post information.")){
			return;
		}

		if(!$scope.params.infoTitle || !$scope.params.information || !$scope.params.infoCategory){
			$ionicPopup.alert({
				template: 'Please fill all the fields.'
			});
			return;
		}

		var data = {title : $scope.params.infoTitle, information: $scope.params.information, email : $scope.params.userInformation.email, category : $scope.params.infoCategory};
		$http({method:"POST",
			url:getURL("rest/info/create"),
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
			}, 1500);
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
		if(!checkLoggedIn("Please login to post information.")){
			return;
		}
		
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
		
		if($ionicHistory.currentStateName() == "welcome"){
			$scope.params.hideMenu = true;
		}else{
			$scope.params.hideMenu = false;
		}
		
		if($ionicHistory.currentStateName() == "layout.index"){
			$scope.params.showPostInfo = true;
		}else{
			$scope.params.showPostInfo = false;
		}
		if($ionicHistory.currentStateName() == "layout.searchinfo"){
			$scope.params.searchText = "";
			$scope.params.searchCategory = "";
			$scope.params.currentCategory = "";
			$scope.params.currentTitle = "";
			$scope.params.currentInformation = "";
		}
		if($ionicHistory.currentStateName() == "layout.contactus"){
			$scope.params.contact.name = "";
			$scope.params.contact.suggestion = "";
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