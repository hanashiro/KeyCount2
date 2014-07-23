using Data.Transfer.Object.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Data.Access.Layer.Models
{
    public class DALEmprestimo
    {
        Contexto db = new Contexto();

        public List<DTOEmprestimo> SelectAll()
        {
            var emprestimos = from e in db.Emprestimo orderby e.DtRetirada select e;
            
            return emprestimos.ToList<DTOEmprestimo>();
        }

        public DTOEmprestimo Select(int id)
        {
            var emprestimo = db.Emprestimo.Find(id);
            return emprestimo;
        }

        public List<DTOEmprestimo> SelectByStudent(int id)
        {
            var emprestimos = from e in db.Emprestimo where e.AlunoID.Equals(id) orderby e.DtRetirada select e;
            return emprestimos.ToList<DTOEmprestimo>();
        }

        public List<DTOEmprestimo> SelectOpens()
        {
            var emprestimos = from e in db.Emprestimo where e.DtDevolucao.Equals("") || e.Liberado.Equals(false) orderby e.DtRetirada select e;
            return emprestimos.ToList<DTOEmprestimo>();
        }


        public DTOEmprestimo Insert(DTOEmprestimo emprestimo)
        {
            var aluno = db.Aluno.Find(emprestimo.Aluno.ID);
            emprestimo.Aluno = aluno;

            db.Emprestimo.Add(emprestimo);
            db.SaveChanges();

            return emprestimo;
        }

        public bool Update(DTOEmprestimo emprestimo)
        {
            bool resultado = false;
            try
            {
                var emp = db.Emprestimo.Find(emprestimo.ID);
                if(emp != null){
                    db.Entry(emp).CurrentValues.SetValues(emprestimo);
                    db.SaveChanges();
                    resultado = true;
                }
            }
            catch (Exception e)
            {

            }

            return resultado;
        }

        public bool Delete(int id)
        {
            var emprestimo = db.Emprestimo.First(i => i.ID == id);
            db.Emprestimo.Remove(emprestimo);
            db.SaveChanges();
            return true;
        }

        

    }
}