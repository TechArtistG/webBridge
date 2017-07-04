(function( $wbi ) {
    // ========= Meta ======== 
    $wbi.m.name = "testInterface";
    
    // ========= Properties ========    
    $wbi.p.js_propNum = 1;
    $wbi.p.js_propStr = "hellow world!";
    
    // ========= Functions =========   
    $wbi.f.js_call_async = function(fromExt) {
        // Does not return anything...yet
    }
    
    $wbi.fs.js_call_sync = function(fromExt) {
        return(fromExt);
    }

    // ========= Events =========    
    $wbi.e.ext_event = function(event) {
        
    }    
}( window.$wbi = window.$wbi || {}));






