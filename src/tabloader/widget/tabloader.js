dojo.provide("tabloader.widget.tabloader");

mxui.widget.declare('tabloader.widget.tabloader', {
	addons       : [mendix.addon._Contextable],
	inputargs: {
		tabclass : '',
		tabindicator : '',
	},
	
	tabContainer : null,
	_hasStarted : false,
	tabIndex : 0,
	
	//constructor
	postCreate: function () {
		// debugger;
		logger.debug(this.id + ".postCreate", this.domNode);
		this.actRendered();
	},
	
	startup : function() {
		if (this._hasStarted)
			return;

		this._hasStarted = true;
		logger.debug("Started");
		
		/*this.update();*/
		this.actLoaded();
	},
	
	update : function(obj, callback) {
		console.debug("Updating");
		/*if (!obj) {
			typeof(callback) == "function" && callback();
			return;
		}*/
		//this.guid = obj.getGUID();
		this.subscribe({
			guid : obj.getGUID(),
			callback : this.objChanged
		});
		
		console.debug("Searching for tab indicator: " + this.tabindicator);
		var missingAttrs = false, index = 0;
		if (!obj.hasAttribute(this.tabindicator)) {
			missingAttrs = true;
		} else {
			index = obj.get(this.tabindicator);
		}
		console.debug("Tab indicator: " + this.tabindicator + (missingAttrs ? " is missing " : "") + " tab indicator value: " + index );
		
		this.selectTab(index);

		typeof(callback) == "function" && callback();
	},
	
	getTab : function ( tabIndex ) {
        var gototab = null;
        this.tabContainer = dijit.byNode(dojo.query("."+this.tabclass)[0]);
        var tablist = this.tabContainer.getChildren();
        
		if( tabIndex == null ) 
			tabIndex = 0;
		
		console.debug("Searching for tab index: " + tabIndex);
		
		if (tablist.length > 0 ) {
			if( tabIndex >= tablist.length ) {
				tabIndex = tablist.length - 1;
				console.debug("Setting tab index to: " + tabIndex);
			}
			
			gototab = tablist[tabIndex];
			console.debug("Found a tab: " + gototab);
			
			/* Sinces tab pages can be conditionaly visible, try to find the next tab page that is visible */ 
//			while( gototab != null && gototab._hidden==true ) {
//				tabIndex++;
//				if( tabIndex >= tablist.length )
//					tabIndex = 0;

//				console.debug("Current tab is not visible going to next one[" + tabIndex + "]: " + gototab);
//				gototab = tablist[tabIndex];
//			}
		}
        return gototab;
    },

    selectTab : function (index) {
        var tab = this.getTab(index);
		if (tab) {
			logger.debug("Found a tab and setting selection: " + index);
            tab.container.show(tab);
		}
    },
	
	objChanged : function (objId) {
		mx.processor.get({
			guid : objId,
			callback : this.update
		}, this);
	},

	uninitialize : function(){
	}
});
