using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Base.Models.Entity
{
    public class WebMotor
    {
        public int Id { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Quilometragem { get; set; }
        public string Observacao { get; set; }
        public string Versao { get; set; }
        public int Ano { get; set; }
    }
}