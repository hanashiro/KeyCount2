pmxApp.factory('ApiFct', function($http){
    var url = "http://localhost:55357/api/";
    var api = (function(){
        return{
            get : function(endp,sucesso,erro){
                $http({
                    method: 'GET', 
                    url: url+endp,
                    responseType : 'json'
                })
                .success(sucesso)
                .error(erro);
            },
            post : function(endp,obj,sucesso,erro){
                $http({
                    method: 'POST', 
                    url: url+endp,
                    data: JSON.stringify(obj),
                    responseType : 'json',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .success(sucesso)
                .error(erro);
            },
            put : function(endp, obj, sucesso, erro){
                $http({
                    method: 'PUT', 
                    url: url+endp,
                    data: JSON.stringify(obj),
                    responseType : 'json',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .success(sucesso)
                .error(erro);
            },
            del : function(endp, id, sucesso, erro){
                $http({
                    method: 'DELETE', 
                    url: url+endp,
                    responseType : 'json'
                })
                .success(sucesso)
                .error(erro);
            }
        }
    })();
    var app = {
        Aluno : (function(){
            return{
                alterar: function(obj, sucesso, erro){
                    api.put('Aluno', obj, sucesso, erro);
                },
                inserir: function (obj, sucesso, erro) {
                    api.post('Aluno', obj, sucesso, erro);
                },
                deletar: function (id, sucesso, erro) {
                    api.del('Aluno', id, sucesso, erro);
                },
                buscar: function (id, sucesso, erro) {
                    api.get("Aluno/" + id, sucesso, erro);
                },
                buscarTodos: function (sucesso, erro) {
                    api.get("Aluno", sucesso, erro);
                }
            }
        })(),
        Emprestimo : (function(){
            return{
                alterar: function(obj, sucesso, erro){
                    api.put('Emprestimo',obj, sucesso,erro);
                },
                inserir: function (obj, sucesso, erro) {
                    api.post('Emprestimo', obj, sucesso, erro);
                },
                deletar: function (id, sucesso, erro) {
                    api.del('Emprestimo/'+id, sucesso, erro);
                },
                buscar: function (id, sucesso, erro) {
                    api.get('Emprestimo/'+id,sucesso, erro);
                },
                buscarTodos: function (sucesso, erro) {
                    api.get('Emprestimo', sucesso, erro);
                }
            }
        })()
    };Teste =  app;
    return app;
});

