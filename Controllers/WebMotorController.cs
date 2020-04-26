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
    public class WebMotorController : BaseController
    {
        WebMotorDAO DAO = new WebMotorDAO();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Listar()
        {
            //Id zero para que liste todos os registros
            var lista = DAO.Listar(0).ToList();
            return Json(new { rows = lista }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Cadastro(int id)
        {
            ViewBag.Id = id;
            return View();
        }

        public JsonResult CarregaDados(int id)
        {
            var lista = DAO.Listar(id).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Salvar(string marca, string modelo, string versao, int ano, string km, string obs)
        {
            DAO.Salvar( marca,  modelo,  versao,  ano,  km,  obs);
            return Json("Dados salvo com sucesso!!");
        }

        [HttpPut]
        public JsonResult Editar(int Id, string marca, string modelo, string versao, int ano, string km, string obs)
        {
            DAO.Editar(Id, marca, modelo,versao, ano, km, obs);
            return Json("Dados alterado com sucesso!!");
        }

        [HttpDelete]
        public JsonResult Exclusao(int Id)
        {
            DAO.Exclusao(Id);
            return Json("Excluido com sucesso");
        }
    }
}