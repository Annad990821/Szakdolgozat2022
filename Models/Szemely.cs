using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Szakdolgozat.Models
{
    public class Szemely
    {
        [Key]
        public int id { get; set; }
        public string nev { get; set; }
        public int szekhelyId { get; set; }
        public string adoszam { get; set; }
        public string telefon { get; set; }
        public string email { get; set; }
    }
}
