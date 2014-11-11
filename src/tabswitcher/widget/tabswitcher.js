dojo.provide("tabswitcher.widget.tabswitcher");

mendix.widget.declare('tabswitcher.widget.tabswitcher', {
    inputargs: {
        
		tabclass : '',
        direction: '',
        btnTitle : '',
        showAsButton : '',
		btnIcon : ''
        
    },
    
    parent : null,
	btn : null,
    
	postCreate : function() {
        this.buildSwitcher();
		this.actRendered();
	},
    
    buildSwitcher : function () {
        this.btn = new mendix.widget._Button({
			caption		: this.btnTitle,
			icon		: this.btnIcon,
			action		: dojo.hitch(this, this.selectTab),
			type		: this.showAsButton,
			cssclass	: ""
		});
        this.domNode.appendChild(this.btn.domNode);
    },
	
	getTab : function () {
        var gototab = null;
        this.parent = dijit.byNode(dojo.query("."+this.tabclass)[0]);
        var tablist = this.parent.getChildren();
        
		if (tablist.length > 0 && tablist[0].controlButton) {
			tablist = tablist.filter(function (item) {
				var exists = dojo.marginBox(item.controlButton.domNode).h>0;
				return exists?item:null
			});
			
			for (var i = 0; tablist.length > i; i++) {
				if (this.parent.selectedChildWidget === tablist[i]) {
					if (this.direction === 'Next')
						gototab = tablist[i+1];
					else
						gototab = tablist[i-1];
					
					break;
				}
			}
		}
        return gototab;
    },
    
    selectTab : function () {
        var tab = this.getTab();
		if (tab) {
            this.parent.selectChild(tab);
		}
    },
    
	uninitialize : function(){
	}
});