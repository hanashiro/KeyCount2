var API = (function(ajax){
    return{
        Aluno : (function(){
            return{
                alterar: function(obj, sucesso, erro){
                    ajax.alterar('Aluno', obj, sucesso, erro);
                },
                inserir: function (obj, sucesso, erro) {
                    ajax.criar('Aluno', obj, sucesso, erro);
                },
                deletar: function (id, sucesso, erro) {
                    ajax.deletar('Aluno', id, sucesso, erro);
                },
                buscar: function (id, sucesso, erro) {
                    ajax.buscar("Aluno/" + id, sucesso, erro);
                },
                buscarTodos: function (sucesso, erro) {
                    ajax.buscar("Aluno", sucesso, erro);
                }
            }
        })(),
        Emprestimo: (function () {
            return{
                alterar: function(obj, sucesso, erro){
                    ajax.alterar('Emprestimo', obj, sucesso, erro);
                },
                inserir: function (obj, sucesso, erro) {
                    ajax.criar('Emprestimo', obj, sucesso, erro);
                },
                deletar: function (id, sucesso, erro) {
                    ajax.deletar('Emprestimo', id, sucesso, erro);
                },
                buscar: function (id, sucesso, erro) {
                    ajax.buscar("Emprestimo/" + id, sucesso, erro);
                },
                buscarTodos: function (sucesso, erro) {
                    ajax.buscar("Emprestimo", sucesso, erro);
                }
            }
        })()
    }
})(Utils.Ajax);


