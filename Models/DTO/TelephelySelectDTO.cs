using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Szakdolgozat.Models;

namespace Szakdoga.Models.DTO
{
    public class TelephelySelectDTO
    {
        public int id { get; set; }
        public string cim { get; set; }

        public TelephelySelectDTO(Telephely telephely)
        {
            id = telephely.id;
            cim = telephely.ToString();
        }
    }
}
