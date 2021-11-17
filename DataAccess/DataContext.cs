using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Szakdolgozat.Models;
using Microsoft.EntityFrameworkCore;

namespace Szakdolgozat.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Penztargep> Penztargepek { get; set; }
        public DbSet<Felulvizsgalat> Felulvizsgalatok { get; set; }
        public DbSet<Szemely> Szemelyek { get; set; }
        public DbSet<Telephely> Telephelyek { get; set; }
        public DbSet<Szekhely> Szekhelyek { get; set; }
    }
}
