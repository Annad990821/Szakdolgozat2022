using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Szakdolgozat.Models.DTO
{
    public class SzekhelySelectDTO
    {
        public int id { get; set; }
        public string cim { get; set; }

        public SzekhelySelectDTO(Szekhely szekhely)
        {
            id = szekhely.id;
            cim = szekhely.ToString();
        }
    }
}
