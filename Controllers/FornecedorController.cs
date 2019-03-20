using Base.Models.DAO;
using Base.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Base.Controllers
{
    //TODO CONTROLADOR PASSARÁ A HERDAR DO CONTROLLER BASECONTROLLER
    //DESSA FORMA TEMOS A CERTEZA QUE SÓ USUARIOS LOGADOS ENTRÃO NOS MÉTODOS
    public class FornecedorController : BaseController
    {
        // GET: Fornecedor
        FornecedorDAO DAO = new FornecedorDAO();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Listar(string nome, string cnpj, string data)
        {
            //Id zero para que liste todos os registros
            var lista = DAO.Listar(0, nome, cnpj, data).ToList();
            return Json(new { rows = lista }, JsonRequestBehavior.AllowGet);
        }
      
        public ActionResult Cadastro(int id)
        {
            ViewBag.Id = id;
            return View();
        }
        public JsonResult CarregaDados(int id)
        {
            var lista = DAO.Listar(id,"","","").ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        // POST: UsuarioExterno/ Criar
        [HttpPost]
        public JsonResult Salvar(Fornecedores f)
        {
            DAO.Salvar(f);
            return Json("Dados salvo com sucesso!!");
        }

        // PUT: UsuarioExterno/ Criar
        [HttpPut]
        public JsonResult Editar(Fornecedores f)
        {
            DAO.Editar(f);
            return Json("Dados alterado com sucesso!!");
        }

        //Exclusão lógica
        [HttpDelete]
        public JsonResult Exclusao(int id)
        {
            DAO.Exclusao(id);
            return Json("Excluido com sucesso");
        }

        //Listar empresas 
        public ActionResult ListaEmpresa()
        {
            EmpresaDAO DAO = new EmpresaDAO();
            var listaSetor = DAO.Listar(0).ToList();
            return Json(listaSetor, JsonRequestBehavior.AllowGet);
        }
    }
}