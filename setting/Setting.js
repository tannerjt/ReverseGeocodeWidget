///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    'dojo/_base/lang',
    'dojo/on',
    "dijit/form/TextBox"
  ],
  function(
    declare,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    lang,
    on) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      //these two properties is defined in the BaseWidget
      baseClass: 'jimu-widget-reversegeocode-setting',

      startup: function() {
        this.inherited(arguments);
        console.log('startup');
        if (!this.config.reversegeocode) {
          this.config.reversegeocode = {};
        }
        this.setConfig(this.config);
      },

      setConfig: function(config) {
        console.log('set config');
        if(config.reversegeocode.serviceUrl) {
          this.serviceUrl.set('value', config.reversegeocode.serviceUrl)
        }
        this.config = config;
        //we may need to set something here
      },

      //When user click's 'OK'
      getConfig: function() {
        this.config.reversegeocode.serviceUrl = this.serviceUrl.value;
        return this.config;
      }

    });
  });