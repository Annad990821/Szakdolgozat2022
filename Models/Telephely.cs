using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Szakdolgozat.Models
{
    public class Telephely
    {
        [Key]
        public int id { get; set; }
        public int irsz { get; set; }
        public string varos { get; set; }
        public string utca { get; set; }
        public int hsz { get; set; }

        public override string ToString()
        {
            return $"{irsz} {varos}, {utca} utca {hsz}.";
        }
    }
}
