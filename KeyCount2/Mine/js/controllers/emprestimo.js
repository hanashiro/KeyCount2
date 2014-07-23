pmxApp.controller('EmprestimoCtrl', 
['$scope','$rootScope','Core','$routeParams','ApiFct',function($scope,$rootScope,main,$routeParams,ApiFct) {
        
    $scope.emprestimos = [];
    
    $scope.buscarEmprestimos = function(){
        ApiFct.Emprestimo.buscarTodos(
            function(resultado){
                $scope.emprestimos = resultado.Objeto;
                $scope.verificarSituacaoAluno($scope.emprestimos)
                $('#loadingDiv').fadeOut(300);
            },
            function(a){
                Plugins.Mensagem.erro('Erro ao carregar lista de empréstimos. Contate o administrador!');
            }
        );
    }
    
    
    $scope.novoEmprestimo = {ra:"",chave:""};
    
    $scope.aluno = Objetos.Aluno();
    
    $scope.nomeCurso = function(curso){
        return Controle.Emprestimo.nomeCurso(curso);
    }
    
    
    $scope.setRa = function(e){
        if(e.keyCode==13){
            if($scope.novoEmprestimo.ra.length<7){
                Plugins.Mensagem.erro('R.A. Inválido!');
                return false;
            }
            emprestimo = Controle.Emprestimo.disponibilidadeAluno($scope.novoEmprestimo.ra,$scope.emprestimos)
            if(emprestimo===true){
                ApiFct.Aluno.buscar($scope.novoEmprestimo.ra,
                    function(resposta){
                        if(resposta.Status){
                            $scope.aluno = resposta.Objeto[0];
                            document.getElementById('chave').focus();
                        }else{
                            Plugins.Mensagem.erro(resposta.Mensagem);
                        }
                    },
                    function(erro){
                        Plugins.Mensagem.erro('Erro. Contate o administrador!');
                    }
                );
            }else{
                $scope.exibirDadosEmprestimo(emprestimo,function(){
                    if(!emprestimo.Liberado){
                        Plugins.Mensagem.erro("Aluno Bloqueado!");
                    }else{
                        alert('Aluno já está com chave!');
                        $scope.realizarDevolucao(emprestimo);
                    }
                    
                });
            }
        }
    }
    
    $scope.setChave = function(e){
        if(e.keyCode==13){
            if($scope.novoEmprestimo.chave>0 && $scope.novoEmprestimo.chave<=158){
                var emprestimo = Controle.Emprestimo.disponibilidadeChave($scope.novoEmprestimo.chave,$scope.emprestimos);
                if(emprestimo===true){
                    if($scope.aluno.Nome!=""){
                        document.getElementById('fotoAluno').focus();
                    }else{
                        document.getElementById('ra').focus();
                    }
                }else{
                    $scope.exibirDadosEmprestimo(emprestimo,function(){
                        alert('Chave já emprestada!');
                        $scope.realizarDevolucao(emprestimo);
                    });
                }
            }else{
                $scope.novoEmprestimo.chave = "";
                Plugins.Mensagem.erro('Número de chave inválido!');
            }
        }
    }
    
    $scope.verificarRaChave = function(){
        if($scope.aluno.ID==null || $scope.aluno.ID==""){
            document.getElementById('ra').focus();
        }else if($scope.novoEmprestimo.chave<0 || $scope.novoEmprestimo.chave>158 || $scope.novoEmprestimo.chave==""){
            document.getElementById('chave').focus();
        }
    }
    
    $scope.realizarEmprestimo = function(){
        var emprestimo = Objetos.Emprestimos();
        emprestimo.Aluno = $scope.aluno;
        emprestimo.Chave = $scope.novoEmprestimo.chave;
        emprestimo.DtRetirada = Controle.Calendario.novaData();
        $scope.reiniciar('reiniciar');
        ApiFct.Emprestimo.inserir(emprestimo,
            function(resposta){
                console.log(resposta);
                $scope.buscarEmprestimos();
            },
            function(erro){
                console.log(erro);
            }
        );
    }
    
    $scope.realizarDevolucao = function(emprestimo){   
        
        if(confirm('Deseja devolver?')){
            while(emprestimo.multado){
                var aceitar = prompt('ALUNO COM MULTA!\nDigite o RA para desbloquear.\nDigite 123 para cancelar','');	
                if(aceitar==emprestimo.Aluno.ID){/* se aceitar saira do looping *//*Digite "123" para cancelar.*/
                        emprestimo.multado = false;
                        emprestimo.DtDevolucao = Controle.Calendario.novaData();
                        emprestimo = $scope.calcularDataLiberacao(emprestimo);
                        emprestimo.Liberado = false;
                }else if(aceitar=='123'){/* se recusar nao sera dado baixa */
                        alert('DEVOLUÇÃO NÃO EFETUADA!');
                        break;
                }
            }
            if(!emprestimo.multado){
                emprestimo.DtDevolucao = Controle.Calendario.novaData();
                $scope.reiniciar('reiniciar');
                ApiFct.Emprestimo.alterar(emprestimo,
                    function(resposta){
                        console.log(resposta);
                        $scope.buscarEmprestimos();
                    },
                    function(erro){
                        console.log(erro);
                    }
                );
            }
        }
    }
    
    $scope.exibirDadosEmprestimo = function(emprestimo,callback){
        $scope.novoEmprestimo.ra = emprestimo.AlunoID;
        $scope.novoEmprestimo.chave = emprestimo.Chave;
        $scope.aluno.Nome = emprestimo.Aluno.Nome;
        $scope.aluno.Curso = emprestimo.Aluno.Curso;
        if(callback){
            setTimeout(function(){
                callback();
            },100);
        }
    }
    
    $scope.chaveLiberada = function(chave){
        if(chave){
            return chave.indexOf("L") != -1;
        }return false;
    }
    
    $scope.liberarChave = function(){
        if($scope.mySelections.length>0){
            var emprestimo = $scope.mySelections[0];
            var resp = ""
            while(resp!="1" && resp!="2"){
                resp = prompt("Deseja liberar a chave "+emprestimo.Chave+"?\n1 - Sim\n2 - Não");
            }
            if(resp=="1"){
                emprestimo.Chave = emprestimo.Chave+"(L)";
                ApiFct.Emprestimo.alterar(emprestimo,
                    function(resposta){
                        console.log(resposta);
                        $scope.buscarEmprestimos();
                    },
                    function(erro){
                        console.log(erro);
                    }
                );
            }
        }
    }
    
    $scope.liberarAluno = function(){
        if($scope.mySelections.length>0){
            var emprestimo = $scope.mySelections[0];
            if(emprestimo.DtDevolucao){
                var resp = ""
                while(resp!=emprestimo.Aluno.ID && resp!="123"){
                    resp = prompt("Deseja liberar o aluno "+emprestimo.Aluno.Nome+"?\nRA do Aluno - Sim\n123 - Não");
                }
                if(resp==emprestimo.Aluno.ID){
                    emprestimo.Liberado = true;
                    ApiFct.Emprestimo.alterar(emprestimo,
                        function(resposta){
                            console.log(resposta);
                            $scope.buscarEmprestimos();
                        },
                        function(erro){
                            console.log(erro);
                        }
                    );
                }
            }else{
                Plugins.Mensagem.erro("Efetue a devolução antes de desbloquear o aluno!")
            }
        }
    }
    
    $scope.verificarSituacaoAluno = function(emprestimos){
        var i = emprestimos.length;
        while(i--){
            emprestimos[i].multado = Controle.Calendario.multado(emprestimos[i].DtRetirada);
            if(emprestimos[i].multado){
                if(emprestimos[i].DtDevolucao!="" || emprestimos[i].DtLiberacao!=""){
                    emprestimos[i] = $scope.calcularDataLiberacao(emprestimos[i]);
                    if($scope.podeLiberarAluno(emprestimos[i].DtLiberacao)){
                        Plugins.Mensagem.aviso("Liberar aluno "+emprestimos[i].AlunoID);
                        console.info("Liberar aluno "+emprestimos[i].AlunoID);
                    }
                }
            }
            
        }
    }
    
    $scope.podeLiberarAluno = function(dtLiberacao){
        var hoje = Controle.Calendario.novaData();
        var dtMenor = Controle.Calendario.Dia.verificarMenor(dtLiberacao,hoje);
        if(Controle.Calendario.compararDatas(dtLiberacao,dtMenor)){
            return true;
        }return false;
    }
    
    $scope.calcularDataLiberacao = function(emprestimo){
        var hoje = Controle.Calendario.novaData();
        var dtEmprestimo = emprestimo.DtRetirada;
        var dtDevolucao = emprestimo.DtDevolucao;
        var dtLiberacao = emprestimo.DtLiberacao;
        
        var dias = Controle.Calendario.Dia.diferencaDatas(dtEmprestimo,dtDevolucao);
        if(dias==1){
            emprestimo.DtLiberacao = Controle.Calendario.Dia.somarDias(dtDevolucao,7);
        }else if(dias<=5){
            emprestimo.DtLiberacao = Controle.Calendario.Dia.somarDias(dtDevolucao,15);
        }else{
            emprestimo.Liberado = false;
            emprestimo.DtLiberacao = "Próximo Semestre";
            if(dias > 15){
                if(!$scope.chaveLiberada(emprestimo.Chave)){
                    console.warn("Inutilizar chave "+emprestimo.Chave);
                    Plugins.Mensagem.alerta("Inutilizar chave "+emprestimo.Chave);
                }
            }
        }
        
        return emprestimo;
    }
    
    
    $scope.reiniciar = function(e){
        if(e.keyCode==27 || e == 'reiniciar'){
            $scope.novoEmprestimo = {ra:"",chave:""};
            $scope.aluno = {ID:'',Nome:'',Curso:''};
            document.getElementById('ra').focus();
        }
    }
    
    
    
    $scope.mySelections = [{'codigo':'-1','nome':''}];
	
    /* controle da grid de emprestimos */
    $scope.gridOptions = { data: 'emprestimos',
            columnDefs: [{field:'codigo', displayName:"•",width:'2%'},
                                         {field:'Aluno.ID', displayName:'RA',width:'8%'},
                                         {field:'Aluno.Nome', displayName:'Nome',width:'32%'},
                                         {field:'Aluno.Curso', displayName:'Curso',width:'34%'},
                                         {field:'Chave', displayName:'Chave',width:'7%'},
                                         {field:'DtRetirada', displayName:'Data de Retirada',width:'15%'}
                 ],
                 sortInfo: { fields: ['codigo'], directions: ['desc']},
                 enableColumnResize:true,
                 rowTemplate:'<div style="height: 100%" ng-class="{multa: row.getProperty(\'multado\')}"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
'<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
'<div ng-cell></div>' +
'</div></div>',
                 selectedItems: $scope.mySelections,
                 multiSelect: false,
                 enableColumnReordering:true,
                 showFooter:true,
                 afterSelectionChange:function(item,event){
                     var multa = item.entity.multa;
                         multa = parseInt(multa,10);
                         $('#txttravarmulta').val(multa);
                 }
	};
        
        
    
   $scope.buscarEmprestimos();
   
}]);

