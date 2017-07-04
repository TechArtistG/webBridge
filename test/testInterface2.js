"use strict";

(function( $wbi ) {
    class WBTestInterface extends i{
        /* <META 
            name='WBTestInterface' 
            description='A test webBridge Interface'
        >    
        */
        constructor() {
            super();
            
            /*<PUB>*/
            this.testPropNum = 0;
            this.testPropText = "Some Text";
            /*</PUB>*/
        }    

        testFn(val) {
            return("ret val");
        }
        

        eventTest() {
            this.eventTrigger({});
        }
    }
    $wbi.WBTestInterface = new(WBTestInterface);
    
}( window.$wbi = window.$wbi || {}));