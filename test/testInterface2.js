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

        syncTestFn(val) {
            return("ret val");
        }

        async asyncTestFn(val) {
            
        }

        eventTest() {
            this.eventTrigger({});
        }

    }
}( window.$wbi = window.$wbi || {}));