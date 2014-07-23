using Data.Transfer.Object.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Data.Access.Layer.Models
{
    public class DALAluno
    {
        Contexto db = new Contexto();

        public List<DTOAluno> SelectAll()
        {
            var alunos = from a in db.Aluno select a;
            return alunos.ToList<DTOAluno>();
        }

        public DTOAluno Select(int id)
        {
            var aluno = db.Aluno.Find(id);
            return aluno;
        }

        public DTOAluno Insert(DTOAluno aluno)
        {
            db.Aluno.Add(aluno);
            db.SaveChanges();

            return aluno;
        }

        public bool Update(DTOAluno aluno)
        {
            bool resultado = false;
            try
            {
                var alu = db.Aluno.Find(aluno.ID);
                if(alu != null){
                    db.Entry(alu).CurrentValues.SetValues(aluno);
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
            var aluno = db.Aluno.First(i => i.ID == id);
            db.Aluno.Remove(aluno);
            db.SaveChanges();
            return true;
        }

    }
}