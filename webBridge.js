"use strict";

(function( wbi ) {
    wbi.createInterface = function(objName, classDef) {  
        wbi[objName] = new classDef;
        wbi[objName]._iName = objName;
    };
    
    
    wbi.iBase = class {
        _format(format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function(match, number) { 
              return typeof args[number] != 'undefined'
                ? args[number] 
                : match
              ;
            });
        };
        
        _getPropertyStr(pObj) {return ""};
        _getMethodStr(mObj) {return ""};
        _getInterface(iObj) {return ""};
    };
    
    wbi.iPy = class extends wbi.iBase {
        
        constructor() {
            super();
            this._classTemplate = `
from cefpython3 import cefpython as cef
from webBridgeCEFPython include *

# === Class Autogenerated from webBridge Javascript Interface ===
class {0}(webBridgeCEFPython):
    # Constructor
    def __init__(self, brsr):
        _browser = brsr        
    +
    # Properties
    {1}
    
    # method
    {2}
    
    # Events
`;
    
            this._propertyTemplate = `
    @property
    def {0}(self):
        return None
    
    @{0}.setter
    def {0}(self, value):
        next
`;
            
            this._methodTemplate = `
    def {0}(self, {1}):
        next
`;
        }
        
        _getPropertyStr(pObj) {            
            return this._format(this._propertyTemplate, pObj.name);           
        }
        
        _getMethodStr(mObj) {            
            return this._format(this._methodTemplate, mObj.name, "");            
        }
        
        _getInterface(iObj) {            
            
            var self = this;
            
            // Properties
            var pStr = "";
            iObj.props.forEach(function(pObj){ pStr += self._getPropertyStr(pObj); });
            
            // Methods
            var mStr = "";
            iObj.methods.forEach(function(mObj){ mStr += self._getMethodStr(mObj); });
            
            // Class
            return this._format(this._classTemplate, iObj.interface, pStr, mStr);            
        }
    };
    
    
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
            	if(self._MethodFilter.indexOf(k) == -1) {                 
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
                    
                    var pObj = {name:"",comment:"",type:""};
                    pObj.name = propName;
                    // Checking for metadaata
                    if(this.hasOwnProperty("__" + propName)){
                        pObj.comment = this["__" + propName].comment;
                        pObj.type = this["__" + propName].type;
                    }                    
                	props.push(pObj);
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
            
            var methodNames = self._getMethodNames();
            methodNames.forEach(function(m) { 
                
                if(!m.startsWith("_")) {
                    var mObj = {name:"", comment:"", returnType:"", args:[]};
                    mObj.name = m;
                    
                    var argNames = self._getMethodParamNames(self[m]);                    
                    argNames.forEach(function(arg) {
                        var aObj = {name:"", type:""};
                        aObj.name = arg;
                        mObj.args.push(aObj);
                    });
                    
                    // Checking for metadaata
                    var meta = {};                    
                    if(methodNames.has("__" + m)){
                        meta = self["__" + m]();
                        mObj.comment = meta.comment;
                        mObj.returnType = meta.returnType;
                        
                        mObj.args.forEach(function(arg){
                            meta.args.forEach(function(marg){
                                if(arg.name == marg.name) {
                                    arg.type = marg.type;
                                }
                            });
                        });
                    }                    
                    retObj.methods.push(mObj);                        
                }
            });
            return(retObj);
        }
        
        // =================================================
        _getPythonInterface() {
            var iPy = new wbi.iPy;
            return(iPy._getInterface(this._getInterface()));
        }
    };
    
    /*
    wbi.test_class = class extends wbi.i{
    	constructor() {
      	super();
        this.__testprop = {comment: "This is a test method", type: "number"};
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
    */
    
}( window.wbi = window.wbi || {}));



/*
var pi = wbi.test._getInterface();
var pyi = wbi.test._getPythonInterface();

console.log(pyi);
*/

