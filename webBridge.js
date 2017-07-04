/*(function( $wbi ) {
    $wbi.m = {};
    $wbi.m.name = "untitledInterface";
    $wbi.p = {};
    $wbi.f = {};
    $wbi.fs = {};
    $wbi.e = {};
}( window.$wbi = window.$wbi || {}));*/
"use strict";
(function( $wbi ) {
    
    
    class i {
        var instance;
        constructor() {
            // Singleton
            if(!instance){
                  instance = this;
            }
        }
        
        callSyncFunction(fnName, args) {
            var retVal = this[fnName](args);
            this.syncFunctionReturn
        }
        
        syncFunctionReturn(retVal) {
            
        }
        
        eventTrigger(eventArgs) {
            
        }
        
        function getAllSubclasses(baseClass) {
          var globalObject = Function('return this')(); 
          var allVars = Object.keys(globalObject);
          var classes = allVars.filter(function (key) {
          try {
            var obj = globalObject[key];
                return obj.prototype instanceof baseClass;
            } catch (e) {
                return false;
            }
          });
          return classes;
        }
    }
    
}( window.$wbi = window.$wbi || {}));
