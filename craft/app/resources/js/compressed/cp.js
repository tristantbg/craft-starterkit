/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://buildwithcraft.com/license Craft License Agreement
 @see       http://buildwithcraft.com
 @package   craft.app.resources
*/
(function(c){var f=Garnish.Base.extend({authManager:null,$alerts:null,$header:null,$headerActionsList:null,$siteName:null,$nav:null,$overflowNavMenuItem:null,$overflowNavMenuBtn:null,$overflowNavMenu:null,$overflowNavMenuList:null,$notificationWrapper:null,$notificationContainer:null,$main:null,$content:null,$collapsibleTables:null,navItems:null,totalNavItems:null,visibleNavItems:null,totalNavWidth:null,showingOverflowNavMenu:!1,fixedNotifications:!1,runningTaskInfo:null,trackTaskProgressTimeout:null,
taskProgressIcon:null,$upgradePromo:null,upgradeModal:null,init:function(){0!=Craft.authTimeout&&(this.authManager=new Craft.AuthManager);this.$alerts=c("#alerts");this.$header=c("#header");this.$headerActionsList=this.$header.find("#header-actions");this.$siteName=this.$header.find("h2");this.$nav=c("#nav");this.$notificationWrapper=c("#notifications-wrapper");this.$notificationContainer=c("#notifications");this.$main=c("#main");this.$content=c("#content");this.$collapsibleTables=this.$content.find("table.collapsible");
this.$upgradePromo=c("#upgradepromo > a");this.onActionItemListResize();this.addListener(this.$headerActionsList,"resize","onActionItemListResize");this.navItems=[];this.totalNavWidth=f.baseNavWidth;var a=this.$nav.children();this.visibleNavItems=this.totalNavItems=a.length;for(var b=0;b<this.totalNavItems;b++){var d=c(a[b]),e=d.width();this.navItems.push(d);this.totalNavWidth+=e}this.addListener(Garnish.$win,"resize","onWindowResize");this.onWindowResize();this.addListener(Garnish.$win,"scroll",
"updateFixedNotifications");this.updateFixedNotifications();a=this.$notificationContainer.children(".error");b=this.$notificationContainer.children(":not(.error)");a.delay(2*f.notificationDuration).velocity("fadeOut");b.delay(f.notificationDuration).velocity("fadeOut");this.$alerts.length&&this.initAlerts();var g=c("form[data-saveshortcut]:first");1==g.length&&this.addListener(Garnish.$doc,"keydown",function(a){(a.metaKey||a.ctrlKey)&&a.keyCode==Garnish.S_KEY&&(a.preventDefault(),this.trigger("beforeSaveShortcut"),
g.data("saveshortcut-redirect")&&c('<input type="hidden" name="redirect" value="'+g.data("saveshortcut-redirect")+'"/>').appendTo(g),g.submit());return!0});Garnish.$win.on("load",c.proxy(function(){this.$confirmUnloadForms=c("form[data-confirm-unload]");if(this.$confirmUnloadForms.length){Craft.forceConfirmUnload||(this.initialFormValues=[]);for(var a=0;a<this.$confirmUnloadForms.length;a++){var b=c(this.$confirmUnloadForms);Craft.forceConfirmUnload||(this.initialFormValues[a]=b.serialize());this.addListener(b,
"submit",function(){this.removeListener(Garnish.$win,"beforeunload")})}this.addListener(Garnish.$win,"beforeunload",function(a){for(var b=0;b<this.$confirmUnloadForms.length;b++)if(Craft.forceConfirmUnload||this.initialFormValues[b]!=c(this.$confirmUnloadForms[b]).serialize())return b=Craft.t("Any changes will be lost if you leave this page."),a?a.originalEvent.returnValue=b:window.event.returnValue=b,b})}},this));this.addListener(this.$upgradePromo,"click","showUpgradeModal");a=c("#wrongedition-modal");
a.length&&new Craft.WrongEditionModal(a)},onWindowResize:function(){this.onWindowResize._cpWidth=Math.min(Garnish.$win.width(),f.maxWidth);this.updateResponsiveNav();this.updateResponsiveTables()},onActionItemListResize:function(){this.$siteName.css("max-width","calc(100% - "+(this.$headerActionsList.width()+14)+"px)")},updateResponsiveNav:function(){if(this.onWindowResize._cpWidth<this.totalNavWidth)if(this.showingOverflowNavMenu||(this.$overflowNavMenuBtn?this.$overflowNavMenuItem.show():(this.$overflowNavMenuItem=
c("<li/>").appendTo(this.$nav),this.$overflowNavMenuBtn=c('<a class="menubtn" title="'+Craft.t("More")+'">\u2026</a>').appendTo(this.$overflowNavMenuItem),this.$overflowNavMenu=c('<div id="overflow-nav" class="menu" data-align="right"/>').appendTo(this.$overflowNavMenuItem),this.$overflowNavMenuList=c("<ul/>").appendTo(this.$overflowNavMenu),new Garnish.MenuBtn(this.$overflowNavMenuBtn)),this.showingOverflowNavMenu=!0),this.$nav.height()>f.navHeight){do this.addLastVisibleNavItemToOverflowMenu();
while(this.$nav.height()>f.navHeight&&0<this.visibleNavItems)}else{do this.addFirstOverflowNavItemToMainMenu();while(this.$nav.height()==f.navHeight&&this.visibleNavItems<this.totalNavItems);this.addLastVisibleNavItemToOverflowMenu()}else if(this.showingOverflowNavMenu){for(this.$overflowNavMenuItem.hide();this.visibleNavItems<this.totalNavItems;)this.addFirstOverflowNavItemToMainMenu();this.showingOverflowNavMenu=!1}},updateResponsiveTables:function(){if(Garnish.isMobileBrowser()){this.updateResponsiveTables._contentWidth=
this.$content.width();for(this.updateResponsiveTables._i=0;this.updateResponsiveTables._i<this.$collapsibleTables.length;this.updateResponsiveTables._i++)this.updateResponsiveTables._$table=c(this.$collapsibleTables[this.updateResponsiveTables._i]),this.updateResponsiveTables._check=!1,"undefined"!=typeof this.updateResponsiveTables._lastContentWidth?(this.updateResponsiveTables._isLinear=this.updateResponsiveTables._$table.hasClass("collapsed"),this.updateResponsiveTables._contentWidth>this.updateResponsiveTables._lastContentWidth?
this.updateResponsiveTables._isLinear&&(this.updateResponsiveTables._$table.removeClass("collapsed"),this.updateResponsiveTables._check=!0):this.updateResponsiveTables._isLinear||(this.updateResponsiveTables._check=!0)):this.updateResponsiveTables._check=!0,this.updateResponsiveTables._check&&this.updateResponsiveTables._$table.width()>this.updateResponsiveTables._contentWidth&&this.updateResponsiveTables._$table.addClass("collapsed");this.updateResponsiveTables._lastContentWidth=this.updateResponsiveTables._contentWidth}},
addLastVisibleNavItemToOverflowMenu:function(){this.navItems[this.visibleNavItems-1].prependTo(this.$overflowNavMenuList);this.visibleNavItems--},addFirstOverflowNavItemToMainMenu:function(){this.navItems[this.visibleNavItems].insertBefore(this.$overflowNavMenuItem);this.visibleNavItems++},updateFixedNotifications:function(){this.updateFixedNotifications._headerHeight=this.$header.height();Garnish.$win.scrollTop()>this.updateFixedNotifications._headerHeight?this.fixedNotifications||(this.$notificationWrapper.addClass("fixed"),
this.fixedNotifications=!0):this.fixedNotifications&&(this.$notificationWrapper.removeClass("fixed"),this.fixedNotifications=!1)},displayNotification:function(a,b){var d=f.notificationDuration;"error"==a&&(d*=2);c('<div class="notification '+a+'">'+b+"</div>").appendTo(this.$notificationContainer).hide().velocity("fadeIn",{display:"inline-block",duration:"fast"}).delay(d).velocity("fadeOut")},displayNotice:function(a){this.displayNotification("notice",a)},displayError:function(a){a||(a=Craft.t("An unknown error occurred."));
this.displayNotification("error",a)},fetchAlerts:function(){Craft.queueActionRequest("app/getCpAlerts",{path:Craft.path},c.proxy(this,"displayAlerts"))},displayAlerts:function(a){if(Garnish.isArray(a)&&a.length){this.$alerts=c('<ul id="alerts"/>').insertBefore(c("#header"));for(var b=0;b<a.length;b++)c("<li>"+a[b]+"</li>").appendTo(this.$alerts);a=this.$alerts.height();this.$alerts.height(0).velocity({height:a},"fast",c.proxy(function(){this.$alerts.height("auto")},this));this.initAlerts()}},initAlerts:function(){var a=
this.$alerts.find(".domain-mismatch:first");a.length&&this.addListener(a,"click",c.proxy(function(b){b.preventDefault();confirm(Craft.t("Are you sure you want to transfer your license to this domain?"))&&Craft.queueActionRequest("app/transferLicenseToCurrentDomain",c.proxy(function(b,c){"success"==c&&(b.success?(a.parent().remove(),this.displayNotice(Craft.t("License transferred."))):Craft.cp.displayError(b.error))},this))},this));for(var b=this.$alerts.find('a[class^="shun:"]'),d=0;d<b.length;d++)this.addListener(b[d],
"click",c.proxy(function(a){a.preventDefault();var b=c(a.currentTarget);a={message:b.prop("className").substr(5)};Craft.queueActionRequest("app/shunCpAlert",a,c.proxy(function(a,c){"success"==c&&(a.success?b.parent().remove():Craft.cp.displayError(a.error))},this))},this))},checkForUpdates:function(){Craft.queueActionRequest("app/checkForUpdates",c.proxy(function(a){this.displayUpdateInfo(a);this.trigger("checkForUpdates",{updateInfo:a})},this))},displayUpdateInfo:function(a){this.$headerActionsList.children("li.updates").remove();
if(a.total){var b=1==a.total?Craft.t("1 update available"):Craft.t("{num} updates available",{num:a.total});c('<li class="updates'+(a.critical?" critical":"")+'"><a data-icon="newstamp" href="'+Craft.getUrl("updates")+'" title="'+b+'"><span>'+a.total+"</span></a></li>").prependTo(this.$headerActionsList);c("#footer-updates").text(b)}},runPendingTasks:function(){Craft.runTasksAutomatically?Craft.queueActionRequest("tasks/runPendingTasks",c.proxy(function(a,b){"success"==b&&this.trackTaskProgress(0)},
this)):this.trackTaskProgress(0)},trackTaskProgress:function(a){this.trackTaskProgressTimeout||(this.trackTaskProgressTimeout=setTimeout(c.proxy(function(){Craft.queueActionRequest("tasks/getRunningTaskInfo",c.proxy(function(a,c){"success"==c&&(this.trackTaskProgressTimeout=null,this.setRunningTaskInfo(a,!0),"running"==a.status?this.trackTaskProgress():"pending"==a.status&&this.trackTaskProgress(3E4))},this))},this),"undefined"!=typeof a?a:1E3))},stopTrackingTaskProgress:function(){this.trackTaskProgressTimeout&&
(clearTimeout(this.trackTaskProgressTimeout),this.trackTaskProgressTimeout=null)},setRunningTaskInfo:function(a,b){(this.runningTaskInfo=a)?(this.taskProgressIcon||(this.taskProgressIcon=new k),"running"==a.status||"pending"==a.status?(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.setDescription(a.description),this.taskProgressIcon.setProgress(a.progress,b)):"error"==a.status&&this.taskProgressIcon.showFailMode()):this.taskProgressIcon&&(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.complete(),
delete this.taskProgressIcon)},showUpgradeModal:function(){this.upgradeModal?this.upgradeModal.show():this.upgradeModal=new Craft.UpgradeModal}},{maxWidth:1051,navHeight:38,baseNavWidth:30,notificationDuration:2E3});Craft.cp=new f;var k=Garnish.Base.extend({$li:null,$a:null,hud:null,completed:!1,failMode:!1,_canvasSupported:null,_$bgCanvas:null,_$staticCanvas:null,_$hoverCanvas:null,_$failCanvas:null,_staticCtx:null,_hoverCtx:null,_canvasSize:null,_arcPos:null,_arcRadius:null,_lineWidth:null,_arcStartPos:0,
_arcEndPos:0,_arcStartStepSize:null,_arcEndStepSize:null,_arcStep:null,_arcStepTimeout:null,_arcAnimateCallback:null,_progressBar:null,init:function(){this.$li=c("<li/>").prependTo(Craft.cp.$headerActionsList);this.$a=c('<a id="taskicon"/>').appendTo(this.$li);if(this._canvasSupported=!!document.createElement("canvas").getContext){var a=1<window.devicePixelRatio?2:1;this._canvasSize=30*a;this._arcPos=this._canvasSize/2;this._arcRadius=7*a;this._lineWidth=3*a;this._$bgCanvas=this._createCanvas("bg",
"#61666b");this._$staticCanvas=this._createCanvas("static","#d7d9db");this._$hoverCanvas=this._createCanvas("hover","#fff");this._$failCanvas=this._createCanvas("fail","#da5a47").hide();this._staticCtx=this._$staticCanvas[0].getContext("2d");this._hoverCtx=this._$hoverCanvas[0].getContext("2d");this._drawArc(this._$bgCanvas[0].getContext("2d"),0,1);this._drawArc(this._$failCanvas[0].getContext("2d"),0,1)}else this._progressBar=new Craft.ProgressBar(this.$a),this._progressBar.showProgressBar();this.addListener(this.$a,
"click","toggleHud")},setDescription:function(a){this.$a.attr("title",a)},setProgress:function(a,b){this._canvasSupported?b?this._animateArc(0,a):this._setArc(0,a):this._progressBar.setProgressPercentage(100*a)},complete:function(){this.completed=!0;this._canvasSupported?this._animateArc(0,1,c.proxy(function(){this._$bgCanvas.velocity("fadeOut");this._animateArc(1,1,c.proxy(function(){this.$li.remove();this.destroy()},this))},this)):(this._progressBar.setProgressPercentage(100),this.$a.velocity("fadeOut"))},
showFailMode:function(){this.failMode||(this.failMode=!0,this._canvasSupported?(this._$bgCanvas.hide(),this._$staticCanvas.hide(),this._$hoverCanvas.hide(),this._$failCanvas.show()):(this._progressBar.$progressBar.css("border-color","#da5a47"),this._progressBar.$innerProgressBar.css("background-color","#da5a47"),this._progressBar.setProgressPercentage(50)),this.setDescription(Craft.t("Failed task")))},hideFailMode:function(){this.failMode&&(this.failMode=!1,this._canvasSupported?(this._$bgCanvas.show(),
this._$staticCanvas.show(),this._$hoverCanvas.show(),this._$failCanvas.hide()):(this._progressBar.$progressBar.css("border-color",""),this._progressBar.$innerProgressBar.css("background-color",""),this._progressBar.setProgressPercentage(50)))},toggleHud:function(){this.hud?this.hud.toggle():this.hud=new h},_createCanvas:function(a,b){var d=c('<canvas id="taskicon-'+a+'" width="'+this._canvasSize+'" height="'+this._canvasSize+'"/>').appendTo(this.$a),e=d[0].getContext("2d");e.strokeStyle=b;e.lineWidth=
this._lineWidth;e.lineCap="round";return d},_setArc:function(a,b){this._arcStartPos=a;this._arcEndPos=b;this._drawArc(this._staticCtx,a,b);this._drawArc(this._hoverCtx,a,b)},_drawArc:function(a,b,c){a.clearRect(0,0,this._canvasSize,this._canvasSize);a.beginPath();a.arc(this._arcPos,this._arcPos,this._arcRadius,(1.5+2*b)*Math.PI,(1.5+2*c)*Math.PI);a.stroke();a.closePath()},_animateArc:function(a,b,c){this._arcStepTimeout&&clearTimeout(this._arcStepTimeout);this._arcStep=0;this._arcStartStepSize=(a-
this._arcStartPos)/10;this._arcEndStepSize=(b-this._arcEndPos)/10;this._arcAnimateCallback=c;this._takeNextArcStep()},_takeNextArcStep:function(){this._setArc(this._arcStartPos+this._arcStartStepSize,this._arcEndPos+this._arcEndStepSize);this._arcStep++;10>this._arcStep?this._arcStepTimeout=setTimeout(c.proxy(this,"_takeNextArcStep"),50):this._arcAnimateCallback&&this._arcAnimateCallback()}}),h=Garnish.HUD.extend({icon:null,tasksById:null,completedTasks:null,updateTasksTimeout:null,completed:!1,init:function(){this.icon=
Craft.cp.taskProgressIcon;this.tasksById={};this.completedTasks=[];this.base(this.icon.$a);this.$body.attr("id","tasks-hud");Craft.cp.runningTaskInfo&&"error"!=Craft.cp.runningTaskInfo.status&&this.showTaskInfo([Craft.cp.runningTaskInfo]);this.$hud.trigger("resize")},onShow:function(){Craft.cp.stopTrackingTaskProgress();this.updateTasks();this.base()},onHide:function(){this.updateTasksTimeout&&clearTimeout(this.updateTasksTimeout);this.completed||Craft.cp.trackTaskProgress();if(this.completedTasks.length){for(var a=
0;a<this.completedTasks.length;a++)this.completedTasks[a].destroy();this.completedTasks=[]}this.base()},updateTasks:function(){this.completed=!1;Craft.postActionRequest("tasks/getTaskInfo",c.proxy(function(a,b){"success"==b&&this.showTaskInfo(a)},this))},showTaskInfo:function(a){var b=[];if(a)for(var d=0;d<a.length;d++)b.push(a[d].id);for(var e in this.tasksById)Craft.inArray(e,b)||(this.tasksById[e].complete(),this.completedTasks.push(this.tasksById[e]),delete this.tasksById[e]);if(a&&a.length){e=
b=!1;for(d=0;d<a.length;d++){var g=a[d];b||"running"!=g.status?e||"error"!=g.status||(e=!0):b=!0;if(this.tasksById[g.id])this.tasksById[g.id].updateStatus(g);else{this.tasksById[g.id]=new h.Task(this,g);for(var f=d+1;f<a.length;f++)if(this.tasksById[a[f].id]){this.tasksById[g.id].$container.insertBefore(this.tasksById[a[f].id].$container);break}}}b?this.updateTasksTimeout=setTimeout(c.proxy(this,"updateTasks"),500):(this.completed=!0,e&&Craft.cp.setRunningTaskInfo({status:"error"}))}else this.completed=
!0,Craft.cp.setRunningTaskInfo(null),this.hide()}});h.Task=Garnish.Base.extend({hud:null,id:null,level:null,description:null,status:null,progress:null,$container:null,$statusContainer:null,$descriptionContainer:null,_progressBar:null,init:function(a,b){this.hud=a;this.id=b.id;this.level=b.level;this.description=b.description;this.$container=c('<div class="task"/>').appendTo(this.hud.$body);this.$statusContainer=c('<div class="task-status"/>').appendTo(this.$container);this.$descriptionContainer=c('<div class="task-description"/>').appendTo(this.$container).text(b.description);
this.$container.data("task",this);0!=this.level&&(this.$container.css("padding-"+Craft.left,24+24*this.level),c('<div class="indent" data-icon="'+("ltr"==Craft.orientation?"rarr":"larr")+'"/>').appendTo(this.$descriptionContainer));this.updateStatus(b)},updateStatus:function(a){if(this.status!=a.status)switch(this.$statusContainer.empty(),this.status=a.status,this.status){case "pending":this.$statusContainer.text(Craft.t("Pending"));break;case "running":this._progressBar=new Craft.ProgressBar(this.$statusContainer);
this._progressBar.showProgressBar();break;case "error":if(c('<span class="error">'+Craft.t("Failed")+"</span>").appendTo(this.$statusContainer),0==this.level){var b=c('<a class="menubtn error" title="'+Craft.t("Options")+'"/>').appendTo(this.$statusContainer);c('<div class="menu"><ul><li><a data-action="rerun">'+Craft.t("Try again")+'</a></li><li><a data-action="cancel">'+Craft.t("Cancel")+"</a></li></ul></div>").appendTo(this.$statusContainer);new Garnish.MenuBtn(b,{onOptionSelect:c.proxy(this,"performErrorAction")})}}"running"==
this.status&&(this._progressBar.setProgressPercentage(100*a.progress),0==this.level&&Craft.cp.setRunningTaskInfo(a,!0))},performErrorAction:function(a){for(var b=this.$container.nextAll(),d=0;d<b.length;d++){var e=c(b[d]).data("task");if(e&&0!=e.level)e.destroy();else break}switch(c(a).data("action")){case "rerun":Craft.postActionRequest("tasks/rerunTask",{taskId:this.id},c.proxy(function(a,b){"success"==b&&(this.updateStatus(a),this.hud.completed&&this.hud.updateTasks())},this));break;case "cancel":Craft.postActionRequest("tasks/deleteTask",
{taskId:this.id},c.proxy(function(a,b){"success"==b&&(this.destroy(),this.hud.completed&&this.hud.updateTasks())},this))}},complete:function(){this.$statusContainer.empty();c('<div data-icon="check"/>').appendTo(this.$statusContainer)},destroy:function(){this.hud.tasksById[this.id]&&delete this.hud.tasksById[this.id];this.$container.remove();this.base()}})})(jQuery);

//# sourceMappingURL=cp.min.map
