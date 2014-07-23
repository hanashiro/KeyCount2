using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Data.Transfer.Object.Models
{
    [Table("Aluno")]
    public class DTOAluno
    {
        public int ID { get; set; }
        public bool Bloqueado { get; set; }
        public string DtLiberacao { get; set; }
        [Required(ErrorMessage = "Nome não pode ser branco.")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "Curso não pode ser branco.")]
        public string Curso { get; set; }

        public virtual IQueryable<DTOEmprestimo> Emprestimos { get; set; }
    }
}