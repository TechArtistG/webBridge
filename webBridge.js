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
        constructor() {
            var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
            this.ARGUMENT_NAMES = /([^\s,]+)/g;
        }
        
        _callSyncFunction(fnName, args) {
            var retVal = this[fnName](args);
            //this.syncFunctionReturn
        }
        
        _syncFunctionReturn(retVal) {
            
        }
        
        _eventTrigger(eventArgs) {
            
        }
        
        _getParamNames(func) {
          var fnStr = func.toString().replace(STRIP_COMMENTS, '');
          var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
          if(result === null)
             result = [];
          return result;
        }
        
        _getAllMethodNames() {
            var obj = this;
            let methods = new Set();
            while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj)
            keys.forEach((k) => methods.add(k));
          }
          return methods;
        }
        
        _getInterface() {
         
        }
    }
    $wbi.i = new(i);
    
}( window.$wbi = window.$wbi || {}));
