using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Szakdolgozat.DataAccess;
using Szakdolgozat.Models;
using Szakdolgozat.Models.DTO;

namespace Szakdolgozat.Services
{
    public class PenztargepService
    {
        private readonly DataContext dataContext;
        public PenztargepService(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public string GetPenztargep(string ap)
        {
            ap = ap.Substring(0, 4);
            Dictionary<string, string> gepek = new Dictionary<string, string>();
            string[] apSzamok = { "A010", "A014", "A015", "A002", "A003", "A007", "A008", "A016", "A027", "A080", "A085", "A091", "A136", "A118", "A156", "A159", "A162", "A168", "A180", "A241", "A195", "A245", "A184" };
            string[] tipus = { "Montel Jota", "Euro Flexy", "Novatek N", "Micra", "Montel Sento", "Montel Mini", "Micra", "Novatek F", "Taxmini", "Micra", "CashCube", "Datecs", "Datecs", "Juta-Soft", "Sam4S", "Micra", "Fiscat Neon+", "Fiscat Neon+", "Fiscat Neon+", "Fiscat Neon+", "Fiscat iPalm", "Fiscat iPalm", "Flexy Mini" };

            for (int i = 0; i < apSzamok.Length; i++)
            {
                gepek.Add(apSzamok[i], tipus[i]);
            }

            if (!apSzamok.ToList().Contains(ap))
                return string.Empty;

            if (gepek[ap] != null)
                return gepek[ap];
            else
                return string.Empty;
        }

        public List<PenztargepFelulvizsgalat> GetPenztargepFelulvizsgalatok()
        {
            List<PenztargepFelulvizsgalat> result = new List<PenztargepFelulvizsgalat>();

            var felulvizsgalatok = dataContext.Felulvizsgalatok.ToList();

            foreach (var fv in felulvizsgalatok)
            {
                var gep = dataContext.Penztargepek.FirstOrDefault(pg => pg.id == fv.penztargepid);
                if (gep != null)
                {
                    var szemely = dataContext.Szemelyek.FirstOrDefault(sz => sz.id == gep.szemelyId).nev;
                    if (szemely != null)
                    {
                        result.Add(new PenztargepFelulvizsgalat(GetPenztargep(gep.ap),
                            gep.ap,

                            szemely,
                            gep.beuzemeles,
                            fv.datum));
                    }
                }
            }

            return result;
        }

        public void CreatePenztargep(Penztargep penztargep)
        {
            try
            {
                dataContext.Penztargepek.Add(penztargep);
                dataContext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }
        
        public void CreateFelulvizsgalat(Felulvizsgalat felulvizsgalat)
        {
            try
            {
                dataContext.Felulvizsgalatok.Add(felulvizsgalat);
                dataContext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }

        public bool RemovePenztargep(int id)
        {
            try
            {
                var penztargep = dataContext.Penztargepek.FirstOrDefault(pg => pg.id == id);
                dataContext.Penztargepek.Remove(penztargep);
                dataContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }

        public void LoadData()
        {
            using (StreamReader reader = new StreamReader("Penztargepek.csv"))
            {
                reader.ReadLine();
                while (!reader.EndOfStream)
                {
                    Penztargep ptg = new Penztargep();
                    string[] sz = reader.ReadLine().Split(',');
                    ptg.ap = sz[1];
                    ptg.szemelyId = int.Parse(sz[2]);
                    ptg.beuzemeles = DateTime.Parse(sz[3]);
                    ptg.telephelyId = int.Parse(sz[4]);
                    CreatePenztargep(ptg);
                }
            }
        }
        
        public void LoadFelulvizsgalatok()
        {
            using (StreamReader reader = new StreamReader("felulv.csv"))
            {
                reader.ReadLine();
                while (!reader.EndOfStream)
                {
                    Felulvizsgalat felulv = new Felulvizsgalat();
                    string[] sz = reader.ReadLine().Split(',');
                    felulv.datum = DateTime.Parse(sz[1]);
                    felulv.penztargepid = int.Parse(sz[2]);
                    CreateFelulvizsgalat(felulv);
                }
            }
        }
    }
}
