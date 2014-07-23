using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Data.Transfer.Object.Models
{
    [Table("Emprestimo")]
    public class DTOEmprestimo
    {
        public int ID { get; set; }
        public bool Liberado { get; set; }
        [Required(ErrorMessage = "Chave não pode ser branco.")]
        public string Chave { get; set; }
        [Required(ErrorMessage = "DtRetirada não pode ser branco.")]
        public string DtRetirada { get; set; }
        public string DtDevolucao { get; set; }
        public string DtLiberacao { get; set; }
        public decimal  Multa { get; set; }


        public int AlunoID { get; set; }

        [ForeignKey("AlunoID")]
        public virtual DTOAluno Aluno { get; set; }
    }
}