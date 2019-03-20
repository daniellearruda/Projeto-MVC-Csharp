using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Base.Models.DAO
{
    public class Empresas
    {
        public int Id {get;set;}
        public string Uf {get;set;}
        public string Cnpj {get;set;}
        public string NomeFantasia {get;set;}
    }
}