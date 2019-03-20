using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace Base.Controllers
{
    public class BaseController : Controller
    {
        protected string RedirectPath = string.Empty;
        protected bool DoRedirect = false;

        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);
            string sessao = Convert.ToString(Session["login"]);
            // Your logic to determine whether to redirect or not goes here. Bellow is an example...
            //  if (requestContext.HttpContext.User.IsInRole("RoleName"))
            if (sessao == "")
            {
                DoRedirect = true;
                RedirectPath = Url.Action("Index", "Home");
            }


        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string sessao = Convert.ToString(Session["login"]);

            if (sessao != "")
                base.OnActionExecuting(filterContext);
            else
                filterContext.Result = new RedirectResult("~/Home/Index");
        }

    }


}