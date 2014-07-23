using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Data.Transfer.Object.Models
{
   
    public class DTOResponse 
    {
        
       
        public bool Status { get; set; }
        public string Mensagem { get; set; }
        public List<object> Objeto { get; set; }

    }
}