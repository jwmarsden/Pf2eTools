(()=>{try{self["workbox:core:6.5.3"]&&_()}catch{}var c=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};function y(r){r.then(()=>{})}try{self["workbox:window:6.5.3"]&&_()}catch{}function v(r,e){return new Promise(t=>{let o=new MessageChannel;o.port1.onmessage=s=>{t(s.data)},r.postMessage(e,[o.port2])})}var g=class{constructor(){this._eventListenerRegistry=new Map}addEventListener(e,t){this._getEventListenersByType(e).add(t)}removeEventListener(e,t){this._getEventListenersByType(e).delete(t)}dispatchEvent(e){e.target=this;let t=this._getEventListenersByType(e.type);for(let o of t)o(e)}_getEventListenersByType(e){return this._eventListenerRegistry.has(e)||this._eventListenerRegistry.set(e,new Set),this._eventListenerRegistry.get(e)}};function h(r,e){let{href:t}=location;return new URL(r,t).href===new URL(e,t).href}var a=class{constructor(e,t){this.type=e,Object.assign(this,t)}};var E=200,S=6e4,b={type:"SKIP_WAITING"},p=class extends g{constructor(e,t={}){super(),this._registerOptions={},this._updateFoundCount=0,this._swDeferred=new c,this._activeDeferred=new c,this._controllingDeferred=new c,this._registrationTime=0,this._ownSWs=new Set,this._onUpdateFound=()=>{let o=this._registration,s=o.installing;this._updateFoundCount>0||!h(s.scriptURL,this._scriptURL.toString())||performance.now()>this._registrationTime+S?(this._externalSW=s,o.removeEventListener("updatefound",this._onUpdateFound)):(this._sw=s,this._ownSWs.add(s),this._swDeferred.resolve(s)),++this._updateFoundCount,s.addEventListener("statechange",this._onStateChange)},this._onStateChange=o=>{let s=this._registration,i=o.target,{state:l}=i,w=i===this._externalSW,f={sw:i,isExternal:w,originalEvent:o};if(!w&&this._isUpdate&&(f.isUpdate=!0),this.dispatchEvent(new a(l,f)),l==="installed"?this._waitingTimeout=self.setTimeout(()=>{l==="installed"&&s.waiting===i&&this.dispatchEvent(new a("waiting",f))},E):l==="activating"&&(clearTimeout(this._waitingTimeout),w||this._activeDeferred.resolve(i)),!1)switch(l){case"installed":case"activated":case"redundant":}},this._onControllerChange=o=>{let s=this._sw,i=s!==navigator.serviceWorker.controller;this.dispatchEvent(new a("controlling",{isExternal:i,originalEvent:o,sw:s,isUpdate:this._isUpdate})),i||this._controllingDeferred.resolve(s)},this._onMessage=async o=>{let{data:s,ports:i,source:l}=o;await this.getSW(),this._ownSWs.has(l)&&this.dispatchEvent(new a("message",{data:s,originalEvent:o,ports:i,sw:l}))},this._scriptURL=e,this._registerOptions=t,navigator.serviceWorker.addEventListener("message",this._onMessage)}async register({immediate:e=!1}={}){!e&&document.readyState!=="complete"&&await new Promise(o=>window.addEventListener("load",o)),this._isUpdate=Boolean(navigator.serviceWorker.controller),this._compatibleControllingSW=this._getControllingSWIfCompatible(),this._registration=await this._registerScript(),this._compatibleControllingSW&&(this._sw=this._compatibleControllingSW,this._activeDeferred.resolve(this._compatibleControllingSW),this._controllingDeferred.resolve(this._compatibleControllingSW),this._compatibleControllingSW.addEventListener("statechange",this._onStateChange,{once:!0}));let t=this._registration.waiting;return t&&h(t.scriptURL,this._scriptURL.toString())&&(this._sw=t,y(Promise.resolve().then(()=>{this.dispatchEvent(new a("waiting",{sw:t,wasWaitingBeforeRegister:!0}))}))),this._sw&&(this._swDeferred.resolve(this._sw),this._ownSWs.add(this._sw)),this._registration.addEventListener("updatefound",this._onUpdateFound),navigator.serviceWorker.addEventListener("controllerchange",this._onControllerChange),this._registration}async update(){!this._registration||await this._registration.update()}get active(){return this._activeDeferred.promise}get controlling(){return this._controllingDeferred.promise}getSW(){return this._sw!==void 0?Promise.resolve(this._sw):this._swDeferred.promise}async messageSW(e){let t=await this.getSW();return v(t,e)}messageSkipWaiting(){this._registration&&this._registration.waiting&&v(this._registration.waiting,b)}_getControllingSWIfCompatible(){let e=navigator.serviceWorker.controller;if(e&&h(e.scriptURL,this._scriptURL.toString()))return e}async _registerScript(){try{let e=await navigator.serviceWorker.register(this._scriptURL,this._registerOptions);return this._registrationTime=performance.now(),e}catch(e){throw e}}};if(!("serviceWorker"in navigator))throw new Error("no serviceWorker in navigator, no sw will be injected");var m=(r,e)=>{let t=null;return function(...o){t===null&&(r.apply(this,o),t=setTimeout(()=>{t=null},e))}},T={generic:m(()=>{JqueryUtil.doToast({content:"Failing to fetch some generic content - you are offline and have not viewed this content before. Unexpected behavior may occur.",type:"warning",autoHideTime:2500})},1e4),json:m(()=>{JqueryUtil.doToast({content:"Failing to fetch data - you are offline and have not viewed this content before. This page is likely to fail to load or behave strangely.",type:"danger",autoHideTime:9e3})},2e3),image:m(()=>{JqueryUtil.doToast({content:"Failing to fetch images - you are offline and have not viewed this content before. Pages should load, but some images may be substituted for placeholders.",type:"info",autoHideTime:5e3})},6e4)},d=new p("sw.js");d.addEventListener("controlling",()=>{JqueryUtil.doToast({content:`${window.location.hostname} has been updated - reload this page to see new content or fix transition issues`,type:"success",autoHideTime:0})});d.register();var R=r=>{d.messageSW({type:"CACHE_ROUTES",payload:{routeRegex:r}}),JqueryUtil.doToast({content:"warming up!",autoHideTime:500})},C=()=>{d.messageSW({type:"CANCEL_CACHE_ROUTES"}),setTimeout(()=>{u(),JqueryUtil.doToast("Preload was canceled. Any data that was preloaded was saved.")},1e3)},W=()=>{d.messageSW({type:"RESET"}),JqueryUtil.doToast({content:"Resetting..."})};globalThis.swCacheRoutes=R;globalThis.swResetAll=W;var n=null,u=()=>{n!==null&&(n.$wrapOuter.remove(),n=null)},k=()=>{n!==null&&u();let r=$('<div class="page__disp-download-progress-bar"/>'),e=$('<div class="page__disp-download-progress-text ve-flex-vh-center bold">0%</div>'),t=$('<button class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></button>').click(()=>{C()}),o=$$`<div class="page__wrp-download-bar w-100 relative mr-2">${r}${e}</div>`;n={$wrapOuter:$$`<div class="page__wrp-download">
			${o}
			${t}
		</div>`.appendTo(document.body),$wrapBar:o,$displayProgress:r,$displayPercent:e}},U=r=>{switch(n===null&&k(),r.type){case"CACHE_ROUTES_PROGRESS":let e=`${(100*(r.payload.fetched/r.payload.fetchTotal)).toFixed(3)}%`;n.$displayProgress.css("width",e),n.$displayPercent.text(e),r.payload.fetched===r.payload.fetchTotal&&L();break;case"CACHE_ROUTES_ERROR":for(let t of r.payload.errors);n.$wrapBar.addClass("page__wrp-download-bar--error"),n.$displayProgress.addClass("page__disp-download-progress-bar--error"),n.$displayPercent.text("Error!"),setTimeout(()=>{u(),JqueryUtil.doToast({type:"warning",autoHideTime:15e3,content:`An error occurred while preloading data.
					You may have gone offline, or the server may have been overwhelmed?
					Feel free to retry the preload.
					Progress made was saved. ${VeCt.STR_SEE_CONSOLE}`})},2e3);break}},L=()=>{u(),JqueryUtil.doToast({type:"success",content:"Preload finished. The content is now ready to view offline."})};d.addEventListener("message",r=>{let e=r.data;switch(e.type){case"FETCH_ERROR":T[e.payload]();break;case"CACHE_ROUTES_PROGRESS":case"CACHE_ROUTES_ERROR":U(e);break}});})();