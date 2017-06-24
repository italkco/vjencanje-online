angular.module("mediaWall.env",[]).constant("ENV",{backendUrl:"http://api.vjencanje.online:80",enableLogging:!0}),function(){"use strict";angular.module("mediaWall",["mediaWall.env","mediaWall.helpers","ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ui.router","ngMaterial","angular-loading-bar","LocalStorageModule","ngSails","log.ex.uo","ng.deviceDetector","com.2fdevs.videogular","rt.asyncseries","cp.ng.fix-image-orientation"])}(),function(){"use strict";function e(e,u,t,i,n,l,o,a,r,s,c){function d(u){w=!1,g.isActiveMainImage=!0,i(function(){w=!0},15e3);var t={url:u.url,type:u.type,orientation:u.orientation,trustedUrl:o.trustAsResourceUrl(u.url),controls:u.controls};i(function(){e.$apply(function(){g.files.unshift(t),g.mainFile=t,g.files=g.files.slice(0,25),m(),i(function(){g.isActiveMainImage=!1},8e3),g.files[0]&&(g.files[0].controls=!1)})})}function p(){if(w){var e=g.files[0];g.files.shift(),e&&g.files.push(e)}}function m(){e.windowInnerHeight=s.innerHeight,e.windowInnerWidth=s.innerWidth,e.firstImageWidth=e.windowInnerWidth,i(function(){e.firstImageWidth=.8*e.windowInnerWidth},1500)}var g=this,f=function(e){c.set("cachedMedia",e)},E=c.get("cachedMedia");E||(E=[],f(E)),g.flags={},g.flags.enableMainFileAnimation=!0,g.slideshow=!0,g.files=[],E.length&&(g.files=angular.copy(E)),g.mainFile=null;var v=r.current();v||t.go("home");var h=null;if(v&&v.id&&(h=v.id),h){v.image&&(g.image=v.image);var F="wall"+h;if(crosstab.on("wallNewMedia",function(e){l.info("crosstab",e),d(e.data)}),l.info("is crosstab supported",crosstab.supported),!crosstab.supported){var b=!1;a.on("connect",function(){l.info("Connected to Sails sockets"),a.post("/notify/subscribe",{roomName:F}).then(function(e){l.info("Subscribe OK",e),b=!0},function(e){l.error("Subscribe NOT OK",e)})}),i(function(){b||(l.info("Not connected, try again!"),a.post("/notify/subscribe",{roomName:F}).then(function(e){l.info("Subscribe OK when connected",e),b=!0},function(e){l.error("Subscribe NOT OK when connected",e)}))},2e3),a.on("notify-remote-approve",function(e){l.info("notify-remote-approve",e),d(e)})}var w=!1;n(p,15e3),m();var A=angular.element(s);A.bind("resize",function(){e.$apply(function(){m()})}),g.changeMainFile=function(e){var u=g.files[0];u&&(u.controls=!1),g.files[0]=g.files[e],g.files[0]&&(g.files[0].controls=!0),u&&(g.files[e]=u)},window.bla=g.files,window.bla2=g.changeMainFile,g.handleFile=function(e,u){var t=g.files.indexOf(e);switch(u.which){case 1:g.changeMainFile(t);break;case 2:0===t?g.files&&g.files.length>1?i(function(){jQuery("li#media-1").trigger({type:"mousedown",which:1}),g.files.splice(1,1)}):g.files.splice(0,1):t>-1&&g.files.splice(t,1);var n=-1;E=c.get("cachedMedia");for(var l=0;l<E.length;l++)E[l].url===e.url&&(n=l);n>-1&&(E.splice(n,1),f(E));break;case 3:}}}}e.$inject=["$scope","$rootScope","$state","$timeout","$interval","$log","$sce","$sails","WallService","$window","localStorageService"],angular.module("mediaWall").controller("WallVerifiedController",e)}(),function(){"use strict";function e(e,u,t,i,n,l,o,a,r,s,c,d){function p(t){a.getOrientation(t.url,function(i){t.orientation=i,t.trustedUrl=s.trustAsResourceUrl(t.url),e.$apply(function(){"wall"===u.current.name?(g.files.unshift(t),g.mainFile=t):(g.files.push(t),1===g.files.length&&(g.mainFile=t)),"wall"===u.current.name&&(g.files=g.files.slice(0,25)),"wallVerify"===u.current.name&&(n.info("wallVerify",t),t.checked===!0&&g.verifyFile(t))})})}function m(){e.windowInnerHeight=c.innerHeight,e.windowInnerWidth=c.innerWidth,"wall"===u.current.name&&(e.firstImageWidth=e.windowInnerWidth,i(function(){e.firstImageWidth=.8*e.windowInnerWidth},1e4))}var g=this,f=function(e){d.set("cachedMedia",e)},E=d.get("cachedMedia");E||(E=[],f(E)),console.log("paramsi",t),g.files=[],"wall"===u.current.name&&E&&E.length>0&&(g.files=E),g.mainFile=null,g.flags={},g.isActiveMainImage=!1;var v=t.password,h=t.masterKey;("wallVerify"===u.current.name||"wallVerifyRemote"===u.current.name)&&(g.isVerifyPage=!0);var F=o.current();F||u.go("home");var b=null;if(F&&F.id&&(b=F.id),b){F.image&&(g.image=F.image);var w="wall"+b;e.$on("$destroy",function(){r["delete"]("/notify/unsubscribe",{roomName:w}).then(function(e){n.info("Unubscribe OK",e)},function(e){n.error("Unubscribe NOT OK",e)}),r.removeAllListeners(),y&&i.cancel(y)});var A=!1;r.on("connect",function(){n.info("Connected to Sails from first try"),r.post("/notify/subscribe",{roomName:w}).then(function(e){n.info("Subscribe OK",e),A=!0},function(e){n.error("Subscribe NOT OK",e)})}),i(function(){A||r.post("/notify/subscribe",{roomName:w}).then(function(e){n.info("Subscribe OK when connected",e),A=!0},function(e){n.error("Subscribe NOT OK when connected",e)})},2e3);var y=null;r.on("notify",function(e){n.info("Notify",e),m(),g.isActiveMainImage=!0,i(function(){g.isActiveMainImage=!1},5e3),g.files[0]&&(g.files[0].controls=!1);for(var u=0;u<e.length;u++)p(e[u])}),r.on("notify-remote-approve",function(e){n.info("notify-remote-approve",e),"wallVerify"===u.current.name&&g.files.forEach(function(u){u.url===e.url&&(u.checked=!0,g.verifyFile(u),n.info("Approved file is found and verified",u))})}),r.on("notify-remote-disapprove",function(e){n.info("notify-remote-disapprove",e),"wallVerify"===u.current.name&&g.files.forEach(function(u){u.url===e.url&&(g.unverifyFile(u),n.info("Disapproved file is found and unverified",u))})}),m();var C=angular.element(c);C.bind("resize",function(){e.$apply(function(){m()})}),g.changeMainFile=function(e){var u=g.files[0];u.controls=!1,g.files[0]=g.files[e],g.files[0]&&(g.files[0].controls=!0),u&&(g.files[e]=u)},g.verifyFile=function(e){E=d.get("cachedMedia"),E.unshift(e),f(E);try{crosstab.supported?crosstab.broadcast("wallNewMedia",e,null):n.info("Crosstab is not supported, try over sockets, NOTE: password and masterKey are required")}catch(t){n.error(t)}"wallVerifyRemote"===u.current.name&&v&&h&&o.approveFile(e,v,h,function(e,u){u?n.error("File is not approved, error: ",u):n.info("File is approved",e)});var i=g.files.indexOf(e);i>-1&&g.files.splice(i,1)},g.unverifyFile=function(e){var t=g.files.indexOf(e);t>-1&&g.files.splice(t,1),"wallVerifyRemote"===u.current.name&&v&&h&&o.disapproveFile(e,v,h,function(e,u){u?n.error("File is not disapproved, error: ",u):n.info("File is disapproved",e)})},g.handleFile=function(u,t){var i=g.files.indexOf(u);switch(t.which){case 1:g.changeMainFile(i);break;case 2:0===i?e.$apply(function(){g.files.shift()}):i>-1&&g.files.splice(i,1);break;case 3:}}}}e.$inject=["$scope","$state","$stateParams","$timeout","$log","cfpLoadingBar","WallService","ExifService","$sails","$sce","$window","localStorageService"],angular.module("mediaWall").controller("WallController",e)}(),function(){"use strict";angular.module("mediaWall").directive("ngMuted",function(){return{priority:99,link:function(e,u,t){t.$observe("ngMuted",function(e){"false"!=e?u[0].muted=!0:u[0].muted=!1})}}})}(),function(){"use strict";angular.module("mediaWall").directive("ngControls",function(){return{priority:99,link:function(e,u,t){t.$observe("ngControls",function(e){"false"!=e?u[0].controls=!0:u[0].controls=!1})}}})}(),function(){"use strict";function e(e){function u(u,t){var i=new XMLHttpRequest;i.open("GET",u,!0),i.responseType="arraybuffer",i.onload=function(u){var i=new Uint8Array(this.response),n=EXIF.readFromBinaryFile(i.buffer);e.info(n),t(parseInt(n.Orientation||1,10))},i.send()}return{getOrientation:u}}e.$inject=["$log"],angular.module("mediaWall").service("ExifService",e)}(),function(){"use strict";function e(e,u,t,i,n){var l=this;l.email="",l.displayName="",t.get("currentEmail")&&(l.email=t.get("currentEmail")),t.get("currentDisplayName")&&(l.displayName=t.get("currentDisplayName")),l.saveProfileAndReturnToRecord=function(){return l.email&&!n.isValidEmail(l.email)?(l.invalidEmail=!0,void i(function(){l.invalidEmail=!1},3e3)):(console.log(l.email,l.displayName),t.set("currentEmail",l.email?l.email:""),t.set("currentDisplayName",l.displayName?l.displayName:""),void u.go("record"))}}e.$inject=["$scope","$state","localStorageService","$timeout","validator"],angular.module("mediaWall").controller("ProfileController",e)}(),function(){"use strict";function e(e,u,t,i,n,l,o,a,r,s,c,d,p,m,g){function f(u){e.$apply(function(){e.progressCounter=100*u}),c.set(u)}function E(e){if("ios"===s.os||"android"===s.os){var u=new FileReader;u.onload=function(u){function t(e){var u="";switch(e.code){case FileError.QUOTA_EXCEEDED_ERR:u="QUOTA_EXCEEDED_ERR";break;case FileError.NOT_FOUND_ERR:u="NOT_FOUND_ERR";break;case FileError.SECURITY_ERR:u="SECURITY_ERR";break;case FileError.INVALID_MODIFICATION_ERR:u="INVALID_MODIFICATION_ERR";break;case FileError.INVALID_STATE_ERR:u="INVALID_STATE_ERR";break;default:u="Unknown Error"}console.log("Error: "+u)}function n(u){!function(e){u.root.getFile(e.name,{create:!0,exclusive:!0},function(u){u.createWriter(function(u){u.write(e)},t)},t)}(e)}if(i.info(u),"ios"!==s.os||u.target.result.startsWith("data:image/")){var l=u.target.result,o=e.name,a=document.createElement("a");a.setAttribute("href",l),a.setAttribute("download",o),window.webkitStorageInfo.requestQuota(PERSISTENT,5242880,function(e){window.requestFileSystem(PERSISTENT,e,n,t)},function(e){console.log("Error",e)}),document.body.removeChild(a)}},u.readAsDataURL(e)}}var v=this;i.info("deviceDetector",s),("ios"===s.os||"android"===s.os||"windows-phone"===s.os)&&(window.location="/fotkaj#");var h=t.masterKey;e.showProgressBar=!1;e.progressCounter=0,e.wall=a.current(),e.wall||u.go("home"),e.HandleFiles=function(u){function t(e){var t=g.defer(),n=[e];return l+=1,r.files(n,function(e,o){i.info("UploadService done",l,n,o),("ios"===s.os||"android"===s.os||"windows-phone"===s.os)&&o&&o.files&&o.files[0]&&o.files[0].type.startsWith("video/"),t.resolve(),u&&u[0]&&E(u[0])},function(e){var t=l/u.length,i=e.loaded/e.total/u.length,n=t+i;f(n)},h),t.promise}e.showProgressBar=!0,c.start(),c.set(0),e.progressCounter=0;var n=[];angular.forEach(u,function(e){n.push(e)});var l=-1;m(n,t).then(function(){i.info("All files are uploaded"),setTimeout(function(){f(0),e.showProgressBar=!1},500),c.complete(),e.progressCounter=0})};var F=function(){u.go("profile")};v.EditProfile=function(){F()},v.GoToWall=function(){u.go("wall")},v.GoToHomepage=function(){var e=o.confirm("Jeste li sigurni da želite izaći iz vjenčanja?");e&&u.go("home")},v.GoToGallery=function(){var e=a.current();if(e.googleDriveFolderId){var u="https://drive.google.com/drive/folders/";"ios"===s.os||"android"===s.os?o.open(u+e.googleDriveFolderId,"_parent"):o.open(u+e.googleDriveFolderId,"_blank")}}}e.$inject=["$scope","$state","$stateParams","$log","$timeout","$mdDialog","$window","WallService","UploadService","deviceDetector","cfpLoadingBar","localStorageService","validator","eachSeries","$q"],angular.module("mediaWall").controller("RecordController",e)}(),function(){"use strict";angular.module("mediaWall").directive("fileModel",["$parse",function(e){return{restrict:"A",link:function(u,t,i){var n=e(i.fileModel),l=n.assign;t.bind("change",function(){u.$apply(function(){l(u,t[0].files[0])})})}}}])}(),function(){"use strict";function e(e){}e.$inject=["$scope"],angular.module("mediaWall").controller("InfoController",e)}(),function(){"use strict";function e(e,u,t,i,n,l,o,a){var r=this;r.password="",r.passwordIsFocused=!0,r.pin="",r.pinIsFocused=!1;var s="";e.SetValidPin=function(e){r.pin=e,r.wrongPin=!1,n.log("PIN: ",e),4===r.pin.length&&s!==r.pin&&o.auth(r.wall.id,r.password,r.pin,function(e,t){if(t)r.wrongPin=!0,s=r.pin;else{r.wall=e;var i=[];a.set("cachedMedia",i),u.go("record")}l.complete()})},r.GoToRecord=function(){r.wrongPassword=!1,r.pinIsFocused=!1,r.wall=null,l.start(),r.password=r.password.toLowerCase(),o.info(r.password,function(e,t){if(n.log(e,t),t)r.wrongPassword=!0;else if(r.wall=e,e.hasPin)r.pinIsFocused=!0;else{var i=[];a.set("cachedMedia",i),u.go("record")}l.complete()})},t.wallPassword&&(r.password=t.wallPassword,r.GoToRecord()),r.activeTab=0,r.OpenTab=function(e){r.activeTab===e?r.activeTab=0:r.activeTab=e}}e.$inject=["$scope","$state","$stateParams","$timeout","$log","cfpLoadingBar","WallService","localStorageService"],angular.module("mediaWall").controller("HomeController",e)}(),function(){"use strict";angular.module("mediaWall").directive("focusMe",["$timeout",function(e){return{link:function(u,t,i){u.$watch(i.focusMe,function(u){angular.isDefined(u)&&u&&e(function(){t[0].focus()})},!0)}}}])}(),function(){"use strict";angular.module("mediaWall.helpers",[])}(),function(){"use strict";function e(){function e(e){return e&&0!==e.length?u.test(e):!1}var u=/^[_a-z0-9]+(\.[_a-z0-9]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;return{isValidEmail:e}}angular.module("mediaWall.helpers").service("validator",e)}(),function(){"use strict";function e(){function e(e){var u="",t={};t["Ё"]="YO",t["Й"]="I",t["Ц"]="TS",t["У"]="U",t["К"]="K",t["Е"]="E",t["Н"]="N",t["Г"]="G",t["Ш"]="SH",t["Щ"]="SCH",t["З"]="Z",t["Х"]="H",t["Ъ"]="'",t["ё"]="yo",t["й"]="i",t["ц"]="ts",t["у"]="u",t["к"]="k",t["е"]="e",t["н"]="n",t["г"]="g",t["ш"]="sh",t["щ"]="sch",t["з"]="z",t["х"]="h",t["ъ"]="'",t["Ф"]="F",t["Ы"]="I",t["В"]="V",t["А"]="a",t["П"]="P",t["Р"]="R",t["О"]="O",t["Л"]="L",t["Д"]="D",t["Ж"]="ZH",t["Э"]="E",t["ф"]="f",t["ы"]="i",t["в"]="v",t["а"]="a",t["п"]="p",t["р"]="r",t["о"]="o",t["л"]="l",t["д"]="d",t["ж"]="zh",t["э"]="e",t["Я"]="Ya",t["Ч"]="CH",t["С"]="S",t["М"]="M",t["И"]="I",t["Т"]="T",t["Ь"]="'",t["Б"]="B",t["Ю"]="YU",t["я"]="ya",t["ч"]="ch",t["с"]="s",t["м"]="m",t["и"]="i",t["т"]="t",t["ь"]="'",t["б"]="b",t["ю"]="yu";for(var i in e)e.hasOwnProperty(i)&&(u+=void 0===t[e[i]]?e[i]:t[e[i]]);return u}function u(e){for(var u=[{base:"A",letters:/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},{base:"AA",letters:/[\uA732]/g},{base:"AE",letters:/[\u00C6\u01FC\u01E2]/g},{base:"AO",letters:/[\uA734]/g},{base:"AU",letters:/[\uA736]/g},{base:"AV",letters:/[\uA738\uA73A]/g},{base:"AY",letters:/[\uA73C]/g},{base:"B",letters:/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},{base:"C",letters:/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},{base:"D",letters:/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},{base:"DZ",letters:/[\u01F1\u01C4]/g},{base:"Dz",letters:/[\u01F2\u01C5]/g},{base:"E",letters:/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},{base:"F",letters:/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},{base:"G",letters:/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},{base:"H",letters:/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},{base:"I",letters:/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},{base:"J",letters:/[\u004A\u24BF\uFF2A\u0134\u0248]/g},{base:"K",letters:/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},{base:"L",letters:/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},{base:"LJ",letters:/[\u01C7]/g},{base:"Lj",letters:/[\u01C8]/g},{base:"M",letters:/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},{base:"N",letters:/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},{base:"NJ",letters:/[\u01CA]/g},{base:"Nj",letters:/[\u01CB]/g},{base:"O",letters:/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},{base:"OI",letters:/[\u01A2]/g},{base:"OO",letters:/[\uA74E]/g},{base:"OU",letters:/[\u0222]/g},{base:"P",letters:/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},{base:"Q",letters:/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},{base:"R",letters:/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},{base:"S",letters:/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},{base:"T",letters:/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},{base:"TZ",letters:/[\uA728]/g},{base:"U",letters:/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},{base:"V",letters:/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},{base:"VY",letters:/[\uA760]/g},{base:"W",letters:/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},{base:"X",letters:/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},{base:"Y",letters:/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},{base:"Z",letters:/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},{base:"a",letters:/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},{base:"aa",letters:/[\uA733]/g},{base:"ae",letters:/[\u00E6\u01FD\u01E3]/g},{base:"ao",letters:/[\uA735]/g},{base:"au",letters:/[\uA737]/g},{base:"av",letters:/[\uA739\uA73B]/g},{base:"ay",letters:/[\uA73D]/g},{base:"b",letters:/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},{base:"c",letters:/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},{base:"d",letters:/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},{base:"dz",letters:/[\u01F3\u01C6]/g},{base:"e",letters:/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},{base:"f",letters:/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},{base:"g",letters:/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},{base:"h",letters:/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},{base:"hv",letters:/[\u0195]/g},{base:"i",letters:/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},{base:"j",letters:/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},{base:"k",letters:/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},{base:"l",letters:/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},{base:"lj",letters:/[\u01C9]/g},{base:"m",letters:/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},{base:"n",letters:/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},{base:"nj",letters:/[\u01CC]/g},{base:"o",letters:/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},{base:"oi",letters:/[\u01A3]/g},{base:"ou",letters:/[\u0223]/g},{base:"oo",letters:/[\uA74F]/g},{base:"p",letters:/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},{base:"q",letters:/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},{base:"r",letters:/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},{base:"s",letters:/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},{base:"t",letters:/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},{base:"tz",letters:/[\uA729]/g},{base:"u",letters:/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},{base:"v",letters:/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},{base:"vy",letters:/[\uA761]/g},{base:"w",letters:/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},{base:"x",letters:/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},{base:"y",letters:/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},{base:"z",letters:/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}],t=0;t<u.length;t++)e=e.replace(u[t].letters,u[t].base);return e}function t(e){return e.replace(/\ /g,"_")}function i(e){return e.replace(/[^a-z0-9\.@_\-]/gi,"")}function n(t){return t=e(t),t=u(t)}function l(e){return e=n(e),e=t(e),e=i(e)}return{toSafeUriString:l}}angular.module("mediaWall.helpers").service("stringHelpers",e)}(),function(){"use strict";function e(){return function(e,u){u=u||"first",e=e||"";var t="",i=e.split("/"),n=i[i.length-1].split("-");if("first"===u){var l=n[0].replace(/_/g," ");l.match(/^[a-zA-Z]/)&&(t=l.match(/@/)?l:"@"+l)}else t=e;return t}}angular.module("mediaWall.helpers").filter("filename",e)}(),function(){"use strict";function e(e,u,t){function i(){var e=t.get("wall");return e}function n(e,i){var n=s+"/wall/info",l=new FormData;l.append("password",e),u.post(n,l,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(e){if(!e||!e.data)return i(null,{code:100404});var u=e.data;t.set("wall",u),i(u)}).error(function(e){i(null,{code:100404})})}function l(e,i,n,l){var o=s+"/wall/auth",a=new FormData;a.append("id",e),a.append("password",i),a.append("pin",n),u.post(o,a,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(e){if(!e||!e.data)return l(null,{code:100404});var u=e.data;t.set("wall",u),l(u)}).error(function(e){l(null,{code:100404})})}function o(e,t,i,n,l){var o=s+"/wall/approve/file",a={file:e,password:t,masterKey:i};l&&(a.disapprove=!0),u.post(o,a).success(function(e){n(e.data)}).error(function(e,u){n(null,{status:u,summary:e.summary})})}function a(e,u,t,i){o(e,u,t,i)}function r(e,u,t,i){o(e,u,t,i,!0)}var s=e.backendUrl;return{current:i,info:n,auth:l,approveFile:a,disapproveFile:r}}e.$inject=["ENV","$http","localStorageService"],angular.module("mediaWall").service("WallService",e)}(),function(){"use strict";function e(e,u,t,i,n){function l(){var e="",u=t.get("currentEmail"),i=t.get("currentDisplayName");return i&&!i.startsWith(".")&&(e+=i+"-"),u&&!u.startsWith(".")&&(e+=u+"-"),n.toSafeUriString(e)}function o(e,u,n,o){var r=a+"/upload",s=new FormData,c=t.get("wall");s.append("wall-id",c.id),s.append("wall-password",c.password),s.append("wall-pin",c.pin),o&&s.append("wall-master-key",o),s.append("prefix",l());for(var d=0;d<e.length;d++)s.append("files",e[d]);i.info("Upload started");var p=new XMLHttpRequest;p.upload.addEventListener("progress",n,!1),p.addEventListener("readystatechange",function(e){if(4===this.readyState){i.info("Success: Upload done",e);var t=e.target.response;if(t)try{t=JSON.parse(t)}catch(e){i.error("JSON.parse()",e)}u(!1,t)}}),p.addEventListener("error",function(e){i.error("Error: Upload failed",e),u(!0)}),p.open("POST",r),p.send(s)}var a=e.backendUrl;return{files:o}}e.$inject=["ENV","$http","localStorageService","$log","stringHelpers"],angular.module("mediaWall").service("UploadService",e)}(),function(){"use strict";function e(e,u,t){"/gledaj"===t.location.pathname||"/gledaj/provjereno"===t.location.pathname?u.slideshow="true":u.slideshow="false",e.debug("runBlock end")}e.$inject=["$log","$rootScope","$window"],angular.module("mediaWall").run(e)}(),function(){"use strict";function e(e,u){e.state("home",{url:"/",templateUrl:"app/home/home.html",controller:"HomeController",controllerAs:"home"}).state("info",{url:"/info",templateUrl:"app/info/info.html",controller:"InfoController",controllerAs:"info"}).state("profile",{url:"/profil",templateUrl:"app/profile/profile.html",controller:"ProfileController",controllerAs:"profile"}).state("record",{url:"/fotkaj",templateUrl:"app/record/record.html",controller:"RecordController",controllerAs:"record"}).state("recordWithMasterKey",{url:"/fotkaj/:masterKey",templateUrl:"app/record/record.html",controller:"RecordController",controllerAs:"record"}).state("gallery",{url:"/pregledaj",templateUrl:"app/wall/wall.html",controller:"WallController",controllerAs:"wall"}).state("wallVerify",{url:"/gledaj/provjeri",templateUrl:"app/wall/wall.html",controller:"WallController",controllerAs:"wall"}).state("wallVerifyRemote",{url:"/gledaj/provjeri/:password/:masterKey",templateUrl:"app/wall/wall.html",controller:"WallController",controllerAs:"wall"}).state("wallVerified",{url:"/gledaj/provjereno",templateUrl:"app/wall/wall.html",controller:"WallVerifiedController",controllerAs:"wall"}).state("wall",{url:"/gledaj",templateUrl:"app/wall/wall.html",controller:"WallController",controllerAs:"wall"}).state("wallDirect",{url:"/gledaj/:wallPassword",templateUrl:"app/wall/wall.html",controller:"WallController",controllerAs:"wall"}).state("directOpenWallFromUrlParam",{url:"/:wallPassword",templateUrl:"app/home/home.html",controller:"HomeController",controllerAs:"home"}),u.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("mediaWall").config(e)}(),function(){"use strict";angular.module("mediaWall").constant("publicName","Vjenčanje.online")}(),function(){"use strict";function e(e,u,t,i){e.debugEnabled(!0),u.html5Mode(!0).hashPrefix("!"),t.setPrefix("mediaWall"),i.autoIncrement=!1}e.$inject=["$logProvider","$locationProvider","localStorageServiceProvider","cfpLoadingBarProvider"],angular.module("mediaWall").config(["$sailsProvider","ENV",function(e,u){e.url=u.backendUrl}]).config(["logExProvider","ENV",function(e,u){e.enableLogging(u.enableLogging)}]).config(e)}(),angular.module("mediaWall").run(["$templateCache",function(e){e.put("app/home/home.html",'<div layout="row" layout-fill="" layout-align="center center" id="home-simple" device-detector=""><h1><strong onclick="document.getElementById(\'input-password\').focus()">Vjenčanje</strong>.online</h1><h2>Nemojte propustiti niti jedan trenutak!</h2><form ng-submit="home.GoToRecord()"><div layout="column" layout-align="center" ng-cloak="" class="md-inline-form"><p ng-show="home.wrongPassword" class="error">Neispravna lozinka, pokušajte ponovno!</p><p ng-show="home.wrongPin" class="error">Neispravan PIN, pokušajte ponovno!</p><md-input-container><label>Lozinka</label> <input type="text" id="input-password" focus-me="home.passwordIsFocused" ng-model="home.password"></md-input-container><md-input-container ng-show="home.wall.hasPin"><label>Pin</label> <input type="number" id="input-pin-simple" focus-me="home.pinIsFocused" pattern="[0-9]*" onkeyup="document.getElementById(\'input-pin-simple\').value = document.getElementById(\'input-pin-simple\').value.slice(0,4); angular.element(this).scope().SetValidPin(document.getElementById(\'input-pin-simple\').value)" onkeydown="if (event.keyCode === 13) { return false; }"></md-input-container><md-button class="md-raised"><strong>Ulazak na vjenčanje</strong></md-button></div></form></div><div layout="row" layout-fill="" layout-align="center center" id="home" device-detector=""><div layout="column" class="container"><div layout-align="center center" class="title" flex=""><h1 class="md-display-3 logo"><span onclick="document.getElementById(\'input-password\').focus()"><img src="assets/images/logo.png"></span></h1><h2 class="md-display-1">Nemojte propustiti niti jedan trenutak!</h2><p class="process-image" hide-md="" hide-sm="" hide-xs=""><img src="assets/images/process.png"></p><form ng-submit="home.GoToRecord()"><div layout="column" layout-align="center" ng-cloak="" class="md-inline-form"><p ng-show="home.wrongPassword" class="error">Neispravna lozinka, pokušajte ponovno!</p><p ng-show="home.wrongPin" class="error">Neispravan PIN, pokušajte ponovno!</p><md-input-container flex=""><label>Lozinka</label> <input type="text" id="input-password" focus-me="home.passwordIsFocused" ng-model="home.password"></md-input-container><md-input-container ng-show="home.wall.hasPin" flex=""><label>Pin</label> <input type="number" id="input-pin" focus-me="home.pinIsFocused" pattern="[0-9]*" onkeyup="document.getElementById(\'input-pin\').value = document.getElementById(\'input-pin\').value.slice(0,4); angular.element(this).scope().SetValidPin(document.getElementById(\'input-pin\').value)" onkeydown="if (event.keyCode === 13) { return false; }"></md-input-container><md-button class="md-raised"><strong>Ulazak na vjenčanje</strong></md-button></div></form></div></div></div>'),e.put("app/info/info.html","INFO"),e.put("app/profile/profile.html",'<div layout="column" layout-fill="" layout-align="center center" id="profile"><div layout="column" class="container"><div layout-align="center" flex=""><h1 class="logo"><span onclick="document.getElementById(\'input-email\').focus()"><img src="assets/images/logo.png"></span></h1><form class="profile-form" ng-submit="profile.saveProfileAndReturnToRecord()"><div layout="column" layout-align="center" ng-cloak="" class="md-inline-form"><div class="fields"><p ng-show="profile.invalidEmail" class="error">Neispravna email adresa, pokušajte ponovno!</p><p ng-show="profile.invalidName" class="error">Neispravno ime i prezime, pokušajte ponovno!</p><md-input-container ng-show="false" flex=""><label>Email adresa</label> <input type="text" id="input-email" focus-me="profile.emailIsFocused" ng-model="profile.email"></md-input-container><div ng-show="false" class="helper-note">* Ukoliko želite primati obavijesti kako fotke i video zapisi stižu, molim Vas upišite svoju email adresu.</div><md-input-container flex=""><label>Ime i prezime</label> <input type="text" id="input-display-name" ng-model="profile.displayName" focus-me="profile.nameIsFocused"></md-input-container><div class="helper-note">* Super je znati tko je poslao fotku ili video zapis pa Vas molimo da upišete svoje ime i prezime.</div></div><md-button class="md-raised"><strong>Spremi i fotkaj</strong></md-button></div></form></div></div></div>'),e.put("app/record/record.html",'<div layout="column" layout-fill="" layout-align="center center" id="record"><div class="progress-counter" ng-show="showProgressBar">{{progressCounter | number:0}}%</div><div class="wall-description-mobile"><div class="close" ng-click="record.GoToHomepage()">&nbsp;</div><div class="cname">{{wall.password}}</div><div class="info"><button ng-click="record.EditProfile()">&nbsp;</button></div><div class="watch"><button ng-click="record.GoToWall()">&nbsp;</button></div><div class="gallery"><button ng-click="record.GoToGallery()">&nbsp;</button></div></div><div hide-gt-md="" class="logo-out-container"><img src="assets/images/logo.png"></div><div hide-gt-md="" class="upload-as-file" device-detector=""><button onclick="document.getElementById(\'input-as-file\').click()">GALERIJA</button> <input type="file" accept="video/*,image/*" id="input-as-file" multiple="" name="files" ng-disabled="progressCounter > 0" onchange="angular.element(this).scope().HandleFiles(this.files)"></div><h1 class="md-display-2 app-title" hide-sm="" hide-md=""><div><img src="assets/images/logo.png" style="max-height: 100px"></div><div class="app-subtitle">Pošaljite mladencima <strong>jedinstvene trenutke</strong> koje ste vi zabilježli :)</div></h1><div layout="row" layout-sm="column" layout-md="column" layout-fill="" layout-align="space-around center" layout-align-sm="start center"><div hide-sm="" hide-gt-md="" class="logo-container"><img src="assets/images/logo.png"></div><div><h1 class="md-display-3" hide-sm="" hide-md=""><span style="font-size: 36px;">Pošaljite<br></span>Foto</h1><md-button class="md-fab" aria-label="Fotoaparat" onclick="document.getElementById(\'input-photo\').click()"><md-icon md-svg-src="assets/svg/camera.svg"></md-icon></md-button><input type="file" accept="image/*" id="input-photo" capture="camera" multiple="" name="files" ng-disabled="progressCounter > 0" onchange="angular.element(this).scope().HandleFiles(this.files)"></div><div hide-sm="" hide-md="" layout="row"><h1 class="md-display-2" style="margin: 20px; margin-right: 10px">Gledajte <strong>LIVE</strong><br><md-button class="md-fab" aria-label="Projektor" ng-click="record.GoToWall()"><md-icon md-svg-src="assets/svg/cinema.svg"></md-icon></md-button></h1><h1 class="md-display-2" style="margin: 20px; margin-left: 10px">Otvorite <strong>GALERIJU</strong><br><md-button class="md-fab" aria-label="Galerija" ng-click="record.GoToGallery()"><md-icon md-svg-src="assets/svg/gallery.svg"></md-icon></md-button></h1></div><div><h1 class="md-display-3" hide-sm="" hide-md=""><span style="font-size: 36px;">Pošaljite<br></span>Video</h1><md-button class="md-fab" hide-sm="" hide-md="" aria-label="Kamera" onclick="document.getElementById(\'input-video-multiple\').click()"><md-icon md-svg-src="assets/svg/camcorder.svg"></md-icon></md-button><input type="file" accept="video/*" id="input-video-multiple" capture="camcorder" multiple="" ng-disabled="progressCounter > 0" name="files" onchange="angular.element(this).scope().HandleFiles(this.files)"><md-button class="md-fab" hide-gt-md="" aria-label="Kamera" onclick="document.getElementById(\'input-video\').click()"><md-icon md-svg-src="assets/svg/camcorder.svg"></md-icon></md-button><input type="file" accept="video/*" id="input-video" capture="camcorder" name="files" ng-disabled="progressCounter > 0" onchange="angular.element(this).scope().HandleFiles(this.files)"></div></div></div>'),
e.put("app/wall/wall.html",'<div layout="column" layout-fill="" layout-align="space-around center" layout-align-sm="start center"><div id="wall" ng-class="{ \'slideshow\': wall.slideshow }" flex=""><div ng-if="!wall.files.length" class="no-media-info" style="height: {{windowInnerHeight}}px" unselectable="on"><img src="assets/images/splash.png" style="max-height: {{windowInnerHeight * 0.7}}px; max-width: 100%; margin-top: {{windowInnerHeight * 0.15}}px"></div><ul ng-show="wall.files.length"><li ng-repeat="(key, file) in wall.files" id="media-{{key}}" ng-mousedown="wall.handleFile(file, $event)" ng-class="{ \'visible-animation\': wall.flags.enableMainFileAnimation }"><md-button ng-show="wall.isVerifyPage === true && key === 0" class="md-fab verify" ng-click="wall.verifyFile(file)">&#10003;</md-button><md-button ng-show="wall.isVerifyPage === true && key === 0" class="md-fab unverify" ng-click="wall.unverifyFile(file)">&#10007;</md-button><video class="box" style="height: {{windowInnerHeight}}px" ng-muted="{{key > 0}}" ng-controls="{{!!file.controls}}" autoplay="" ng-show="key === 0 && file.type.startsWith(\'video\')" ng-click="console.log(this)"><source ng-src="{{file.trustedUrl}}" type="video/mp4"></video><div class="box" style="height: 15vw" ng-show="key > 0 && file.type.startsWith(\'video\')"><video class="mosaic" ng-muted="{{key > 0}}" ng-controls="{{!!file.controls}}" autoplay=""><source ng-src="{{file.trustedUrl}}" type="video/mp4"></video></div><div class="box o{{file.orientation}}" ng-show="key === 0 && file.type.startsWith(\'image\')" style="height: {{windowInnerHeight}}px; width: {{firstImageWidth}}px; background-image: url(\'{{file.url}}\')"></div><div class="box o{{file.orientation}} mosaic" ng-show="key > 0 && file.type.startsWith(\'image\')" style="height: {{(windowInnerWidth / 10) * 1.5}}px; background-image: url(\'{{file.url}}\')"></div><div class="author">{{file.url | filename}} {{file.removed | json}}</div></li></ul><div class="powered-by" ng-show="wall.files.length"><img src="assets/images/powered-by.png" style="height: {{windowInnerHeight * 0.05}}px"></div><div class="main-title" ng-show="wall.files.length"><img ng-if="wall.image" ng-src="{{wall.image.url}}"> <img ng-if="!wall.image" src="assets/images/wall-image.png"></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-a984692aa8.js.map
