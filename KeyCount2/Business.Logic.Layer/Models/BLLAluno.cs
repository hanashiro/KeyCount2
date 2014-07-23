using Data.Access.Layer.Models;
using Data.Transfer.Object.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Business.Logic.Layer.Models
{
    public class BLLAluno
    {
        DALAluno DALAlu = new DALAluno();

        public DTOResponse SelecionarAlunos()
        {
            var alunos = DALAlu.SelectAll();
            DTOResponse resposta = new DTOResponse();
            resposta.Status = true;
            resposta.Objeto = alunos.ToList<object>();
            return resposta;
        }

        public DTOResponse SelecionarAluno(int id)
        {
            DTOAluno aluno = DALAlu.Select(id);
            DTOResponse resposta = new DTOResponse();
            if (aluno != null)
            {
                if(aluno.Bloqueado){
                    resposta.Status = false;
                    resposta.Mensagem = "Aluno Bloqueado!";
                    if(aluno.DtLiberacao!=""){
                        resposta.Mensagem += "<br>Data de Liberação: "+aluno.DtLiberacao;
                    }
                }
                else
                {
                    List<object> lista = new List<object>();
                    lista.Add(aluno);
                    resposta.Status = true;
                    resposta.Objeto = lista;
                }
                
            }
            else
            {
                resposta.Status = false;
                resposta.Mensagem = "R.A. Inválido ou aluno não cadastrado";
            }

            return resposta;
        }

        public DTOAluno InserirAluno(DTOAluno aluno)
        {
            return DALAlu.Insert(aluno);
        }

        public bool AlterarAluno(DTOAluno aluno)
        {
            return DALAlu.Update(aluno);
        }

        public bool DeletarAluno(int id)
        {
            return DALAlu.Delete(id);
        }

    }
}