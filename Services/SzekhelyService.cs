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
    public class SzekhelyService
    {
        private readonly DataContext dataContext;
        public SzekhelyService(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public List<SzekhelySelectDTO> GetSzekhelyek()
        {
            List<SzekhelySelectDTO> res = new List<SzekhelySelectDTO>();
            foreach (var sz in dataContext.Szekhelyek.ToList())
            {
                res.Add(new SzekhelySelectDTO(sz));
            }

            return res;
        }

        public int PostSzekhely(Szekhely szekhely)
        {
            try
            {
                dataContext.Szekhelyek.Add(szekhely);
                dataContext.SaveChanges();
                if (szekhely.id != 0)
                    return szekhely.id;

                return -1;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        public void CreateSzekhely(Szekhely szekhely)
        {
            try
            {
                dataContext.Szekhelyek.Add(szekhely);
                dataContext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }
        
    }
}
