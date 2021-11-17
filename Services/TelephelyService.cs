using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Szakdoga.Models.DTO;
using Szakdolgozat.DataAccess;
using Szakdolgozat.Models;

namespace Szakdoga.Services
{
    public class TelephelyService
    {
        private readonly DataContext dataContext;
        public TelephelyService(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public int PostTelephely(Telephely telephely)
        {
            try
            {
                dataContext.Telephelyek.Add(telephely);
                dataContext.SaveChanges();
                if (telephely.id != 0)
                    return telephely.id;
                else
                    return -1;
            }
            catch (Exception)
            {
                return -1;
            }
        }
        public void CreateTelephely(Telephely telephely)
        {
            try
            {
                dataContext.Telephelyek.Add(telephely);
                dataContext.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }

        public List<TelephelySelectDTO> GetTelephelyek()
        {
            List<TelephelySelectDTO> res = new List<TelephelySelectDTO>();
            foreach (var th in dataContext.Telephelyek.ToList())
            {
                res.Add(new TelephelySelectDTO(th));
            }

            return res;
        }

        public void LoadData()
        {
            using (StreamReader reader = new StreamReader("telep.csv"))
            {
                reader.ReadLine();
                while (!reader.EndOfStream)
                {
                    Telephely th = new Telephely();
                    string[] sz = reader.ReadLine().Split(',');
                    th.irsz = int.Parse(sz[1]);
                    th.varos = sz[2];
                    th.utca = sz[3];
                    th.hsz = int.Parse(sz[4]);
                    CreateTelephely(th);
                }
            }
        }
    }
}
