using Business.Logic.Layer.Models;
using Data.Transfer.Object.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmprestimoController : ApiController
    {
        // GET api/emprestimo
        public DTOResponse Get()
        {
            BLLEmprestimo BLLobjeto = new BLLEmprestimo();
            return BLLobjeto.SelecionarEmprestimosAbertos();
        }

        // GET api/emprestimo/5
        public DTOResponse Get(int id)
        {
            BLLEmprestimo BLLobjeto = new BLLEmprestimo();
            return BLLobjeto.SelecionarEmprestimo(id);
        }

        // GET api/emprestimo/Teste/5
        /*[Route("api/emprestimo/teste/{id}")]
        public string GetTeste(int id)
        {
            return "Teste sucesso";
        }*/


        // POST api/emprestimo
        public DTOEmprestimo Post(DTOEmprestimo produto)
        {
            BLLEmprestimo BLLobjeto = new BLLEmprestimo();
            return BLLobjeto.InserirEmprestimo(produto);
        }

        // PUT api/emprestimo/5
        public bool Put(DTOEmprestimo produto)
        {
            BLLEmprestimo BLLobjeto = new BLLEmprestimo();
            return BLLobjeto.AlterarEmprestimo(produto);
        }

        // DELETE api/emprestimo/5
        public bool Delete(int id)
        {
            BLLEmprestimo BLLobjeto = new BLLEmprestimo();
            return BLLobjeto.DeletarEmprestimo(id);
        }

    }
}
