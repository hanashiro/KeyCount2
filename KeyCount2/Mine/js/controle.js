var Controle = (function(){
    return{
        Calendario : (function(){
            return{
                compararDatas : function(dt1,dt2){
                    if(typeof(dt1)=='string'){
                        dt1 = dt1.substring(0,10);
                        dt2 = dt2.substring(0,10);
                        return dt1==dt2;
                    }else{
                        if(dt1[0]==dt2[0] && dt1[1]==dt2[1] && dt1[2]==dt2[2]){
                            return true;
                        }return false;
                    }
                },
                multado : function(dtEmprestimo){
                    var hoje = Controle.Calendario.novaData();
                    if(!Controle.Calendario.compararDatas(hoje,dtEmprestimo)){
                        return true;
                    }else{
                        return false;
                    }
                },
                novaData : function(){
                    var data = (new Date());
                    var dia = data.getDate(),
                    mes = data.getMonth()+1,
                    ano = data.getFullYear();
                    dia = dia < 10 ? '0'+dia : dia;
                    mes = mes < 10 ? '0'+mes : mes;
                    return ano+'-'+mes+'-'+dia;
                },
                Dia : {
                    diaSemana : function(dia,mes,ano){
                        var data = ano+'-'+mes+'-'+dia,
                        diaSemana = (new Date(data)).getDay();
                        return diaSemana;
                    },
                    somarDias : function(data,dias){
                        var tipoData = typeof(data)=='string';
                        if(tipoData){
                            data = this.arrumarData(data);
                        }
                        while(dias--){
                            data = this.aumentarDia(data);
                        }
                        if(tipoData){
                            data = this.arrumarData(data);
                        }
                        return data;
                    },
                    aumentarDia : function(data){
                        var tipoData = typeof(data)=='string';
                        if(tipoData){
                            data = this.arrumarData(data);
                        }
                        var tamanhoMes = Controle.Calendario.Mes.tamanhoMes(data[1],data[0]);
                        if(data[2]==tamanhoMes){
                            data[2] = 0;
                            if(data[1]!=12){
                                data[1]++;
                            }else{
                                data[1]=1;
                                data[0]++;
                            }
                        }
                        data[2]++;
                        if(tipoData){
                            data = this.arrumarData(data);
                        }
                        return data;
                    },
                    diferencaDatas : function(dt1,dt2,ignorarDias){
                        var data1 = this.verificarMenor(dt1,dt2);
                        var data2 = this.verificarMaior(dt1,dt2);
                        var Calendario = Controle.Calendario,
                        dias = 0;
                        while(!Calendario.compararDatas(data1,data2)){
                            var diaSemana = this.diaSemana(data1[2],data1[1],data1[0]);
                            data1 = this.aumentarDia(data1);
                            if((ignorarDias) && ignorarDias.indexOf(diaSemana)!=-1){
                                continue;
                            }
                            dias++;
                            if(dias>1000){
                                return dias;
                                throw "Erro ao calcular dias!";
                            }
                        }
                        return dias;
                    },
                    arrumarData : function(data){
                        if(typeof(data)=='string'){
                            data = data.split('-');
                            data[2] = data[2].split(' ')[0];
                            data[0] = parseInt(data[0],10);
                            data[1] = parseInt(data[1],10);
                            data[2] = parseInt(data[2],10);
                        }else{
                            data[2] = data[2] < 10 ? '0'+data[2] : data[2];
                            data[1] = data[1] < 10 ? '0'+data[1] : data[1];
                            data = data[0]+'-'+data[1]+'-'+data[2];
                        }
                        return data;
                    },
                    verificarMaior: function(dt1,dt2){
                        var tipoData = typeof(dt1)!='string';
                        if(tipoData){
                            dt1 = this.arrumarData(dt1);
                            dt2 = this.arrumarData(dt2);
                        }
                        if(dt1>dt2){
                            return tipoData ? this.arrumarData(dt1) : dt1;
                        }else{
                            return tipoData ? this.arrumarData(dt2) : dt2;                            
                        }
                    },
                    verificarMenor: function(dt1,dt2){
                        var tipoData = typeof(dt1)!='string';
                        if(tipoData){
                            dt1 = this.arrumarData(dt1);
                            dt2 = this.arrumarData(dt2);
                        }
                        if(dt1<dt2){
                            return tipoData ? this.arrumarData(dt1) : dt1;
                        }else{
                            return tipoData ? this.arrumarData(dt2) : dt2;                            
                        }
                    },
                },
                Mes : {
                    tamanhoMes : function(mes,ano){
                        var dias = 0;
                        ano = ano ? ano : (new Date()).getFullYear();
                        if(mes==2){
                            return Controle.Calendario.Ano.anoBissexto(ano) ? 29 : 28;
                        }else if(mes==1 || mes==3 || mes==5 || mes==7 || mes==8 || mes==10 || mes==12){
                            return 31;
                        }return 30;
                    },
                },
                Ano : {
                    anoBissexto : function(ano){
                        ano = ano ? ano : (new Date()).getFullYear();
                        if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0))){
                            return true;
                        }return false;
                    }
                } 
            }
        })(),
        Emprestimo : (function(){
            return{
                disponibilidadeAluno : function(ra,emprestimos){
                    var i = emprestimos.length;
                    while(i--){
                        if(emprestimos[i].AlunoID==ra){
                            return emprestimos[i];
                        }
                    }
                    return true;
                },
                disponibilidadeChave : function(chave,emprestimos){
                    var i = emprestimos.length;
                    while(i--){
                        if(emprestimos[i].Chave==chave){
                            return emprestimos[i];
                        }
                    }
                    return true;
                },
                nomeCurso : function(curso){
                    return curso.replace(/tecnologia em/gi,'');
                }
            }
        })(),
        Teclado : (function(){
            return{
                tab : function(id){
                    /* Funcao que simula a tecla Tab atraves da tecla Enter*/
                    if(event.keyCode == 13){
                            document.getElementById(id).focus();     
                            return false;           
                    }
                },
                apenasNumeros : function(evt){
                    var theEvent = evt || window.event;
                    var key = theEvent.keyCode || theEvent.which;
                    key = String.fromCharCode( key );
                    var regex = /[0-9]/;
                    if( !regex.test(key) ) {
                      theEvent.returnValue = false;
                      if(theEvent.preventDefault) theEvent.preventDefault();
                    }
                }
            }
        })()
    }
})();