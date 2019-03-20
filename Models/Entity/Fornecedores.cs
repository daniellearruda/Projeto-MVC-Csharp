using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Base.Models.Entity
{
    public class Fornecedores
    {
      public int Id                     {get;set;}
      public string Nome                {get;set;}
      public string Cpf_Cnpj            {get;set;}
      public string Data_Criacao      {get;set;}
      public string Telefone            {get;set;}
      public int Id_Empresa             {get;set;}
      public string Data_Nascimento   {get;set;}
      public string RG                  {get;set;}
        //Join
        public string NomeEmpresa       {get;set;}
    }
}