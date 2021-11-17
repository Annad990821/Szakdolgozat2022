using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Szakdolgozat.Models;
using Szakdolgozat.DataAccess;

namespace Szakdolgozat.Services
{
    public class TorlesService
    {
        private readonly DataContext dataContext;

        public TorlesService(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public int RemoveSzemelyWithAllDependencies(int id)
        {
            try
            {
                var szemely = dataContext.Szemelyek.Find(id);

                var penztargepek = dataContext.Penztargepek.Where(p => p.szemelyId == szemely.id).ToList();

                foreach (var pg in penztargepek)
                {
                    dataContext.Remove(pg);
                }

                var szh = dataContext.Szekhelyek.FirstOrDefault(sz => sz.id == szemely.szekhelyId);

                if (szh != null)
                {
                    dataContext.Remove(szh);
                }

                dataContext.Remove(szemely);

                dataContext.SaveChanges();
                return 0;
            }
            catch (Exception e)
            {
                return 1;
            }
        }

        public int RemoveDataWithAllDependencies(Penztargep penztargep)
        {
            try
            {
                dataContext.Remove(penztargep);

                var felulvizsgalatok = dataContext.Felulvizsgalatok.Where(fv => fv.penztargepid == penztargep.id).ToList();
                foreach (var fv in felulvizsgalatok)
                {
                    dataContext.Remove(fv);
                }

                var telephely = dataContext.Telephelyek.FirstOrDefault(t => t.id == penztargep.telephelyId);

                if (telephely != null)
                {
                    dataContext.Remove(telephely);
                }

                dataContext.SaveChanges();

                return 0;
            }
            catch (Exception e)
            {
                return 1;
            }
        }
    }
}
