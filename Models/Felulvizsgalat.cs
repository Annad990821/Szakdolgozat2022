using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Szakdolgozat.Models
{
    public class Felulvizsgalat
    {
        [Key]
        public int id { get; set; }
        public DateTime datum { get; set; }
        public int penztargepid { get; set; }
    }
}
