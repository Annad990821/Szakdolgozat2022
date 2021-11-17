using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Szakdolgozat.Models
{
    public class Penztargep
    {
        [Key]
        public int id { get; set; }
        public string ap { get; set; }
        public int szemelyId { get; set; }
        public DateTime beuzemeles { get; set; }
        public int telephelyId { get; set; }
    }
}