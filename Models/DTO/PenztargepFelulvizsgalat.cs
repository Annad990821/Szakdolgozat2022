using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Szakdolgozat.Models.DTO
{
    public class PenztargepFelulvizsgalat
    {
        public string tipus { get; set; }
        public string ap { get; set; }
        public string szemely { get; set; }
        public DateTime beuzemeles { get; set; }
        public DateTime felulvizsgalat { get; set; }

        public PenztargepFelulvizsgalat(string tipus, string ap,string szemely, DateTime beuzemeles, DateTime felulvizsgalat)
        {
            this.tipus = tipus;
            this.ap = ap;
            this.szemely = szemely;
            this.beuzemeles = beuzemeles;
            this.felulvizsgalat = felulvizsgalat;
        }
    }
}
