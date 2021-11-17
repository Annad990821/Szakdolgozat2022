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
    public class SzemelyService
    {
        private readonly DataContext dataContext;
        public SzemelyService(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }
        public List<SzemelyDTO> GetSzemelyek()
        {
            List<SzemelyDTO> result = new List<SzemelyDTO>();
            foreach (var szemely in dataContext.Szemelyek)
            {
                SzemelyDTO szemelyDTO = new SzemelyDTO();
                szemelyDTO.id = szemely.id;
                szemelyDTO.nev = szemely.nev;
                szemelyDTO.adoszam = szemely.adoszam;
                szemelyDTO.telefon = szemely.telefon;
                szemelyDTO.email = szemely.email;
                result.Add(szemelyDTO);
            }
            return result;
        }

        public List<SzemelyAdatokDTO> GetSzemelyAdatok()
        {
            List<SzemelyAdatokDTO> result = new List<SzemelyAdatokDTO>();

            var penztargepek = dataContext.Penztargepek.ToList();

            foreach (var pg in penztargepek)
            {
                var szemely = dataContext.Szemelyek.FirstOrDefault(sz => sz.id == pg.szemelyId);
                if (szemely != null)
                {
                    var th = dataContext.Telephelyek.FirstOrDefault(th => th.id == pg.telephelyId);
                    string telephely = "";
                    if (th != null)
                        telephely = th.ToString();

                    result.Add(new SzemelyAdatokDTO(
                        pg.id,
                        szemely.nev,
                        pg.ap,
                        telephely,
                        szemely.adoszam,
                        szemely.telefon,
                        szemely.email));
                }
            }

            return result;
        }
        
        public void AddSzemely(Szemely szemely)
        {
            dataContext.Szemelyek.Add(szemely);
            dataContext.SaveChanges();
        }

        public void Update(Szemely szemely)
        {
            var sz = dataContext.Szemelyek.Find(szemely.id);
            sz.nev = szemely.nev;
            sz.email = szemely.email;
            sz.adoszam = szemely.adoszam;
            sz.telefon = szemely.telefon;
            sz.szekhelyId = szemely.szekhelyId;
            dataContext.SaveChanges();
        }
    }
}
