using Data.Access.Layer.Models;
using Data.Transfer.Object.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Business.Logic.Layer.Models
{
    public class BLLEmprestimo
    {
        DALEmprestimo DALEmp = new DALEmprestimo();

        public DTOResponse SelecionarEmprestimos()
        {
            var emprestimos = DALEmp.SelectAll();
            DTOResponse resposta = new DTOResponse();
            resposta.Status = true;
            resposta.Objeto = emprestimos.ToList<object>();
            return resposta;
        }

        public DTOResponse SelecionarEmprestimo(int id)
        {
            var emprestimo = DALEmp.Select(id);
            DTOResponse resposta = new DTOResponse();
            if (emprestimo != null)
            {
                List<object> lista = new List<object>();
                lista.Add(emprestimo);
                resposta.Status = true;
                resposta.Objeto = lista;
            }
            else
            {
                resposta.Status = false;
                resposta.Mensagem = "Empréstimo não encontrado!";
            }
            return resposta;
        }

        public DTOResponse SelecionarEmprestimosAluno(int id)
        {
            var emprestimos = DALEmp.SelectByStudent(id);
            DTOResponse resposta = new DTOResponse();
            resposta.Status = true;
            resposta.Objeto = emprestimos.ToList<object>();
            return resposta; 
        }

        public DTOResponse SelecionarEmprestimosAbertos()
        {
            var emprestimos = DALEmp.SelectOpens();
            DTOResponse resposta = new DTOResponse();
            resposta.Status = true;
            resposta.Objeto = emprestimos.ToList<object>();
            return resposta;
        }

        public DTOEmprestimo InserirEmprestimo(DTOEmprestimo emprestimo)
        {
            return DALEmp.Insert(emprestimo);
        }

        public bool AlterarEmprestimo(DTOEmprestimo emprestimo)
        {
            return DALEmp.Update(emprestimo);
        }

        public bool DeletarEmprestimo(int id)
        {
            return DALEmp.Delete(id);
        }

    }
}