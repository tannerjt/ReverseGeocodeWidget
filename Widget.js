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
	
    baseClass: 'jimu-widget-reversegeocode',

    locator: undefined,

    //Change this for your own geocoder if needed
    serviceURL : "http://navigator.state.or.us/arcgis/rest/services/Locators/gc_Composite/GeocodeServer"

    startup : function () {
        this.inherited(arguments);
        this._initGeocoder();
    },

    _initGeocoder : function () {
        this.locator = new Locator(this.serviceURL);
        this.locator.on("location-to-address-complete", lang.hitch(this, function (evt) {
            var address = evt.address.address;
            this.geoResult.innerHTML = address.Address + ", " + address.City + ", " + address.State + address.Zip;
            this.status.innerHTML = "Address Found";
            this.status.setAttribute('class', 'success')
        }));
        this._registerMapEvents();
    },

    _registerMapEvents : function () {
        this.map.graphics.clear();
        this.map.on("click", lang.hitch(this, function (evt) {
            this.status.innerHTML = "Finding Address...";
            this.locator.locationToAddress(webMercatorUtils.webMercatorToGeographic(evt.mapPoint), 100, null, lang.hitch(this, function () {
                this.status.innerHTML = "Address Error - Not Found";
                this.status.setAttribute('class', 'error');
            }));            
        }));
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