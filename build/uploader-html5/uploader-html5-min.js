YUI.add("uploader-html5",function(e,t){function i(){i.superclass.constructor.apply(this,arguments)}var n=e.Lang.sub,r=e.Uploader.Queue;e.UploaderHTML5=e.extend(i,e.Widget,{_fileInputField:null,_buttonBinding:null,queue:null,initializer:function(){this._fileInputField=null,this.queue=null,this._buttonBinding=null,this._fileList=[],this.publish("fileselect"),this.publish("uploadstart"),this.publish("fileuploadstart"),this.publish("uploadprogress"),this.publish("totaluploadprogress"),this.publish("uploadcomplete"),this.publish("alluploadscomplete"),this.publish("uploaderror"),this.publish("dragenter"),this.publish("dragover"),this.publish("dragleave"),this.publish("drop")},renderUI:function(){var t=this.get("contentBox"),n=this.get("selectFilesButton");n.setStyles({width:"100%",height:"100%"}),t.append(n),this._fileInputField=e.Node.create(i.HTML5FILEFIELD_TEMPLATE),t.append(this._fileInputField)},bindUI:function(){this._bindSelectButton(),this._setMultipleFiles(),this._setFileFilters(),this._bindDropArea(),this._triggerEnabled(),this.after("multipleFilesChange",this._setMultipleFiles,this),this.after("fileFiltersChange",this._setFileFilters,this),this.after("enabledChange",this._triggerEnabled,this),this.after("selectFilesButtonChange",this._bindSelectButton,this),this.after("dragAndDropAreaChange",this._bindDropArea,this),this.after("tabIndexChange",function(){this.get("selectFilesButton").set("tabIndex",this.get("tabIndex"))},this),this._fileInputField.on("change",this._updateFileList,this),this._fileInputField.on("click",function(e){e.stopPropagation()},this),this.get("selectFilesButton").set("tabIndex",this.get("tabIndex"))},_rebindFileField:function(){this._fileInputField.remove(!0),this._fileInputField=e.Node.create(i.HTML5FILEFIELD_TEMPLATE),this.get("contentBox").append(this._fileInputField),this._fileInputField.on("change",this._updateFileList,this),this._setMultipleFiles(),this._setFileFilters()},_bindDropArea:function(e){var t=e||{prevVal:null},n=this.get("dragAndDropArea");t.prevVal!==null&&(t.prevVal.detach("drop",this._ddEventHandler),t.prevVal.detach("dragenter",this._ddEventHandler),t.prevVal.detach("dragover",this._ddEventHandler),t.prevVal.detach("dragleave",this._ddEventHandler)),n!==null&&(n.on("drop",this._ddEventHandler,this),n.on("dragenter",this._ddEventHandler,this),n.on("dragover",this._ddEventHandler,this),n.on("dragleave",this._ddEventHandler,this))},_bindSelectButton:function(){this._buttonBinding=this.get("selectFilesButton").on("click",this.openFileSelectDialog,this)},_ddEventHandler:function(t){t.stopPropagation(),t.preventDefault();if(e.Array.indexOf(t._event.dataTransfer.types,"Files")>-1)switch(t.type){case"dragenter":this.fire("dragenter");break;case"dragover":this.fire("dragover");break;case"dragleave":this.fire("dragleave");break;case"drop":var n=t._event.dataTransfer.files,r=[],i=this.get("fileFilterFunction"),s;i?e.each(n,function(t){var n=new e.FileHTML5(t);i(n)&&r.push(n)}):e.each(n,function(t){r.push(new e.FileHTML5(t))}),r.length>0&&(s=this.get("fileList"),this.set("fileList",this.get("appendNewFiles")?s.concat(r):r),this.fire("fileselect",{fileList:r})),this.fire("drop",{fileList:r})}},_setButtonClass:function(e,t){t?this.get("selectFilesButton").addClass(this.get("buttonClassNames")[e]):this.get("selectFilesButton").removeClass(this.get("buttonClassNames")[e])},_setMultipleFiles:function(){this.get("multipleFiles")===!0?this._fileInputField.set("multiple","multiple"):this._fileInputField.set("multiple","")},_setFileFilters:function(){this.get("fileFilters").length>0?this._fileInputField.set("accept",this.get("fileFilters").join(",")):this._fileInputField.set("accept","")},_triggerEnabled:function(){this.get("enabled")&&this._buttonBinding===null?(this._bindSelectButton(),this._setButtonClass("disabled",!1),this.get("selectFilesButton").setAttribute("aria-disabled","false")):!this.get("enabled")&&this._buttonBinding&&(this._buttonBinding.detach(),this._buttonBinding=null,this._setButtonClass("disabled",!0),this.get("selectFilesButton").setAttribute("aria-disabled","true"))},_getFileList:function(){return this._fileList.concat()},_setFileList:function(e){return this._fileList=e.concat(),this._fileList.concat()},_updateFileList:function(t){var n=t.target.getDOMNode().files,r=[],i=this.get("fileFilterFunction"),s;i?e.each(n,function(t){var n=new e.FileHTML5(t);i(n)&&r.push(n)}):e.each(n,function(t){r.push(new e.FileHTML5(t))}),r.length>0&&(s=this.get("fileList"),this.set("fileList",this.get("appendNewFiles")?s.concat(r):r),this.fire("fileselect",{fileList:r})),this._rebindFileField()},_uploadEventHandler:function(e){switch(e.type){case"file:uploadstart":this.fire("fileuploadstart",e);break;case"file:uploadprogress":this.fire("uploadprogress",e);break;case"uploaderqueue:totaluploadprogress":this.fire("totaluploadprogress",e);break;case"file:uploadcomplete":this.fire("uploadcomplete",e);break;case"uploaderqueue:alluploadscomplete":this.queue=null,this.fire("alluploadscomplete",e);break;case"file:uploaderror":case"uploaderqueue:uploaderror":this.fire("uploaderror",e);break;case"file:uploadcancel":case"uploaderqueue:uploadcancel":this.fire("uploadcancel",e)}},openFileSelectDialog:function(){var e=this._fileInputField.getDOMNode();e.click&&e.click()},upload:function(t,n,r){var i=n||this.get("uploadURL"),s=r||this.get("postVarsPerFile"),o=t.get("id");s=s.hasOwnProperty(o)?s[o]:s,t instanceof e.FileHTML5&&(t.on("uploadstart",this._uploadEventHandler,this),t.on("uploadprogress",this._uploadEventHandler,this),t.on("uploadcomplete",this._uploadEventHandler,this),t.on("uploaderror",this._uploadEventHandler,this),t.on("uploadcancel",this._uploadEventHandler,this),t.startUpload(i,s,this.get("fileFieldName")))},uploadAll:function(e,t){this.uploadThese(this.get("fileList"),e,t)},uploadThese:function(t,n,i){if(!this.queue){var s=n||this.get("uploadURL"),o=i||this.get("postVarsPerFile");this.queue=new r({simUploads:this.get("simLimit"),errorAction:this.get("errorAction"
),fileFieldName:this.get("fileFieldName"),fileList:t,uploadURL:s,perFileParameters:o,retryCount:this.get("retryCount"),uploadHeaders:this.get("uploadHeaders"),withCredentials:this.get("withCredentials")}),this.queue.on("uploadstart",this._uploadEventHandler,this),this.queue.on("uploadprogress",this._uploadEventHandler,this),this.queue.on("totaluploadprogress",this._uploadEventHandler,this),this.queue.on("uploadcomplete",this._uploadEventHandler,this),this.queue.on("alluploadscomplete",this._uploadEventHandler,this),this.queue.on("uploadcancel",this._uploadEventHandler,this),this.queue.on("uploaderror",this._uploadEventHandler,this),this.queue.startUpload(),this.fire("uploadstart")}else this.queue._currentState===r.UPLOADING&&(this.queue.set("perFileParameters",this.get("postVarsPerFile")),e.each(t,function(e){this.queue.addToQueueBottom(e)},this))}},{HTML5FILEFIELD_TEMPLATE:"<input type='file' style='visibility:hidden; width:0px; height: 0px;'>",SELECT_FILES_BUTTON:'<button type="button" class="yui3-button" role="button" aria-label="{selectButtonLabel}" tabindex="{tabIndex}">{selectButtonLabel}</button>',TYPE:"html5",NAME:"uploader",ATTRS:{appendNewFiles:{value:!0},buttonClassNames:{value:{hover:"yui3-button-hover",active:"yui3-button-active",disabled:"yui3-button-disabled",focus:"yui3-button-selected"}},dragAndDropArea:{value:null,setter:function(t){return e.one(t)}},enabled:{value:!0},errorAction:{value:"continue",validator:function(e){return e===r.CONTINUE||e===r.STOP||e===r.RESTART_ASAP||e===r.RESTART_AFTER}},fileFilters:{value:[]},fileFilterFunction:{value:null},fileFieldName:{value:"Filedata"},fileList:{value:[],getter:"_getFileList",setter:"_setFileList"},multipleFiles:{value:!1},postVarsPerFile:{value:{}},selectButtonLabel:{value:"Select Files"},selectFilesButton:{valueFn:function(){return e.Node.create(n(e.UploaderHTML5.SELECT_FILES_BUTTON,{selectButtonLabel:this.get("selectButtonLabel"),tabIndex:this.get("tabIndex")}))}},simLimit:{value:2,validator:function(e){return e>=1&&e<=5}},uploadURL:{value:""},uploadHeaders:{value:{}},withCredentials:{value:!0},retryCount:{value:3}}}),e.UploaderHTML5.Queue=r},"3.18.0",{requires:["widget","node-event-simulate","file-html5","uploader-queue"]});
