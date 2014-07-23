var pmxApp = angular.module('pmxApp',['ngRoute','ngGrid']);

pmxApp.factory('Core', function(){
    return {
        safeApply:function(scope,fn) {
            var phase = scope.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                scope.$apply(fn);
            }
        }
    };
});
