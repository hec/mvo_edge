// ==========================================================================
// Project:   MvoEdge
// Copyright: (c) 2009 RERO
// ==========================================================================
/*globals MvoEdge */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//

MvoEdge.main = function main() {

  //rewrite gotoRoute method
  SC.routes.gotoRoute = function(route) {
    var params = {},
        parts, routeHandler, target, method ;
    
    // save this route for window location sensing
    this._lastRoute = route ;
    
    // step 1: split out parameters
    parts = route.split('&') ;
    if (parts && parts.length > 0) {
      route = parts.shift() ;
      parts.forEach(function(part) {
        var param = part.split('=') ;
        //if (param && param.length > 1) params[param[0]] = decodeURIComponent(param[1]) ;
        if (param && param.length > 1) {
            var temp = "";
            for ( var i = 1; i <param.length; i++){
              if ( i > 1){
                temp += '=';
              }
              temp += decodeURIComponent(param[i]);  
            }
            params[param[0]] = temp;
          }
      }) ;
    } else route = '' ;
    
    // step 2: split our route parts
    parts = route.split('/') ;
    
    // step 3: evaluate route.
    if (!this._routes) this._routes = SC.routes._Route.create() ;
    
    routeHandler = this._routes.functionForRoute(parts,params) ;
    
    if (routeHandler) {
      target = routeHandler._target;
      method = routeHandler._method;
      if (method) method.call(target, params);
    }
  };
  // MvoEdge.configurator#readInputParameters() is declared as the callback
  // function that parses the parameters given in the applications's URL; this
  // is done using the SC.routes mechanism.
  SC.routes.add(':', MvoEdge.configurator, 'readInputParameters');
  
  // Launch the initalization process using MvoEdge.initializer
  MvoEdge.initializer.initialize();
};

function main() {
  MvoEdge.main();
}
