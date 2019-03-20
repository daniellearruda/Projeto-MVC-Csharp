using Base.Models.DAO;
using Base.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Base.Controllers
{
    public class HomeController : Controller
    {
        UsuarioDAO DAO = new UsuarioDAO();

        public ActionResult Index()
        {
            Session["login"] = "";
            return View();
        }
        public ActionResult Logar(object sender, EventArgs e)
        {

            try
            {
                string login = Request.Form["login"];
                string senha = Request.Form["senha"];
                             
                bool Usuario = DAO.Login(login,senha);

                if (Usuario)
                {
                    //Existe o usuário
                    Session["login"] = login;
                    return RedirectToAction("Index", "Principal");
                }
                else
                {
                    //Se voltar nulo, não existe o usuário com esta senha
                    TempData["erro"] = "LOGIN OU SENHA INVÁLIDO";
                    Session["login"] = "";
                    return RedirectToAction("Index", "Home");
                }




            }
            catch (Exception ex)
            {
                TempData["erro"] = ex.Message;
                return RedirectToAction("Index", "Home");
            }
        }


    }
}