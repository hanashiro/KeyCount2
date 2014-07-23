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
    public class AlunoController : ApiController
    {
        // GET api/aluno
        public DTOResponse Get()
        {
            BLLAluno BLLobjeto = new BLLAluno();
            return BLLobjeto.SelecionarAlunos();
        }

        // GET api/aluno/5
        public DTOResponse Get(int id)
        {
            BLLAluno BLLobjeto = new BLLAluno();
            return BLLobjeto.SelecionarAluno(id);
        }

        // POST api/aluno
        public DTOAluno Post(DTOAluno produto)
        {
            BLLAluno BLLobjeto = new BLLAluno();
            return BLLobjeto.InserirAluno(produto);
        }

        // PUT api/aluno/5
        public bool Put(DTOAluno aluno)
        {
            BLLAluno BLLobjeto = new BLLAluno();
            return BLLobjeto.AlterarAluno(aluno);
        }

        // DELETE api/aluno/5
        public bool Delete(int id)
        {
            BLLAluno BLLobjeto = new BLLAluno();
            return BLLobjeto.DeletarAluno(id);
        }

    }
}
