using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Base.Controllers
{
        //TODO CONTROLADOR PASSARÁ A HERDAR DO CONTROLLER BASECONTROLLER
        //DESSA FORMA TEMOS A CERTEZA QUE SÓ USUARIOS LOGADOS ENTRÃO NOS MÉTODOS
    public class PrincipalController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}