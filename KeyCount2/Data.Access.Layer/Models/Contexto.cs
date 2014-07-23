using Data.Transfer.Object.Models;
using MySql.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Data.Access.Layer.Models
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class Contexto : DbContext
    {
        public DbSet<DTOAluno> Aluno { get; set; }
        public DbSet<DTOEmprestimo> Emprestimo { get; set; }

        public Contexto()
        {
            Database.SetInitializer<Contexto>(null);
            this.Database.CreateIfNotExists();
        }
    }
}