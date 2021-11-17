using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Szakdolgozat.Models.DTO
{
    public class SzemelyAdatokDTO
    {
        public int id { get; set; }
        public string nev { get; set; }
        public string penztargep { get; set; }
        public string telephely { get; set; }
        public string adoszam { get; set; }
        public string telefon { get; set; }
        public string email { get; set; }
        public SzemelyAdatokDTO(int id, string nev, string penztargep, string telephely, string adoszam, string telefon, string email)
        {
            this.id = id;
            this.nev = nev;
            this.penztargep = penztargep;
            this.telephely = telephely;
            this.adoszam = adoszam;
            this.telefon = telefon;
            this.email = email;
        }
    }
}
