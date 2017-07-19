# webBridge
A Gulp plugin to create Chromium Embedded Framework (CEF) / Python, WebView / C# and Uinty Webview / Webkit wrappers for web apps written in JavaScript.
The goal of webBridge is to allow creation of complex web based UI for Python, .Net and Unity and standalone browsers.

This is a One-to-Many interface mapping, meaning that JavaScript is the primary development language and wrappers are generated for other environments.  
As opposed to other general purpose RPCs such as grpc which give each platform an equal wieght when mapping the predefined interface.

Another destinction is webBridge is focued on bridinging the gap between web apps and an embedded browser controls.

# Usage
webBridge defines a namepsace and base class in JavaScript:
wbi = webBridge namepsace
i = webBridge base class

All webBridge interfaces are defined by creating a class inside the wbi namespace and inheriting from the i class.  A single instance of this clas should then be 
imediately create using the wbi.createInterface function.

```javascript
(function( wbi ) {

    wbi.test_class = class extends wbi.i{
    	constructor() {
      	super();      	
      }      
    }
    wbi.createInterface("test", wbi.test_class);

}( window.wbi = window.wbi || {}));
```

All Methods and properties of the new class will be exposed to the webBridge interface and wrapper code automatically generated for other platforms.

```javascript
(function( wbi ) {

    wbi.test_class = class extends wbi.i{
    	constructor() {
      	super();
        
        this.testprop = 0;
      }
      
      testFnA(argA, argB) {
      	return(argA + argB.toString());
      }
    }
    wbi.createInterface("test", wbi.test_class);

}( window.wbi = window.wbi || {}));
```

Any properties or methods starting with '_' will be treated as private and not exposed.

```javascript
(function( wbi ) {

    wbi.test_class = class extends wbi.i{
    	constructor() {
      	super();
        
        this.testprop = 0;
        this._privateProp = 0;
      }
      
      testFnA(argA, argB) {
      	return(argA + argB.toString());
      }
      
      _privateFN() {}
    }
    wbi.createInterface("test", wbi.test_class);

}( window.wbi = window.wbi || {}));
```

Any properties or methods starting with  '__' will be treated as metadata for the public equivilent with a matching name.

```javascript
(function( wbi ) {

    wbi.test_class = class extends wbi.i{
    	constructor() {
      	super();
        
        this.__testprop = {comment: "This is a test method", type: "number"};
        this.testprop = 0;
        this._privateProp = 0;
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
      	return(argA + argB.toString());
      }
      
      _privateFN() {}
    }
    wbi.createInterface("test", wbi.test_class);

}( window.wbi = window.wbi || {}));
```