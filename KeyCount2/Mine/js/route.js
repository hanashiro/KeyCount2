/* configura os templates de acordo com o menu */
pmxApp.config(['$routeProvider',function ($routeProvider){
	/* diminui o trabalho de chamar o objeto toda hora */
	var pagina = function(url,template,controle){
		/* como realmente se chama os templates */
		$routeProvider.when('/'+url,{templateUrl:'template/'+template,controller:controle})
                
	}
	$routeProvider.otherwise({
            redirectTo: '/emprestimo'
        });
	
        
	pagina('emprestimo','emprestimo.html','EmprestimoCtrl');
	

}])


pmxApp.run(['$rootScope', function($root) {
    /*$root.$on('$routeChangeStart', function(e, curr, prev) {
        console.log('route start')
    });*/
    /*$root.$on('$routeChangeSuccess', function(e, curr, prev) {
        switch(curr.loadedTemplateUrl){
            case "template/home.html" :
                
            break;
        }
    });*/
}]);