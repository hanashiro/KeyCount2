var Objetos = (function () {
    var Aluno = function () {
        this.ID = null;
        this.Nome = "";
        this.Curso = "";
        this.Emprestimos = null;
        this.Bloqueado = false;
        this.DtLiberacao = "";
    }

    var Emprestimo = function () {
        this.Aluno = new Aluno();
        this.ID = null;
        this.Chave = 0;
        this.AlunoID = null;
        this.DtRetirada = "";
        this.DtDevolucao = "";
        this.DtLiberacao = "";
        this.Liberado = true;
        this.Multa = 0;
    }

    return {
        Aluno: function () { return new Aluno();},
        Emprestimos: function () { return new Emprestimo();}
    }

})();