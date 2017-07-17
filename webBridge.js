"use strict";
(function( wbi ) {
    wbi.createInterface = function(objName, classDef) {  
        wbi[objName] = new classDef;
        wbi[objName]._iName = objName;        
    }
    
    wbi.i = class {
        constructor() {
            this._iName = "";
            this._StripComments = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
            this._ArgNames = /([^\s,]+)/g;
            this._MethodFilter = ["constructor", "hasOwnProperty", "valueOf", "toString", "toLocaleString", "isPrototypeOf", "propertyIsEnumerable"];
        }
        
        _setProperty(propName, val) {
            
        }
        
        _getProperty(propName) {
            
        }
        
        
        _callSyncMethod(fnName, args) {
            var retVal = this[fnName](args);
            //this.syncFunctionReturn
        }   
        
        _syncMethodReturn(retVal) {
            
        }
        
        _eventTrigger(eventArgs) {
            
        }
        
        _getMethodParamNames(func) {
          var fnStr = func.toString().replace(this._StripComments, '');
          var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(this._ArgNames);
          if(result === null)
             result = [];
          return(result);
        }
        
        _getMethodNames() {
            var obj = this;
            var self = this;
            let methods = new Set();
            while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj)            
            keys.forEach(function(k) {            	
            	if(self._MethodFilter.indexOf(k) == -1 && !k.startsWith("_")) {
              	methods.add(k);
              }
            });
          }
          return(methods);
        }
        
        _getPropertyNames() {
            var props = [];
            for(var propName in this) {
            		if(!propName.startsWith("_")) {
                	props.push(propName);
                }                            
            }            
            return(props);
        }
        
        _getInterface() {
            var self = this;
            var retObj = {};
            retObj.interface = this._iName;
            
            // Props
            retObj.props = [];
            self._getPropertyNames().forEach(function(p) { retObj.props.push(p) });
            
            // Methods
            retObj.methods = [];
            self._getMethodNames().forEach(function(m) { 
                var mObj = {};
                mObj.name = m;
                mObj.args = self._getMethodParamNames(self[m]);
                retObj.methods.push(mObj);
            });
            return(retObj);
        }
    }
    
    
    wbi.test_class = class extends wbi.i{
    	constructor() {
      	super();
      	this.testprop = 0;
      }
      
      __testFnA() {return({
          comment: "This is a test method",
          returnType: "string",
          args:[
              {name: "argA", type:"string"},
              {name: "argB", type:"number"}
          ]
      })};
      testFnA(argA, argB) {
      	
      }
      
      testFnB(argA, argB) {
      	
      }
    }
    wbi.createInterface("test", wbi.test_class);
    //this.test = new(wbi.test_class);
    
}( window.wbi = window.wbi || {}));
