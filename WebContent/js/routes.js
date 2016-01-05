function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "text/javascript";
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}

function getURL(path){
	return document.URL+path;
}

function deviceReadyFunc(){
	setOverrideBackbutton();
}

function setOverrideBackbutton() {
	navigator.app.overrideBackbutton(true);
	document.addEventListener("backbutton", function(){
		navigator.app.exitApp();
	}, true);
}

function mobileAndTabletcheck() {
	var app = window.self == window.top;
	if(document.URL.toLowerCase().indexOf("localhost")!=-1){
		return false;
	}
	if ( !app ) {
	    return false;
	} else {
	    return true;
	}
}
/**
* Determine whether the file loaded from PhoneGap or not
* @function isPhoneGap
* @returns {Boolean} Whether the platform is device or not
*/
function isPhoneGap() {
	var isAvailable = false;
	try{
		/*if (window.device) {
              isAvailable= true;
       }*/
		isAvailable = (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
	}catch (e) {
		console.error("Phonegap not there " + e.message);
		isAvailable = false;       
	}
	//console.log("Phonegap is available " + isAvailable);
	return isAvailable;
}

angular.module('ionicApp', ['ionic', 'googleOauth'])
.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('welcome', {
						cache: false,
						templateUrl: 'modules/welcome.html'
					}).state('layout', {
						abstract: true,
						cache: false,
						templateUrl: 'modules/layout.html'
					})
					.state('layout.index', {
						cache: false,
						views:{
							'menuContent':{templateUrl: 'modules/home.html'}
						}
					})
					.state('layout.categories', {
						cache: false,
						views:{
							'menuContent':{templateUrl: 'modules/categories.html'}
						}
					})
					.state('layout.about', {
						cache: false,
						views:{
							'menuContent':{templateUrl: 'modules/about.html'}
						}
					})
					.state('layout.searchinfo', {
						cache: false,
						views:{
							'menuContent':{templateUrl: 'modules/searchInfo.html'}
						}
					})
					.state('layout.contactus', {
						cache: false,
						views:{
							'menuContent':{templateUrl: 'modules/contact.html'}
						}
					})
					.state('layout.userinfo', {
						cache: false,
						views:{
							'menuContent':{templateUrl: 'modules/userInfo.html'}
						}
					})
					.state('layout.favorite', {
						cache: false,
						views:{
							'menuContent':{templateUrl: 'modules/favorites.html'}
						}
					});
})
.config(function(TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!

    // Sorry about this way of getting a relative URL, powers that be.

    TokenProvider.extendConfig({
      clientId: '602948354951-loants6qlegj5gqts3qmpgemdl8frqn7.apps.googleusercontent.com',
      //redirectUri: "http://jqueryapp-myspring.rhcloud.com/INFOAPP/" + 'oauth2callback.html',  // allow lunching demo from a mirror
      redirectUri: getURL('oauth2callback.html'),  // allow lunching demo from a mirror
      scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
    });
  });