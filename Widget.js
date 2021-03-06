define([
    'dojo/_base/declare', 
    'jimu/BaseWidget',
    'dojo/_base/lang',
    'esri/tasks/locator',
    'esri/geometry/webMercatorUtils'
    ],

function(declare, BaseWidget, lang, Locator, webMercatorUtils) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // Custom widget code goes here 
	
    baseClass : 'jimu-widget-reversegeocode',

    locator : undefined,

    startup : function () {
        this.inherited(arguments);
        this._initGeocoder();
    },

    onOpen : function () {
        this._registerMapEvents();
    },

    onClose : function () {
        this._unregisterMapEvents();
    },

    _initGeocoder : function () {

        this.locator = new Locator(this.config.reversegeocode.serviceUrl);
        this.locator.on("location-to-address-complete", lang.hitch(this, function (evt) {
            var address = evt.address.address;
            this.geoResult.innerHTML = address.Address + ", " + address.City + ", " + address.State + address.Zip;
            this.status.innerHTML = "Address Found";
            this.status.setAttribute('class', 'success')
        }));
    },

    _registerMapEvents : function () {
        this.mapClickEvent =  this.map.on("click", lang.hitch(this, function (evt) {
            this.status.innerHTML = "Finding Address...";
            this.locator.locationToAddress(webMercatorUtils.webMercatorToGeographic(evt.mapPoint), 100, null, lang.hitch(this, function () {
                this.status.innerHTML = "Address Error - Not Found";
                this.geoResult.innerHTML = "";
                this.status.setAttribute('class', 'error');
            }));            
        }));
    },

    _unregisterMapEvents : function () {
        this.mapClickEvent.remove();
    }
    
    //this property is set by the framework when widget is loaded.
     //name: 'CustomWidget',


//methods to communication with app container:

    // postCreate: function() {
    //   this.inherited(arguments);
    //   console.log('postCreate');
    // },

   // startup: function() {
    //  this.inherited(arguments);
    //  this.mapIdNode.innerHTML = 'map id:' + this.map.id;
    //  console.log('startup');
   // },

    // onOpen: function(){
    //   console.log('onOpen');
    // },

    // onClose: function(){
    //   console.log('onClose');
    // },

    // onMinimize: function(){
    //   console.log('onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('onMaximize');
    // },

    // onSignIn: function(credential){
    //   /* jshint unused:false*/
    //   console.log('onSignIn');
    // },

    // onSignOut: function(){
    //   console.log('onSignOut');
    // }
      
    // onPositionChange: function(){
    //   console.log('onPositionChange');
    // },

    // resize: function(){
    //   console.log('resize');
    // }

//methods to communication between widgets:

  });
});