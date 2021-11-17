using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Szakdolgozat.Models;
using Szakdolgozat.Models.DTO;
using Szakdolgozat.Services;

namespace Szakdolgozat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SzekhelyController : ControllerBase
    {
        private readonly SzekhelyService szekhelyService;

        public SzekhelyController(SzekhelyService _szekhelyService)
        {
            szekhelyService = _szekhelyService;
        }

        [HttpGet("szekhelyek")]
        public List<SzekhelySelectDTO> GetSzekhelyek()
        {
            return szekhelyService.GetSzekhelyek();
        }

        [HttpPost]
        public int PostSzekhely([FromBody] Szekhely szekhely)
        {
            return szekhelyService.PostSzekhely(szekhely);
        }
    }
}
